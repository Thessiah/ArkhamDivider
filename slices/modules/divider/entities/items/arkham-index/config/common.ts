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

const horizontalTabWidths: Record<number, number> = {
	1: (25 + sideOffsetWidth) * 1.25,
	2: (46 + sideOffsetWidth) * 1.25,
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
		fontSize: 7.3,
		top: 0.25,
		width: 10.1,
		height: 9,
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
			fontSize: 6,
			height: 6,
			top: 2,
			left: 6.5 - tabTitleOffsetReduction,
			right: 11 - tabSideWidthReduction - tabTitleExtraRightReduction,
		},
		withIcon: {
			left: 14.8 - tabTitleOffsetReduction,
			right: 21 - tabSideWidthReduction - tabTitleExtraRightReduction,
		},
		withSideText: {
			left: 19.5 - tabTitleOffsetReduction,
			right: 27 - tabSideWidthReduction - tabTitleExtraRightReduction,
		},
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

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		tab: {
			width: verticalTabWidths,
			indentSize: 2,
		},
	},
);

export const arkhamIndexDividerVerticalMediumObjects = mergeDeepRight(
	arkhamIndexDividerVerticalObjects,
	{
		tab: {
			height: 7.5,
		},
		icon: {
			fontSize: 5.7,
			width: 8,
			height: 7,
		},
		iconBackground: {
			width: 7.4,
			height: 7.4,
		},
		sideBackground: {
			top: 1.65,
			left: 7.5,
		},
		sideText: {
			top: 1.85,
			left: 8,
		},
		tabTitle: {
			default: {
				top: 0.75,
			},
			withIcon: {
				left: 12.7 - tabTitleOffsetReduction,
				right: 18.9 - tabSideWidthReduction - tabTitleExtraRightReduction,
			},
			withSideText: {
				left: 17.4 - tabTitleOffsetReduction,
				right: 24.9 - tabSideWidthReduction - tabTitleExtraRightReduction,
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
