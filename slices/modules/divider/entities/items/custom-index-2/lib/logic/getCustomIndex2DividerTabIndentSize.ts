import type {
	CustomIndex2DividerProps,
	CustomIndex2DividerTabSize,
} from "../../model";

type Options = {
	divider: CustomIndex2DividerProps;
	tabIndex: number;
	tabSize: CustomIndex2DividerTabSize;
	/** From `getCustomIndex2DividerLayoutObjects(…).tab.indentSize` (mm). */
	tabIndentSize: number;
};

/**
 * Horizontal offset for tab column when "indent" is on (only for 2-tab layout, not the first tab).
 */
export const getCustomIndex2DividerTabIndentSize = ({
	divider,
	tabIndex,
	tabSize,
	tabIndentSize,
}: Options): number => {
	const indent = divider.params?.indent ?? false;
	if (!indent || tabSize !== 2 || tabIndex === 0) {
		return 0;
	}
	return tabIndentSize;
};
