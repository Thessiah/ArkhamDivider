import { withHalfWidthSize2Tab } from "@/modules/divider/shared/lib/logic/tab";
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
		return withHalfWidthSize2Tab(
			arkhamIndexDividerHorizontalSmallObjects,
			layout,
		);
	}
	if (layout.id === "arkham-index-lower-body") {
		return withHalfWidthSize2Tab(
			arkhamIndexDividerHorizontalLowerBodyObjects,
			layout,
		);
	}
	if (layout.groupId === "pill") {
		return withHalfWidthSize2Tab(arkhamIndexDividerPillObjects, layout);
	}
	if (layout.orientation === "horizontal") {
		return withHalfWidthSize2Tab(arkhamIndexDividerHorizontalObjects, layout);
	}
	return arkhamIndexDividerVerticalObjects;
};
