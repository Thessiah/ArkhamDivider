import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerProps,
	CustomIndex2DividerTabSize,
} from "../../model";
import { getCustomIndex2DividerTabsCount } from "./getCustomIndex2DividerTabsCount";

type Options = {
	layout: CustomIndex2DividerLayout;
	divider: CustomIndex2DividerProps;
};

export const getCustomIndex2DividerTabSize = ({
	divider,
	layout,
}: Options): CustomIndex2DividerTabSize => {
	if (layout.params?.title === false) {
		return "full";
	}
	const tabsCount = getCustomIndex2DividerTabsCount(layout);
	const tabSize = divider.params?.tabSize ?? (tabsCount === 2 ? 2 : 1);
	return getTabSizeForTabsCount(tabSize, tabsCount);
};

const getTabSizeForTabsCount = (
	tabSize: CustomIndex2DividerTabSize,
	tabsCount: number,
) => {
	if (tabsCount === 2 && tabSize === 1) {
		return 2;
	}
	return tabSize;
};
