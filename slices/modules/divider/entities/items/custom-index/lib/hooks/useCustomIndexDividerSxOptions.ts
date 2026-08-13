import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import type {
	CustomIndexDividerLayout,
	CustomIndexDividerProps,
	CustomIndexDividerSxOptions,
	CustomIndexDividerTabSize,
} from "../../model";
import { getCustomIndexDividerTabIndentSize } from "../logic";
import { getCustomIndexDividerLayoutObjects } from "../logic/objects/getCustomIndexDividerLayoutObjects";

type Options = {
	divider: CustomIndexDividerProps;
	tabIndex: number;
	tabSize: CustomIndexDividerTabSize;
};

export const useCustomIndexDividerSxOptions = (options: Options) => {
	const { divider, tabIndex, tabSize } = options;
	const layout = useAppSelector(selectLayout) as CustomIndexDividerLayout;
	const showIcon = Boolean(divider.params?.iconImage);
	const objects = getCustomIndexDividerLayoutObjects(layout);
	const indentSize = getCustomIndexDividerTabIndentSize({
		divider,
		tabIndex,
		tabSize,
		tabIndentSize: objects.tab.indentSize,
	});

	return useMemo((): CustomIndexDividerSxOptions => {
		return {
			objects,
			showIcon,
			tabIndex,
			tabSize,
			indentSize,
		};
	}, [objects, showIcon, tabIndex, tabSize, indentSize]);
};
