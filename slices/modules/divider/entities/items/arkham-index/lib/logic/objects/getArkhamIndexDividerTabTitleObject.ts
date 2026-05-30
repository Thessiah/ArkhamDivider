import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerTabSize,
} from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
	showSideText: boolean;
	tabSize: ArkhamIndexDividerTabSize;
	indentSize: number;
	iconPosition?: "left" | "right";
};

export const getArkhamIndexDividerTabTitleObject = (options: Options) => {
	const { objects: O, showSideText, tabSize, indentSize } = options;
	const base = getBaseObject(options);

	const sideObject = {
		...base,
		...(showSideText ? getSideTextObject(options) : {}),
	};

	const isFullSize = tabSize === "full";

	if (!isFullSize) {
		return {
			...sideObject,
			left: sideObject.left + indentSize,
			right: sideObject.right + indentSize,
		};
	}

	const left = showSideText
		? O.tabTitle.fullOffset.withSideText
		: O.tabTitle.fullOffset.default;

	return {
		...sideObject,
		left: left + indentSize,
		...(isFullSize ? O.tabTitle.full : {}),
	};
};

const getSideTextObject = ({ objects: O, iconPosition }: Options) => {
	if (iconPosition === "right") {
		return {
			right: O.tabTitle.withSideText.right,
		};
	}
	return O.tabTitle.withSideText;
};

const getBaseObject = ({ objects: O, showIcon, iconPosition }: Options) => {
	if (showIcon) {
		if (iconPosition === "right") {
			return {
				...O.tabTitle.default,
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
