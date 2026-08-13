import { customIndex2Settings } from "../../../config";
import type { CustomIndex2DividerSxCallback } from "../../../model";

export const getTitleSx: CustomIndex2DividerSxCallback = ({ mm }) => {
	return {
		color: "black",
		fontFamily: customIndex2Settings.font,
		letterSpacing: mm(customIndex2Settings.letterSpacing),
	};
};

export const getTextSx: CustomIndex2DividerSxCallback = () => {
	return {
		height: "100%",
		width: "100%",
		textAlign: "left",
	};
};

export const getTitleClearSx: CustomIndex2DividerSxCallback = ({ mm }) => {
	return {
		color: "black",
		top: `calc(100% + ${mm(1)})`,
	};
};

export const getTitleOutlineSx: CustomIndex2DividerSxCallback = ({ mm }) => {
	return {
		borderWidth: mm(0.3),
		borderRadius: mm(1),
		borderColor: "black",
		top: mm(-0.1),
		bottom: mm(0.2),
		left: mm(-1),
		right: mm(-0.5),
	};
};
