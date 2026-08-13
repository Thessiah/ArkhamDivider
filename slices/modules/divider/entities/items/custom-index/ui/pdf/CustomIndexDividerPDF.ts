import { cmyk } from "@/modules/core/color/shared/lib";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { selectShowCornerRadius } from "@/modules/print/shared/lib";
import type { RootState } from "@/shared/store";
import { customIndexSettings } from "../../config";
import {
	getCustomIndexDividerIconLeft,
	getCustomIndexDividerLayoutObjects,
	getCustomIndexDividerTabIndentSize,
	getCustomIndexDividerTabLeft,
	getCustomIndexDividerTabSize,
	getCustomIndexDividerTabsCount,
	getCustomIndexDividerTabWidth,
	showCustomIndexDividerTabIcon,
	showCustomIndexDividerTabTitle,
} from "../../lib";
import { getCustomIndexDividerTabTitleObject } from "../../lib/logic/objects/getCustomIndexDividerTabTitleObject";
import type {
	CustomIndexDividerLayout,
	CustomIndexDividerParams,
} from "../../model";
import { CustomIndexDividerLasercut } from "./CustomIndexDividerLasercut";

const black = cmyk(0, 0, 0, 100);

export const CustomIndexDividerPDF: PDFDivider<
	CustomIndexDividerParams
> = async (props, ctx) => {
	const { text, unit, image, lasercut, state } = ctx;
	const { mm } = unit;

	const select = <T>(selector: (state: RootState) => T) => selector(state);

	const layout = ctx.layout as CustomIndexDividerLayout;
	const O = getCustomIndexDividerLayoutObjects(layout);
	const wMm = layout.size.width;
	const hMm = layout.size.height;

	const tabsCount = getCustomIndexDividerTabsCount(layout);

	const tabIndex = select(
		selectDividerTabIndex({
			id: props.id,
			tabsCount,
			side: props.side,
		}),
	);

	const cornerRadiusEnabled = select(selectShowCornerRadius);

	const tabSize = getCustomIndexDividerTabSize({
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
		const lasercutService = lasercut.from(CustomIndexDividerLasercut);
		lasercutService.drawCustomIndexDividerLasercut({
			x: bleed.x(0),
			y: bleed.y(0),
			path: pathOptions,
		});
	}

	if (ctx.cutPathOnly) {
		return;
	}

	const tabWidth = getCustomIndexDividerTabWidth({
		tabWidths: O.tab.width,
		tabSize,
		width: wMm,
	});
	const tabLeft = getCustomIndexDividerTabLeft({
		tabSize,
		tabIndex,
		tabsCount,
		tabWidths: O.tab.width,
		width: wMm,
		cornerRadius: O.cornerRadius,
	});
	const iconPosition =
		tabSize === "full" || tabLeft + tabWidth >= wMm - 0.01 ? "left" : "right";

	const showGlyph = showCustomIndexDividerTabIcon(props);

	if (showGlyph) {
		const iconLeft = getCustomIndexDividerIconLeft({
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

	const showTitle = showCustomIndexDividerTabTitle({
		tabSize,
		showIcon: showGlyph,
	});

	if (showTitle) {
		const indentSize = getCustomIndexDividerTabIndentSize({
			divider: props,
			tabIndex,
			tabSize,
			tabIndentSize: O.tab.indentSize,
		});

		const T = getCustomIndexDividerTabTitleObject({
			objects: O,
			showIcon: showGlyph,
			tabSize,
			indentSize,
			iconPosition,
		});

		const title = props.customTitle ?? props.title;
		const fontSizeScale = props.fontSizeScale ?? 100;
		const wordWrap = customIndexSettings.wordWrap;
		const characterSpacing = mm(customIndexSettings.letterSpacing);

		const titleBox = bleed.box({
			top: wordWrap ? 0 : T.top,
			left: tabLeft + T.left,
			width: tabWidth - T.left - T.right,
			height: wordWrap ? O.tab.height : T.height,
		});

		const titleFontSize = mm((fontSizeScale / 100) * T.fontSize);
		const lineGap = titleFontSize * (customIndexSettings.lineHeight - 1);

		// Wrap mode: measure the block and center it in the tab (PDFKit's
		// baseline:"middle" only centers the first line).
		let titleY = titleBox.y();
		let baseline: "middle" | "top" = "middle";
		if (wordWrap) {
			const textHeight = await text.measureTextHeight({
				text: title,
				fontFamily: customIndexSettings.font,
				fontSize: titleFontSize,
				width: titleBox.width(),
				lineGap,
				characterSpacing,
				lineBreak: true,
			});
			titleY = titleBox.y() + Math.max(0, (titleBox.height() - textHeight) / 2);
			baseline = "top";
		}

		await text.draw(title, {
			x: titleBox.x(),
			y: titleY,
			width: titleBox.width(),
			height: titleBox.height(),
			fontSize: titleFontSize,
			characterSpacing,
			lineGap,
			lineBreak: wordWrap,
			align: "left",
			baseline,
			fontFamily: customIndexSettings.font,
			color: black,
			overprint: true,
		});
	}
};
