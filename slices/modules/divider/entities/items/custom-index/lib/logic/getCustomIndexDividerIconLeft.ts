import type { CustomIndexDividerTabSize } from "../../model";

type Options = {
	tabWidth: number;
	tabLeft: number;
	tabSize: CustomIndexDividerTabSize;
	tabSideWidth: number;
	iconWidth: number;
	edgeMargin: number;
	iconPosition?: "left" | "right";
};

export const getCustomIndexDividerIconLeft = ({
	tabSize,
	tabLeft,
	tabWidth,
	tabSideWidth,
	iconWidth,
	edgeMargin,
	iconPosition = "left",
}: Options) => {
	if (tabSize === "full") {
		return edgeMargin;
	}
	if (iconPosition === "right") {
		return tabLeft + tabWidth - iconWidth - tabSideWidth * 0.7 - edgeMargin;
	}
	if (tabSize !== 1) {
		return tabLeft + tabSideWidth * 0.7 + edgeMargin;
	}
	return tabLeft + (tabWidth - iconWidth) / 2;
};
