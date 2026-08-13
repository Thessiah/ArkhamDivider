import type { CustomIndex2DividerTabSize } from "../../model";

type Options = {
	tabSize: CustomIndex2DividerTabSize;
	showIcon: boolean;
};

export const showCustomIndex2DividerTabTitle = ({
	tabSize,
	showIcon,
}: Options) => {
	if (tabSize === 1 && showIcon) {
		return false;
	}
	return true;
};
