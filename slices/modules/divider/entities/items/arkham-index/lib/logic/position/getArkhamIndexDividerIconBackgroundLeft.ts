import type { ArkhamIndexDividerLayoutObjects } from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	iconPosition?: "left" | "right";
};

export const getArkhamIndexDividerIconBackgroundLeft = ({
	objects: O,
	iconPosition = "left",
}: Options) => {
	if (iconPosition === "right") {
		return O.icon.width - O.iconBackground.left - O.iconBackground.width;
	}

	return O.iconBackground.left;
};
