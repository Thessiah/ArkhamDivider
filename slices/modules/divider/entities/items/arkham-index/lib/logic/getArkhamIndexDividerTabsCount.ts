import type { ArkhamIndexDividerLayout } from "../../model";

export function getArkhamIndexDividerTabsCount(
	layout: ArkhamIndexDividerLayout,
) {
	if (!layout.tabs) {
		return 2;
	}
	if (layout.tabs.type === "fixed") {
		return layout.tabs.value;
	}
	return 2;
}
