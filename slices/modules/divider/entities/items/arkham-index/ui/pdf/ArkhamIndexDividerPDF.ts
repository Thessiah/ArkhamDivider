import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import {
	getDefaultDividerFontFamily,
	selectDividerTabIndex,
} from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { selectShowCornerRadius } from "@/modules/print/shared/lib";
import type { RootState } from "@/shared/store";
import {
	getArkhamIndexDividerIconLeft,
	getArkhamIndexDividerLayoutObjects,
	getArkhamIndexDividerSideObject,
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
const white = cmyk(0, 0, 0, 0);
const tabIconStrokeWidthMm = 0.3;

const sideBackgroundScale = 1.1;
const sideTextOffset = {
	x: 0,
	y: 0,
};

const drawTabIconGlyph = async ({
	content,
	ctx,
	fontSize,
	x,
	y,
	color,
	overprint = true,
}: {
	content: string;
	ctx: Parameters<PDFDivider<ArkhamIndexDividerParams>>[1];
	fontSize: number;
	x: number;
	y: number;
	color: ReturnType<typeof cmyk>;
	overprint?: boolean;
}) => {
	await ctx.text.draw(content, {
		x,
		y,
		fontSize,
		baseline: "top",
		fontFamily: "ArkhamIcons",
		color,
		overprint,
		lineBreak: false,
	});
};

const drawTabIconStroke = async ({
	content,
	ctx,
	fontSize,
	mm,
	x,
	y,
}: {
	content: string;
	ctx: Parameters<PDFDivider<ArkhamIndexDividerParams>>[1];
	fontSize: number;
	mm: (value: number) => number;
	x: number;
	y: number;
}) => {
	await ctx.text.measureTextWidth({
		text: content,
		fontFamily: "ArkhamIcons",
		fontSize,
	});
	const { doc } = ctx.text;
	doc.save();
	doc.fontSize(fontSize);
	doc.strokeColor(black);
	doc.opacity(1);
	doc.lineWidth(mm(tabIconStrokeWidthMm));
	doc.text(content, x, y, {
		stroke: true,
		fill: false,
		lineBreak: false,
		baseline: "top",
	});
	doc.restore();
};

const getTabIconGlyphX = ({
	iconBox,
	slotWidthPt,
	glyphWidthPt,
	iconHeightPt,
	iconPosition,
}: {
	iconBox: ReturnType<
		ReturnType<
			Parameters<PDFDivider<ArkhamIndexDividerParams>>[1]["unit"]["fromBleed"]
		>["box"]
	>;
	slotWidthPt: number;
	glyphWidthPt: number;
	iconHeightPt: number;
	iconPosition: "left" | "right";
}) => {
	const slotX = iconBox.x();
	const centerX =
		iconPosition === "right"
			? slotX + slotWidthPt - iconHeightPt / 2
			: slotX + iconHeightPt / 2;
	return centerX - glyphWidthPt / 2;
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

	if (ctx.cutPathOnly) {
		return;
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
		tabSize === "full" || tabLeft + tabWidth >= wMm - 0.01 ? "left" : "right";
	const iconLeft = getArkhamIndexDividerIconLeft({
		tabSize,
		tabLeft,
		tabWidth,
		tabSideWidth: O.tab.sideWidth,
		iconWidth: O.icon.width,
		edgeMargin: O.icon.edgeMargin,
		iconPosition,
	});

	const _fontFamily = getDefaultDividerFontFamily(language);

	if (showArkhamIndexDividerTabIcon(props)) {
		const icon = getDividerIcon({
			divider: props,
			param: "icon",
			defaultIcon: props.icon,
		});
		if (icon && typeof icon === "string") {
			const iconDef = ctx.icon.icons[icon];
			if (iconDef) {
				const fontSizePt = mm(O.icon.fontSize);
				const glyphWidthPt = (iconDef.ratio ?? 1) * fontSizePt;

				const iconBox = bleed.box({
					top: O.icon.top,
					left: iconLeft,
					width: O.icon.width,
					height: O.icon.height,
				});

				const slotWidthPt = iconBox.options.size.width;
				const iconHeightPt = mm(O.icon.height);
				const xPt = getTabIconGlyphX({
					iconBox,
					slotWidthPt,
					glyphWidthPt,
					iconHeightPt,
					iconPosition,
				});
				const yPt = iconBox.y() + (mm(O.icon.height) - fontSizePt) / 2;

				const content = String.fromCodePoint(iconDef.code);

				await drawTabIconStroke({
					content,
					ctx,
					fontSize: fontSizePt,
					mm,
					x: xPt,
					y: yPt,
				});
				await drawTabIconGlyph({
					content,
					ctx,
					fontSize: fontSizePt,
					x: xPt,
					y: yPt,
					color: white,
					overprint: true,
				});
			}
		}
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
