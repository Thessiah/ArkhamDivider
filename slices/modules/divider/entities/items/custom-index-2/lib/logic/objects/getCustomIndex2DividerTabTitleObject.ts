import type {
	CustomIndex2DividerLayoutObjects,
	CustomIndex2DividerTabSize,
} from "../../../model";

type Options = {
	objects: CustomIndex2DividerLayoutObjects;
	showIcon: boolean;
	tabSize: CustomIndex2DividerTabSize;
	indentSize: number;
	iconPosition?: "left" | "right";
};

export const getCustomIndex2DividerTabTitleObject = (options: Options) => {
	const { objects: O, tabSize, indentSize, showIcon } = options;
	const base = getBaseObject(options);

	const isFullSize = tabSize === "full";

	// Only reserve the icon-sized offset on full-width tabs when an icon is
	// actually shown — otherwise the title would have unexplained blank space.
	if (!isFullSize || !showIcon) {
		return {
			...base,
			left: base.left + indentSize,
			right: base.right + indentSize,
		};
	}

	return {
		...base,
		left: O.tabTitle.fullOffset.default + indentSize,
		...O.tabTitle.full,
	};
};

const getBaseObject = ({ objects: O, showIcon, iconPosition }: Options) => {
	if (showIcon) {
		if (iconPosition === "right") {
			return {
				...O.tabTitle.default,
				left: O.tabTitle.withIconRight?.left ?? O.tabTitle.default.left,
				right: O.tabTitle.withIcon.right,
			};
		}
		return {
			...O.tabTitle.default,
			...O.tabTitle.withIcon,
		};
	}
	return O.tabTitle.default;
};
