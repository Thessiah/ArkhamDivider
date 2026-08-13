import { withHalfWidthSize2Tab } from "@/modules/divider/shared/lib/logic/tab";
import {
	customIndex2DividerHorizontalLowerBodyObjects,
	customIndex2DividerHorizontalObjects,
	customIndex2DividerHorizontalSmallObjects,
	customIndex2DividerPillObjects,
	customIndex2DividerVerticalMediumObjects,
	customIndex2DividerVerticalObjects,
	customIndex2DividerVerticalTrimObjects,
} from "../../../config";
import type { CustomIndex2DividerLayout } from "../../../model";

export const getCustomIndex2DividerLayoutObjects = (
	layout: CustomIndex2DividerLayout,
) => {
	if (layout.id === "custom-index-2-vertical-trim") {
		return customIndex2DividerVerticalTrimObjects;
	}
	if (layout.id === "custom-index-2-vertical-medium") {
		return customIndex2DividerVerticalMediumObjects;
	}
	if (layout.id.includes("trim")) {
		return withHalfWidthSize2Tab(
			customIndex2DividerHorizontalSmallObjects,
			layout,
		);
	}
	if (layout.id === "custom-index-2-lower-body") {
		return withHalfWidthSize2Tab(
			customIndex2DividerHorizontalLowerBodyObjects,
			layout,
		);
	}
	if (layout.id.includes("pill")) {
		return withHalfWidthSize2Tab(customIndex2DividerPillObjects, layout);
	}
	if (layout.orientation === "horizontal") {
		return withHalfWidthSize2Tab(customIndex2DividerHorizontalObjects, layout);
	}
	return customIndex2DividerVerticalObjects;
};
