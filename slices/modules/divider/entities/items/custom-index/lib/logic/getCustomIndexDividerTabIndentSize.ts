import type {
	CustomIndexDividerProps,
	CustomIndexDividerTabSize,
} from "../../model";

type Options = {
	divider: CustomIndexDividerProps;
	tabIndex: number;
	tabSize: CustomIndexDividerTabSize;
	/** From `getCustomIndexDividerLayoutObjects(…).tab.indentSize` (mm). */
	tabIndentSize: number;
};

/**
 * Horizontal offset for tab column when "indent" is on (only for 2-tab layout, not the first tab).
 */
export const getCustomIndexDividerTabIndentSize = ({
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
