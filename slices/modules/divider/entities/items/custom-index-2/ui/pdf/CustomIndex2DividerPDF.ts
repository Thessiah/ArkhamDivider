import { cmyk } from "@/modules/core/color/shared/lib";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { selectShowCornerRadius } from "@/modules/print/shared/lib";
import type { RootState } from "@/shared/store";
import { customIndex2Settings } from "../../config";
import {
	getCustomIndex2DividerIconLeft,
	getCustomIndex2DividerLayoutObjects,
	getCustomIndex2DividerTabIndentSize,
	getCustomIndex2DividerTabLeft,
	getCustomIndex2DividerTabSize,
	getCustomIndex2DividerTabsCount,
	getCustomIndex2DividerTabWidth,
	showCustomIndex2DividerTabIcon,
	showCustomIndex2DividerTabTitle,
} from "../../lib";
import { getCustomIndex2DividerTabTitleObject } from "../../lib/logic/objects/getCustomIndex2DividerTabTitleObject";
import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerParams,
} from "../../model";
import { CustomIndex2DividerLasercut } from "./CustomIndex2DividerLasercut";

const black = cmyk(0, 0, 0, 100);

export const CustomIndex2DividerPDF: PDFDivider<
	CustomIndex2DividerParams
> = async (props, ctx) => {
	const { text, unit, image, lasercut, state } = ctx;
	const { mm } = unit;

	const select = <T>(selector: (state: RootState) => T) => selector(state);

	const layout = ctx.layout as CustomIndex2DividerLayout;
	const O = getCustomIndex2DividerLayoutObjects(layout);
	const wMm = layout.size.width;
	const hMm = layout.size.height;

	const tabsCount = getCustomIndex2DividerTabsCount(layout);

	const tabIndex = select(
		selectDividerTabIndex({
			id: props.id,
			tabsCount,
			side: props.side,
		}),
	);

	const cornerRadiusEnabled = select(selectShowCornerRadius);

	const tabSize = getCustomIndex2DividerTabSize({
		divider: props,
		layout,
	});

	const pathOptions = {
		width: wMm,
		height: hMm,
		cornerRadius: O.cornerRadius,
		tabHeight: O.tab.height,
		tabSideWidth: O.tab.sideWidth,
		tabWidths: O.tab.width,
		tabSize,
		tabIndex,
		tabsCount,
		cornerRadiusEnabled,
	};

	const bleed = unit.fromBleed();

	if (props.side === "front") {
		const lasercutService = lasercut.from(CustomIndex2DividerLasercut);
		lasercutService.drawCustomIndex2DividerLasercut({
			x: bleed.x(0),
			y: bleed.y(0),
			path: pathOptions,
		});
	}

	if (ctx.cutPathOnly) {
		return;
	}

	const tabWidth = getCustomIndex2DividerTabWidth({
		tabWidths: O.tab.width,
		tabSize,
		width: wMm,
	});
	const tabLeft = getCustomIndex2DividerTabLeft({
		tabSize,
		tabIndex,
		tabsCount,
		tabWidths: O.tab.width,
		width: wMm,
		cornerRadius: O.cornerRadius,
	});
	const iconPosition =
		tabSize === "full" || tabLeft + tabWidth >= wMm - 0.01 ? "left" : "right";

	const showGlyph = showCustomIndex2DividerTabIcon(props);

	if (showGlyph) {
		const iconLeft = getCustomIndex2DividerIconLeft({
			tabSize,
			tabLeft,
			tabWidth,
			tabSideWidth: O.tab.sideWidth,
			iconWidth: O.icon.width,
			edgeMargin: O.icon.edgeMargin,
			iconPosition,
		});

		const iconImage = props.params?.iconImage;

		if (iconImage) {
			const iconBox = bleed.box({
				top: O.icon.top,
				left: iconLeft,
				width: O.icon.width,
				height: O.icon.height,
			});

			const response = await fetch(iconImage);
			const arrayBuffer = await response.arrayBuffer();

			image.drawImage(arrayBuffer, {
				x: iconBox.x(),
				y: iconBox.y(),
				width: iconBox.width(),
				height: iconBox.height(),
			});
		}
	}

	const showTitle = showCustomIndex2DividerTabTitle({
		tabSize,
		showIcon: showGlyph,
	});

	if (showTitle) {
		const indentSize = getCustomIndex2DividerTabIndentSize({
			divider: props,
			tabIndex,
			tabSize,
			tabIndentSize: O.tab.indentSize,
		});

		const T = getCustomIndex2DividerTabTitleObject({
			objects: O,
			showIcon: showGlyph,
			tabSize,
			indentSize,
			iconPosition,
		});

		const title = props.customTitle ?? props.title;
		const fontSizeScale = props.fontSizeScale ?? 100;

		const titleBox = bleed.box({
			top: T.top,
			left: tabLeft + T.left,
			width: tabWidth - T.left - T.right,
			height: T.height,
		});

		const titleFontSize = mm((fontSizeScale / 100) * T.fontSize);

		await text.draw(title, {
			x: titleBox.x(),
			y: titleBox.y(),
			width: titleBox.width(),
			height: titleBox.height(),
			fontSize: titleFontSize,
			characterSpacing: mm(customIndex2Settings.letterSpacing),
			lineGap: titleFontSize * (customIndex2Settings.lineHeight - 1),
			lineBreak: customIndex2Settings.wordWrap,
			align: "left",
			baseline: "middle",
			fontFamily: customIndex2Settings.font,
			color: black,
			overprint: true,
		});
	}
};
