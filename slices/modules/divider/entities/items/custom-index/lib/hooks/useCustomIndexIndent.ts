import { useCallback } from "react";
import { setDividerParam } from "@/modules/divider/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import { useCustomIndexContext } from "../../ui/CustomIndexContext";

export const useCustomIndexIndent = () => {
	const { tabSize, tabIndex, divider } = useCustomIndexContext();
	const dispatch = useAppDispatch();
	const indent = divider.params?.indent ?? false;
	const canUseIndent = tabSize === 2 && tabIndex !== 0;
	const canIncreaseIndent = !indent && canUseIndent;
	const canDecreaseIndent = indent && canUseIndent;

	const dividerId = divider.id;

	const increaseIndent = useCallback(() => {
		if (canIncreaseIndent) {
			dispatch(
				setDividerParam({
					id: dividerId,
					key: "indent",
					value: true,
				}),
			);
		}
	}, [canIncreaseIndent, dispatch, dividerId]);

	const decreaseIndent = useCallback(() => {
		if (canDecreaseIndent) {
			dispatch(
				setDividerParam({
					id: dividerId,
					key: "indent",
					value: false,
				}),
			);
		}
	}, [canDecreaseIndent, dispatch, dividerId]);

	return {
		canIncreaseIndent,
		canDecreaseIndent,
		increaseIndent,
		decreaseIndent,
	};
};
