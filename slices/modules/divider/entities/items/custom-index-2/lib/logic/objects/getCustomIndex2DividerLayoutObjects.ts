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
		return customIndex2DividerHorizontalSmallObjects;
	}
	if (layout.id === "custom-index-2-lower-body") {
		return customIndex2DividerHorizontalLowerBodyObjects;
	}
	if (layout.id.includes("pill")) {
		return customIndex2DividerPillObjects;
	}
	if (layout.orientation === "horizontal") {
		return customIndex2DividerHorizontalObjects;
	}
	return customIndex2DividerVerticalObjects;
};
