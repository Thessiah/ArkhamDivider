import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { CustomIndex2DividerLayout } from "../model";
import { customIndex2CategoryId } from "./common";

const horizontal: CustomIndex2DividerLayout = {
	id: "custom-index-2",
	types: ["player"],
	categoryId: customIndex2CategoryId,
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

const horizontalLowerBody: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-lower-body",
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

const pill: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-pill",
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

const pillNarrow: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-pill-narrow",
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

const medium: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-medium",
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

const wide: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-94x74",
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

const trim: CustomIndex2DividerLayout = {
	...horizontal,
	id: "custom-index-2-trim",
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

const vertical: CustomIndex2DividerLayout = {
	...horizontal,
	orientation: "vertical",
	id: "custom-index-2-vertical",
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

const verticalMedium: CustomIndex2DividerLayout = {
	...vertical,
	id: "custom-index-2-vertical-medium",
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

const verticalTrim: CustomIndex2DividerLayout = {
	...vertical,
	id: "custom-index-2-vertical-trim",
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

const verticalTrim100: CustomIndex2DividerLayout = {
	...verticalTrim,
	id: "custom-index-2-vertical-trim-100",
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

export const customIndex2Layouts: DividerLayout[] = [
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
