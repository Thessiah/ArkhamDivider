import type {
	CustomIndexDividerLayout,
	CustomIndexDividerProps,
	CustomIndexDividerTabSize,
} from "../../model";
import { getCustomIndexDividerTabsCount } from "./getCustomIndexDividerTabsCount";

type Options = {
	layout: CustomIndexDividerLayout;
	divider: CustomIndexDividerProps;
};

export const getCustomIndexDividerTabSize = ({
	divider,
	layout,
}: Options): CustomIndexDividerTabSize => {
	if (layout.params?.title === false) {
		return "full";
	}
	const tabsCount = getCustomIndexDividerTabsCount(layout);
	const tabSize = divider.params?.tabSize ?? (tabsCount === 2 ? 2 : 1);
	return getTabSizeForTabsCount(tabSize, tabsCount);
};

const getTabSizeForTabsCount = (
	tabSize: CustomIndexDividerTabSize,
	tabsCount: number,
) => {
	if (tabsCount === 2 && tabSize === 1) {
		return 2;
	}
	return tabSize;
};
