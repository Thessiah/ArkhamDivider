import type { ArkhamIndexDividerTabSize } from "../../../model";

type Options = {
	tabWidth: number;
	tabLeft: number;
	tabSize: ArkhamIndexDividerTabSize;
	tabSideWidth: number;
	iconWidth: number;
	edgeMargin: number;
	iconPosition?: "left" | "right";
};

export const getArkhamIndexDividerIconLeft = ({
	tabSize,
	tabLeft,
	tabWidth,
	tabSideWidth,
	iconWidth,
	edgeMargin,
	iconPosition = "left",
}: Options) => {
	if (tabSize === "full") {
		return 0;
	}
	if (iconPosition === "right") {
		return tabLeft + tabWidth - iconWidth - tabSideWidth * 0.7 - edgeMargin;
	}
	if (tabSize !== 1) {
		return tabLeft + tabSideWidth * 0.7 + edgeMargin;
	}
	return tabLeft + (tabWidth - iconWidth) / 2;
};
