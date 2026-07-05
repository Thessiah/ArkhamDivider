import { mergeDeepRight } from "ramda";

export const arkhamIndexCategoryId = "arkham-index";

export const arkhamIndexDividerBaseUrl =
	"/images/divider/background/arkham-index";

export const arkhamIndexDividerExternalUrl = import.meta.env
	.VITE_ARKHAM_INDEX_URL;

const originalTabSideWidth = 6.5;
const tabSideWidth = 0;
const sideOffsetWidth = originalTabSideWidth * 2;
const tabSideWidthReduction = originalTabSideWidth - tabSideWidth;
const tabTitleOffsetReduction = tabSideWidthReduction / 2;
const tabTitleExtraRightReduction = tabTitleOffsetReduction / 2;

const tabTitleFontSize = 6;
const tabTitleHeight = 6;
const tabTitleTop = 2;
/** Tab glyph render size relative to tab title text (one quarter smaller). */
const tabIconSizeScale = 3 / 4;
const tabIconFontSize = tabTitleFontSize * tabIconSizeScale;
/** Layout slot for the tab icon (title positioning and tab widths). */
const tabIconSlotWidth = tabTitleHeight * (10.1 / 9);
const tabIconSlotHeight = tabTitleHeight;
const tabIconToTitleGap = 1;
/** Inner padding so stroke/glow stays inside the icon slot. */
const tabIconGlowInset = 1.5;
const horizontalTabIconSlotWidth = 10.1;
const horizontalTabIconToTitleGap = 4.7;
const horizontalIconEdgeMargin = 5 - tabTitleOffsetReduction;
const horizontalTabTextSideMargin =
	(6.5 -
		tabTitleOffsetReduction +
		(21 -
			tabSideWidthReduction -
			tabTitleExtraRightReduction -
			horizontalTabIconSlotWidth -
			horizontalTabIconToTitleGap +
			tabTitleOffsetReduction)) /
	2;

const horizontalTabWidths: Record<number, number> = {
	1: (25 + sideOffsetWidth) * 1.25,
	2: 46,
	3: 68 + sideOffsetWidth,
};

export const arkhamIndexDividerHorizontalObjects = {
	tab: {
		height: 9.5,
		width: horizontalTabWidths,
		sideWidth: tabSideWidth,
		indentSize: 9,
	},
	cornerRadius: 3,
	icon: {
		fontSize: tabIconFontSize,
		top: tabTitleTop,
		width: horizontalTabIconSlotWidth,
		height: tabIconSlotHeight,
		glowInset: 0,
		edgeMargin: horizontalIconEdgeMargin,
	},
	title: {
		fontSize: 3.7,
		height: 7.6,
		top: 0.5,
		left: 2,
		right: 2,
	},
	topLine: {
		top: 7.6,
		height: 2.2,
	},
	bottomLine: {
		bottom: 4.6,
		height: 8.3,
		bottomOffset: 5.3,
	},
	campaignIcon: {
		fontSize: 3,
		width: 4,
		height: 4,
	},
	iconBackground: {
		width: 9.4,
		height: 9.4,
		top: 0,
		left: 0.3,
	},
	sideBackground: {
		width: 4.7,
		height: 4.7,
		top: 4.5,
		left: 9.6,
	},
	sideText: {
		fontSize: 4,
		top: 5.1,
		left: 10.1,
		width: 3.7,
		height: 4.4,
		withXP: {
			height: 4,
		},
	},
	backgroundIcon: {
		fontSize: 50,
	},
	tabTitle: {
		default: {
			fontSize: tabTitleFontSize,
			height: tabTitleHeight,
			top: tabTitleTop,
			left: horizontalTabTextSideMargin,
			right: 11 - tabSideWidthReduction - tabTitleExtraRightReduction,
		},
		withIcon: {
			left:
				horizontalIconEdgeMargin +
				horizontalTabIconSlotWidth +
				horizontalTabIconToTitleGap -
				tabTitleOffsetReduction,
			right:
				horizontalIconEdgeMargin +
				horizontalTabIconSlotWidth +
				horizontalTabIconToTitleGap -
				tabTitleOffsetReduction +
				horizontalTabTextSideMargin,
		},
		withSideText: {
			left: 19.5 + horizontalIconEdgeMargin - tabTitleOffsetReduction,
			right:
				27 +
				horizontalIconEdgeMargin -
				tabSideWidthReduction -
				tabTitleExtraRightReduction,
		},
		withIconRight: undefined as { left: number } | undefined,
		fullOffset: {
			default: 7,
			withSideText: 12,
		},
		full: {
			right: 19,
		},
	},
};

export const arkhamIndexDividerHorizontalSmallObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		topLine: {
			top: 0.5,
		},
	},
);

const verticalTabWidths: Record<number, number> = {
	1: (15 + sideOffsetWidth) * 1.25,
	2: (28 + sideOffsetWidth) * 1.25,
	3: 46 + sideOffsetWidth,
};

const verticalTabIndentSize = 2;

const verticalMediumDividerWidth = 65;
const verticalMediumTabHeight = 6.5;
/** Vertical space above/below glyph in icon slot; also used as card-edge margin. */
const verticalMediumTabIconContentInset =
	(tabIconSlotHeight - tabIconFontSize) / 2;
const verticalMediumTabIconEdgeMargin = verticalMediumTabIconContentInset;
/** Offset icon–text gap by the same amount the side margin was reduced (4.5mm → content inset). */
const verticalMediumTabIconPreviousEdgeMargin = 4.5;
const verticalMediumTabIconToTitleGap =
	tabIconToTitleGap +
	1.75 +
	(verticalMediumTabIconPreviousEdgeMargin - verticalMediumTabIconContentInset);
const verticalMediumTabWidthInset = -0.5;
const verticalMediumTabIconSlotWidth = tabIconSlotWidth;
const verticalMediumTabReservedEdge =
	verticalMediumTabIconSlotWidth + verticalMediumTabIconEdgeMargin;
const verticalMediumTabTitleInset = (6.5 - tabTitleOffsetReduction) / 2;
const verticalMediumTabTitleTop = tabTitleTop - 2;
const verticalMediumTabIconTop = verticalMediumTabTitleTop;

const verticalMediumTabWidths: Record<number, number> = {
	1:
		verticalMediumDividerWidth -
		verticalMediumTabReservedEdge * 2 +
		verticalMediumTabWidthInset * 2,
	2:
		verticalMediumDividerWidth -
		verticalMediumTabReservedEdge +
		verticalMediumTabWidthInset,
	3:
		verticalMediumDividerWidth -
		verticalMediumTabReservedEdge +
		verticalMediumTabWidthInset,
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		tab: {
			width: verticalTabWidths,
			indentSize: verticalTabIndentSize,
		},
	},
);

export const arkhamIndexDividerVerticalMediumObjects = mergeDeepRight(
	arkhamIndexDividerVerticalObjects,
	{
		tab: {
			height: verticalMediumTabHeight,
			indentSize: verticalTabIndentSize,
			width: verticalMediumTabWidths,
		},
		icon: {
			height: tabIconSlotHeight,
			width: verticalMediumTabIconSlotWidth,
			fontSize: tabIconFontSize,
			top: verticalMediumTabIconTop,
			glowInset: tabIconGlowInset,
			edgeMargin: verticalMediumTabIconEdgeMargin,
		},
		tabTitle: {
			default: {
				top: verticalMediumTabTitleTop,
			},
			withIcon: {
				left:
					verticalMediumTabIconEdgeMargin +
					verticalMediumTabIconSlotWidth +
					verticalMediumTabIconToTitleGap -
					tabTitleOffsetReduction,
			},
			withIconRight: {
				left: verticalMediumTabTitleInset + 1,
			},
		},
	},
);

export const arkhamIndexDividerVerticalTrimObjects = mergeDeepRight(
	arkhamIndexDividerVerticalObjects,
	{
		topLine: {
			top: 0.2,
		},
	},
);
