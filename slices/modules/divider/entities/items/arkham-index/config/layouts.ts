import { sleeve65x100 } from "@/entities/sleeve/config/sizes";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { ArkhamIndexDividerLayout } from "../model";
import { arkhamIndexCategoryId } from "./common";

const horizontal: ArkhamIndexDividerLayout = {
	id: "arkham-index",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamIndexCategoryId,
	groupId: "horizontal",
	name: "Large",
	orientation: "horizontal",
	color: true,
	size: createSize(92, 76),
	printSize: {
		300: {
			size: createSize(1087, 898),
			bleedSize: createSize(1134, 945),
		},
	},
	creasingTop: 8,
	bleed: 2,
	iconParams: ["icon", "campaignIcon"],
	mediaParams: ["customImage"],
	tabs: {
		type: "fixed",
		value: 2,
	},
	scenarioParams: {
		campaignIcon: true,
		cardsCount: true,
	},
	params: {
		title: true,
	},
};

const medium: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-medium",
	groupId: "medium",
	name: "Medium",
	size: createSize(87, 75.5),
	printSize: {
		300: {
			size: createSize(1028, 892),
			bleedSize: createSize(1075, 939),
		},
	},
	params: {
		title: true,
	},
};

const trim: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-trim",
	groupId: "trim",
	name: "divider.arkham-index.noTab.name",
	previewName: "divider.arkham-index.noTab.name",
	size: createSize(87, 75.5),
	printSize: {
		300: {
			size: createSize(1028, 892),
			bleedSize: createSize(1075, 939),
		},
	},
	params: {
		title: false,
	},
	tabs: null,
};

const vertical: ArkhamIndexDividerLayout = {
	...horizontal,
	orientation: "vertical",
	id: "arkham-index-vertical",
	groupId: "large",
	size: createSize(65, 108),
	printSize: {
		300: {
			size: createSize(768, 1276),
			bleedSize: createSize(815, 1323),
		},
	},
	params: {
		title: true,
	},
};

const verticalMedium: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-medium",
	groupId: "vertical-medium",
	size: createSize(65, 96),
	name: "Medium",
	printSize: {
		300: {
			size: createSize(768, 1134),
			bleedSize: createSize(815, 1181),
		},
	},
	creasingTop: 6.5,
	params: {
		title: true,
	},
};

const verticalTrim: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-trim",
	groupId: "vertical-trim",
	size: createSize(65, 98),
	name: "divider.arkham-index.noTab.name",
	previewName: "divider.arkham-index.noTab.name",
	printSize: {
		300: {
			size: createSize(768, 1157),
			bleedSize: createSize(815, 1204),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
			description: "info.sleeve.customCut.description",
		},
	],
	params: {
		title: false,
	},
	tabs: null,
};

const verticalTrim100: ArkhamIndexDividerLayout = {
	...verticalTrim,
	id: "arkham-index-vertical-trim-100",
	groupId: "vertical-trim-100",
	name: "divider.arkham-index.noTab100.name",
	previewName: "divider.arkham-index.noTab100.name",
	size: createSize(65, 100),
	printSize: {
		300: {
			size: createSize(768, 1181),
			bleedSize: createSize(815, 1228),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
		},
	],
	params: {
		title: false,
	},
	tabs: null,
};

export const arkhamIndexLayouts: DividerLayout[] = [
	horizontal,
	medium,
	trim,
	vertical,
	verticalMedium,
	verticalTrim,
	verticalTrim100,
];
