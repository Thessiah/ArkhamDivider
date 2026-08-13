import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { CustomIndexDividerLayout } from "../model";
import { customIndexCategoryId } from "./common";

const horizontal: CustomIndexDividerLayout = {
	id: "custom-index",
	types: ["player"],
	categoryId: customIndexCategoryId,
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
	iconParams: ["icon"],
	tabs: {
		type: "fixed",
		value: 2,
	},
	params: {
		title: true,
	},
};

const horizontalLowerBody: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-lower-body",
	groupId: "lower-body",
	name: "Lower Body",
	creasingTop: 38,
	maxItemsPerPage: 14,
	bleed: 1,
	printSize: {
		300: {
			size: createSize(1087, 898),
			bleedSize: createSize(1110, 921),
		},
	},
};

const pill: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-pill",
	groupId: "pill",
	name: "Pill",
	size: createSize(50, 8),
	printSize: {
		300: {
			size: createSize(591, 94),
			bleedSize: createSize(638, 142),
		},
	},
	tabs: null,
	params: {
		title: false,
	},
};

const pillNarrow: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-pill-narrow",
	groupId: "pill-narrow",
	name: "Pill (47.3mm)",
	size: createSize(47.3, 8),
	printSize: {
		300: {
			size: createSize(559, 94),
			bleedSize: createSize(606, 142),
		},
	},
	tabs: null,
	params: {
		title: false,
	},
};

const medium: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-medium",
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

const wide: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-94x74",
	groupId: "94x74",
	name: "94x74mm",
	size: createSize(94, 74),
	printSize: {
		300: {
			size: createSize(1110, 874),
			bleedSize: createSize(1157, 921),
		},
	},
	params: {
		title: true,
	},
};

const trim: CustomIndexDividerLayout = {
	...horizontal,
	id: "custom-index-trim",
	groupId: "trim",
	name: "No Tab",
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

const vertical: CustomIndexDividerLayout = {
	...horizontal,
	orientation: "vertical",
	id: "custom-index-vertical",
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

const verticalMedium: CustomIndexDividerLayout = {
	...vertical,
	id: "custom-index-vertical-medium",
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

const verticalTrim: CustomIndexDividerLayout = {
	...vertical,
	id: "custom-index-vertical-trim",
	groupId: "vertical-trim",
	size: createSize(65, 98),
	name: "No Tab",
	printSize: {
		300: {
			size: createSize(768, 1157),
			bleedSize: createSize(815, 1204),
		},
	},
	params: {
		title: false,
	},
	tabs: null,
};

const verticalTrim100: CustomIndexDividerLayout = {
	...verticalTrim,
	id: "custom-index-vertical-trim-100",
	groupId: "vertical-trim-100",
	name: "No Tab (100mm)",
	size: createSize(65, 100),
	printSize: {
		300: {
			size: createSize(768, 1181),
			bleedSize: createSize(815, 1228),
		},
	},
	params: {
		title: false,
	},
	tabs: null,
};

export const customIndexLayouts: DividerLayout[] = [
	horizontal,
	horizontalLowerBody,
	pill,
	pillNarrow,
	medium,
	wide,
	trim,
	vertical,
	verticalMedium,
	verticalTrim,
	verticalTrim100,
];
