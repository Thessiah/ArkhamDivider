import type { CustomIndexDividerLayout } from "../../model";

export function getCustomIndexDividerTabsCount(
	layout: CustomIndexDividerLayout,
) {
	if (!layout.tabs) {
		return 2;
	}
	if (layout.tabs.type === "fixed") {
		return layout.tabs.value;
	}
	return 2;
}
