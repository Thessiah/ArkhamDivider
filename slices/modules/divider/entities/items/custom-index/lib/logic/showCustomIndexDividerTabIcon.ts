import type { CustomIndexDividerProps } from "../../model";

export function showCustomIndexDividerTabIcon(
	divider: CustomIndexDividerProps,
) {
	return Boolean(divider.params?.iconImage);
}
