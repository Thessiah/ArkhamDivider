import { mergeDeepRight } from "ramda";

type LayoutWithSize = {
	size: {
		width: number;
	};
};

type ObjectsWithTabWidths = {
	tab: {
		width: Record<number, number>;
	};
};

/**
 * Size-2 tabs span half the divider width (e.g. 46mm on 92mm, 47mm on 94mm).
 * Use for horizontal index-style layouts instead of a hardcoded mm value.
 */
export const withHalfWidthSize2Tab = <T extends ObjectsWithTabWidths>(
	objects: T,
	layout: LayoutWithSize,
): T =>
	mergeDeepRight(objects, {
		tab: {
			width: {
				2: layout.size.width / 2,
			},
		},
	}) as T;
