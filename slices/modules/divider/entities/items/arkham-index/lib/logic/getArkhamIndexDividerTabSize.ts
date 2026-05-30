import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";
import { getArkhamIndexDividerTabsCount } from "./getArkhamIndexDividerTabsCount";

type Options = {
	layout: ArkhamIndexDividerLayout;
	divider: ArkhamIndexDividerProps;
};

export const getArkhamIndexDividerTabSize = ({
	divider,
	layout,
}: Options): ArkhamIndexDividerTabSize => {
	if (layout.params?.title === false) {
		return "full";
	}
	const tabsCount = getArkhamIndexDividerTabsCount(layout);
	const tabSize =
		divider.params?.tabSize ?? getDefaultTabSize(divider, tabsCount);
	return getTabSizeForTabsCount(tabSize, tabsCount);
};

const getTabSizeForTabsCount = (
	tabSize: ArkhamIndexDividerTabSize,
	tabsCount: number,
) => {
	if (tabsCount === 2 && tabSize === 1) {
		return 2;
	}
	return tabSize;
};

const getDefaultTabSize = (
	divider: ArkhamIndexDividerProps,
	tabsCount: number,
): ArkhamIndexDividerTabSize => {
	if (divider.type === "campaign") {
		return 3;
	}

	if (
		divider.type === "player" &&
		divider.subtype &&
		["investigators", "faction"].includes(divider.subtype)
	) {
		return 2;
	}

	if (tabsCount === 2) {
		return 2;
	}

	return 1;
};
