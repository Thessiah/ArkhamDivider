import type { ArkhamIndexDividerProps } from "../../model";
import { getArkhamIndexSideText } from "./getArkhamIndexSideText";

export const getArkhamIndexPrefixedTabTitle = (
	divider: ArkhamIndexDividerProps,
	title: string,
) => {
	const prefix = getArkhamIndexSideText(divider);
	if (!prefix) {
		return title;
	}
	if (divider.type === "player") {
		return `${title} (${prefix} Exp)`;
	}
	return `${prefix}: ${title}`;
};
