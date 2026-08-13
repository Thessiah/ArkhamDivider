import { createContext, useContext } from "react";
import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerProps,
	CustomIndex2DividerSxOptions,
	CustomIndex2DividerTabSize,
} from "../../model";

type CustomIndex2ContextParams = {
	divider: CustomIndex2DividerProps;
	tabSize: CustomIndex2DividerTabSize;
	tabIndex: number;
	layout: CustomIndex2DividerLayout;
	sxOptions: CustomIndex2DividerSxOptions;
};

export const CustomIndex2Context = createContext<CustomIndex2ContextParams>({
	divider: {} as CustomIndex2DividerProps,
	tabSize: 1,
	tabIndex: 0,
	layout: {} as CustomIndex2DividerLayout,
	sxOptions: {} as CustomIndex2DividerSxOptions,
});

export const useCustomIndex2Context = () => useContext(CustomIndex2Context);
