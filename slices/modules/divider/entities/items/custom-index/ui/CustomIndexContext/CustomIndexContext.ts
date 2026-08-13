import { createContext, useContext } from "react";
import type {
	CustomIndexDividerLayout,
	CustomIndexDividerProps,
	CustomIndexDividerSxOptions,
	CustomIndexDividerTabSize,
} from "../../model";

type CustomIndexContextParams = {
	divider: CustomIndexDividerProps;
	tabSize: CustomIndexDividerTabSize;
	tabIndex: number;
	layout: CustomIndexDividerLayout;
	sxOptions: CustomIndexDividerSxOptions;
};

export const CustomIndexContext = createContext<CustomIndexContextParams>({
	divider: {} as CustomIndexDividerProps,
	tabSize: 1,
	tabIndex: 0,
	layout: {} as CustomIndexDividerLayout,
	sxOptions: {} as CustomIndexDividerSxOptions,
});

export const useCustomIndexContext = () => useContext(CustomIndexContext);
