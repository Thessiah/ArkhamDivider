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
		return customIndexDividerHorizontalSmallObjects;
	}
	if (layout.id === "custom-index-lower-body") {
		return customIndexDividerHorizontalLowerBodyObjects;
	}
	if (layout.id.includes("pill")) {
		return customIndexDividerPillObjects;
	}
	if (layout.orientation === "horizontal") {
		return customIndexDividerHorizontalObjects;
	}
	return customIndexDividerVerticalObjects;
};
