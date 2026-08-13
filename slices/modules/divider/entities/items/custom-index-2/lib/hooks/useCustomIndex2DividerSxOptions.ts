import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerProps,
	CustomIndex2DividerSxOptions,
	CustomIndex2DividerTabSize,
} from "../../model";
import { getCustomIndex2DividerTabIndentSize } from "../logic";
import { getCustomIndex2DividerLayoutObjects } from "../logic/objects/getCustomIndex2DividerLayoutObjects";

type Options = {
	divider: CustomIndex2DividerProps;
	tabIndex: number;
	tabSize: CustomIndex2DividerTabSize;
};

export const useCustomIndex2DividerSxOptions = (options: Options) => {
	const { divider, tabIndex, tabSize } = options;
	const layout = useAppSelector(selectLayout) as CustomIndex2DividerLayout;
	const showIcon = Boolean(divider.params?.iconImage);
	const objects = getCustomIndex2DividerLayoutObjects(layout);
	const indentSize = getCustomIndex2DividerTabIndentSize({
		divider,
		tabIndex,
		tabSize,
		tabIndentSize: objects.tab.indentSize,
	});

	return useMemo((): CustomIndex2DividerSxOptions => {
		return {
			objects,
			showIcon,
			tabIndex,
			tabSize,
			indentSize,
		};
	}, [objects, showIcon, tabIndex, tabSize, indentSize]);
};
