import type { CustomIndex2DividerProps } from "../../model";

export function showCustomIndex2DividerTabIcon(
	divider: CustomIndex2DividerProps,
) {
	return Boolean(divider.params?.iconImage);
}
