import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import {
	getDefaultDividerFontFamily,
	selectDividerTabIndex,
} from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { selectShowCornerRadius } from "@/modules/print/shared/lib";
import type { RootState } from "@/shared/store";
import { loadArkhamIndexIconBackgroundImage } from "../../api/loadArkhamIndexIconBackgroundImage";
import {
	getArkhamIndexDividerIconBackgroundLeft,
	getArkhamIndexDividerIconLeft,
	getArkhamIndexDividerLayoutObjects,
	getArkhamIndexDividerSideObject,
	getArkhamIndexDividerTabIndentSize,
	getArkhamIndexDividerTabLeft,
	getArkhamIndexDividerTabSize,
	getArkhamIndexDividerTabsCount,
	getArkhamIndexDividerTabWidth,
	getArkhamIndexSideText,
	showArkhamIndexDividerTabIcon,
	showArkhamIndexSideTextSx,
} from "../../lib";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerParams,
} from "../../model";
import { ArkhamIndexDividerLasercut } from "./ArkhamIndexDividerLasercut";

const black = cmyk(0, 0, 0, 100);
const sideBackgroundScale = 1.1;
const sideTextOffset = {
	x: 0,
	y: 0,
};

export const ArkhamIndexDividerPDF: PDFDivider<
	ArkhamIndexDividerParams
> = async (props, ctx) => {
	const { text, unit, language, lasercut, state } = ctx;
	const { mm } = unit;

	const select = <T>(selector: (state: RootState) => T) => selector(state);

	const layout = ctx.layout as ArkhamIndexDividerLayout;
	const O = getArkhamIndexDividerLayoutObjects(layout);
	const wMm = layout.size.width;
	const hMm = layout.size.height;

	const tabsCount = getArkhamIndexDividerTabsCount(layout);

	const tabIndex = select(
		selectDividerTabIndex({
			id: props.id,
			tabsCount,
			side: props.side,
		}),
	);

	const cornerRadiusEnabled = select(selectShowCornerRadius);

	const tabSize = getArkhamIndexDividerTabSize({
		divider: props,
		layout,
	});

	const indentSize = getArkhamIndexDividerTabIndentSize({
		divider: props,
		tabIndex,
		tabSize,
		tabIndentSize: O.tab.indentSize,
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
		const lasercutService = lasercut.from(ArkhamIndexDividerLasercut);
		lasercutService.drawArkhamIndexDividerLasercut({
			x: bleed.x(0),
			y: bleed.y(0),
			path: pathOptions,
		});
	}

	const tabWidth = getArkhamIndexDividerTabWidth({
		tabWidths: O.tab.width,
		tabSize,
		width: wMm,
	});
	const tabLeft = getArkhamIndexDividerTabLeft({
		tabSize,
		tabIndex,
		tabsCount,
		tabWidths: O.tab.width,
		width: wMm,
		cornerRadius: O.cornerRadius,
	});
	const iconPosition =
		tabSize !== "full" && tabLeft + tabWidth >= wMm - 0.01 ? "right" : "left";
	const iconLeft = getArkhamIndexDividerIconLeft({
		tabSize,
		tabLeft,
		tabWidth,
		tabSideWidth: O.tab.sideWidth,
		iconWidth: O.icon.width,
		indentSize,
		iconPosition,
	});

	const _fontFamily = getDefaultDividerFontFamily(language);

	if (showArkhamIndexDividerTabIcon(props)) {
		const icon = getDividerIcon({
			divider: props,
			param: "icon",
			defaultIcon: props.icon,
		});
		if (!icon) {
			return;
		}

		const iconBackgroundLeft = getArkhamIndexDividerIconBackgroundLeft({
			objects: O,
			iconPosition,
		});
		const iconBackgroundBox = bleed.box({
			top: O.iconBackground.top,
			left: iconLeft + iconBackgroundLeft,
			width: O.iconBackground.width,
			height: O.iconBackground.height,
		});
		const iconBackgroundImage = await loadArkhamIndexIconBackgroundImage();
		ctx.image.drawImage(iconBackgroundImage, {
			x: iconBackgroundBox.x(),
			y: iconBackgroundBox.y(),
			width: iconBackgroundBox.width(),
			height: iconBackgroundBox.height(),
		});

		const iconBox = bleed.box({
			top: O.icon.top,
			left: iconLeft,
			width: O.icon.width,
			height: O.icon.height,
		});
		await ctx.icon.draw(icon, {
			x: iconBox.x(),
			y: iconBox.y(),
			width: iconBox.width(),
			height: iconBox.height(),
			fontSize: mm(O.icon.fontSize),
			color: black,
			overprint: true,
			iconOptions: { scaleType: "circle" },
		});
	}

	if (showArkhamIndexSideTextSx(props)) {
		const sideText = getArkhamIndexSideText(props);
		if (!sideText) {
			return;
		}
		const S = getArkhamIndexDividerSideObject({
			objects: O,
			divider: props,
		});
		const sideBackgroundGrowth =
			O.sideBackground.width * (sideBackgroundScale - 1);
		const sideBackgroundCenterOffset =
			iconPosition === "right"
				? -sideBackgroundGrowth / 2
				: sideBackgroundGrowth / 2;
		const sideTextLeft =
			iconPosition === "right" ? O.icon.width - S.left - S.width : S.left;
		const sideBox = bleed.box({
			top: S.top - sideBackgroundGrowth / 2 + sideTextOffset.y,
			left:
				iconLeft + sideTextLeft + sideBackgroundCenterOffset + sideTextOffset.x,
			width: S.width,
			height: S.height,
		});

		const fontSizeScale = props.params?.sideTextFontSizeScale ?? 100;
		const fontSize = mm((S.fontSize * fontSizeScale) / 100);

		const h = mm(S.height);
		await text.draw(sideText, {
			x: sideBox.x(),
			y: sideBox.y() + h / 2,
			width: sideBox.width(),
			height: h,
			fontSize,
			align: "center",
			baseline: "middle",
			fontFamily: "Arkhamic",
			color: black,
			overprint: true,
		});
	}
};
