import {
	arkhamIndexDividerHorizontalLowerBodyObjects,
	arkhamIndexDividerHorizontalObjects,
	arkhamIndexDividerHorizontalSmallObjects,
	arkhamIndexDividerPillObjects,
	arkhamIndexDividerVerticalMediumObjects,
	arkhamIndexDividerVerticalObjects,
	arkhamIndexDividerVerticalTrimObjects,
} from "../../../config";
import type { ArkhamIndexDividerLayout } from "../../../model";

export const getArkhamIndexDividerLayoutObjects = (
	layout: ArkhamIndexDividerLayout,
) => {
	if (layout.id === "arkham-index-vertical-trim") {
		return arkhamIndexDividerVerticalTrimObjects;
	}
	if (layout.id === "arkham-index-vertical-medium") {
		return arkhamIndexDividerVerticalMediumObjects;
	}
	if (layout.id.includes("trim")) {
		return arkhamIndexDividerHorizontalSmallObjects;
	}
	if (layout.id === "arkham-index-lower-body") {
		return arkhamIndexDividerHorizontalLowerBodyObjects;
	}
	if (layout.groupId === "pill") {
		return arkhamIndexDividerPillObjects;
	}
	if (layout.orientation === "horizontal") {
		return arkhamIndexDividerHorizontalObjects;
	}
	return arkhamIndexDividerVerticalObjects;
};
