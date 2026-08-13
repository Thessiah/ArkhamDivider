import type { CustomIndex2DividerLayout } from "../../model";

export function getCustomIndex2DividerTabsCount(
	layout: CustomIndex2DividerLayout,
) {
	if (!layout.tabs) {
		return 2;
	}
	if (layout.tabs.type === "fixed") {
		return layout.tabs.value;
	}
	return 2;
}
