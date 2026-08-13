import { withHalfWidthSize2Tab } from "@/modules/divider/shared/lib/logic/tab";
import {
	customIndexDividerHorizontalLowerBodyObjects,
	customIndexDividerHorizontalObjects,
	customIndexDividerHorizontalSmallObjects,
	customIndexDividerPillObjects,
	customIndexDividerVerticalMediumObjects,
	customIndexDividerVerticalObjects,
	customIndexDividerVerticalTrimObjects,
} from "../../../config";
import type { CustomIndexDividerLayout } from "../../../model";

export const getCustomIndexDividerLayoutObjects = (
	layout: CustomIndexDividerLayout,
) => {
	if (layout.id === "custom-index-vertical-trim") {
		return customIndexDividerVerticalTrimObjects;
	}
	if (layout.id === "custom-index-vertical-medium") {
		return customIndexDividerVerticalMediumObjects;
	}
	if (layout.id.includes("trim")) {
		return withHalfWidthSize2Tab(
			customIndexDividerHorizontalSmallObjects,
			layout,
		);
	}
	if (layout.id === "custom-index-lower-body") {
		return withHalfWidthSize2Tab(
			customIndexDividerHorizontalLowerBodyObjects,
			layout,
		);
	}
	if (layout.id.includes("pill")) {
		return withHalfWidthSize2Tab(customIndexDividerPillObjects, layout);
	}
	if (layout.orientation === "horizontal") {
		return withHalfWidthSize2Tab(customIndexDividerHorizontalObjects, layout);
	}
	return customIndexDividerVerticalObjects;
};
