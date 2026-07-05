import type { ArkhamIndexDividerTabSize } from "../../../model";

type Align = "left" | "center" | "right";

type Options = {
	showIcon: boolean;
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
};
export const getArkhamIndexTitleAlign = ({
	showIcon,
	tabIndex,
	tabSize,
}: Options): Align => {
	if (!showIcon) {
		return "center";
	}
	if (tabSize === "full") {
		return "left";
	}
	return tabIndex === 0 ? "right" : "left";
};
