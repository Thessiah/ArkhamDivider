import { customIndexSettings } from "../../../config";
import type { CustomIndexDividerSxCallback } from "../../../model";

export const getTitleSx: CustomIndexDividerSxCallback = ({ mm }) => {
	return {
		color: "black",
		fontFamily: customIndexSettings.font,
		letterSpacing: mm(customIndexSettings.letterSpacing),
	};
};

export const getTextSx: CustomIndexDividerSxCallback = () => {
	return {
		height: "100%",
		width: "100%",
		textAlign: "left",
	};
};

export const getTitleClearSx: CustomIndexDividerSxCallback = ({ mm }) => {
	return {
		color: "black",
		top: `calc(100% + ${mm(1)})`,
	};
};

export const getTitleOutlineSx: CustomIndexDividerSxCallback = ({ mm }) => {
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
