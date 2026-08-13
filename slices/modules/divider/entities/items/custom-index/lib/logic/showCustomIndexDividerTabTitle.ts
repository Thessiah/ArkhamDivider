import type { CustomIndexDividerTabSize } from "../../model";

type Options = {
	tabSize: CustomIndexDividerTabSize;
	showIcon: boolean;
};

export const showCustomIndexDividerTabTitle = ({
	tabSize,
	showIcon,
}: Options) => {
	if (tabSize === 1 && showIcon) {
		return false;
	}
	return true;
};
