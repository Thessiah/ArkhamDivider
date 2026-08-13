import { mergeDeepRight } from "ramda";
import { customIndex2Settings } from "./settings";

export const customIndex2CategoryId = "custom-index-2";

export const customIndex2DividerBaseUrl =
	"/images/divider/background/custom-index-2";

const originalTabSideWidth = 6.5;
const tabSideWidth = 0;
const sideOffsetWidth = originalTabSideWidth * 2;
const tabSideWidthReduction = originalTabSideWidth - tabSideWidth;
const tabTitleOffsetReduction = tabSideWidthReduction / 2;
const tabTitleExtraRightReduction = tabTitleOffsetReduction / 2;

const tabTitleFontSize = customIndex2Settings.titleFontSize;
// Kept equal to the font size (as arkham-index's original 6/6 values were) so the
// title box actually has room to render at the configured size instead of the
// auto-fit shrinking it back down to a fixed box height.
const tabTitleHeight = tabTitleFontSize;
/** The height every `top` offset below was originally tuned against (6mm). */
const baseTabTitleHeight = 6;
/** Shifts title/icon boxes up as they grow taller, so they stay centered on the
 *  same point instead of only growing downward from a fixed top edge. */
const verticalShift = (baseTabTitleHeight - tabTitleHeight) / 2;
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
const horizontalTabHeight = 8;
/**
 * PNG tab icons fill the tab height and overhang the outer corner slightly
 * (top + side). Negative `edgeMargin` is what pushes them past the tab edge
 * into the divider body; `top` is pulled up by the same amount so the bleed
 * is centered on the corner.
 */
const horizontalIconBleed = 0.2;
/** Soft fade length on the icon edge facing the tab title (mm). */
export const customIndex2IconTextEdgeFade = 0;
const horizontalTabIconSlotSize = horizontalTabHeight + horizontalIconBleed;
const horizontalIconEdgeMargin = -horizontalIconBleed;
const horizontalTabTextSideMargin = 2;
const horizontalTabTitleTop = tabTitleTop - 0.75 + verticalShift;
/** In-tab footprint used to reserve title space (bleed sits outside the tab). */
const horizontalIconInTabSize = horizontalTabHeight;
const horizontalIconTitleGap = 2;
/** Title inset on the icon side (matches the left-tab gap that already looked right). */
const horizontalIconTitleInset =
	horizontalIconInTabSize + horizontalIconTitleGap;

const horizontalTabWidths: Record<number, number> = {
	1: (25 + sideOffsetWidth) * 1.25,
	// Size 2 is overridden to `layout.size.width / 2` via withHalfWidthSize2Tab.
	2: 46,
	3: 68 + sideOffsetWidth,
};

export const customIndex2DividerHorizontalObjects = {
	tab: {
		height: horizontalTabHeight,
		width: horizontalTabWidths,
		sideWidth: tabSideWidth,
		indentSize: 9,
	},
	cornerRadius: 3,
	icon: {
		fontSize: tabIconFontSize,
		top: -horizontalIconBleed,
		width: horizontalTabIconSlotSize,
		height: horizontalTabIconSlotSize,
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
	iconBackground: {
		width: 9.4,
		height: 9.4,
		top: 0,
		left: 0.3,
	},
	tabTitle: {
		default: {
			fontSize: tabTitleFontSize,
			height: tabTitleHeight,
			top: horizontalTabTitleTop,
			left: horizontalTabTextSideMargin,
			right: 11 - tabSideWidthReduction - tabTitleExtraRightReduction,
		},
		withIcon: {
			left: horizontalIconTitleInset,
			right: horizontalIconTitleInset,
		},
		withIconRight: undefined as { left: number } | undefined,
		fullOffset: {
			default: horizontalIconTitleInset + horizontalTabTextSideMargin,
		},
		full: {
			right: 19,
		},
	},
};

export const customIndex2DividerHorizontalSmallObjects = mergeDeepRight(
	customIndex2DividerHorizontalObjects,
	{
		topLine: {
			top: 0.5,
		},
	},
);

export const customIndex2DividerHorizontalLowerBodyObjects = mergeDeepRight(
	customIndex2DividerHorizontalObjects,
	{
		tab: {
			height: 38,
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
const verticalMediumTabTitleTop = tabTitleTop - 2 + verticalShift;
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

export const customIndex2DividerVerticalObjects = mergeDeepRight(
	customIndex2DividerHorizontalObjects,
	{
		tab: {
			width: verticalTabWidths,
			indentSize: verticalTabIndentSize,
		},
	},
);

export const customIndex2DividerVerticalMediumObjects = mergeDeepRight(
	customIndex2DividerVerticalObjects,
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

export const customIndex2DividerVerticalTrimObjects = mergeDeepRight(
	customIndex2DividerVerticalObjects,
	{
		topLine: {
			top: 0.2,
		},
	},
);

const pillTabTitleTop = 1 + verticalShift;

export const customIndex2DividerPillObjects = mergeDeepRight(
	customIndex2DividerHorizontalObjects,
	{
		icon: {
			top: pillTabTitleTop,
			width: 6,
			height: 6,
			edgeMargin: 1,
		},
		tabTitle: {
			default: {
				top: pillTabTitleTop,
			},
			withIcon: {
				left: 6 + horizontalIconTitleGap,
				right: 6 + horizontalIconTitleGap,
			},
			fullOffset: {
				default: 8,
			},
			full: {
				right: 10,
			},
		},
	},
);
