import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getCustomIndex2DividerLayoutObjects } from "../lib";

export type CustomIndex2DividerTabSize = number | "full";

export type CustomIndex2DividerParams = {
	tabTitle?: string | null;
	tabTitleFontSizeScale?: number;

	/** Path (under /public) to a per-item background image override. */
	background?: string | null;
	/** Path (under /public) to a per-item icon image (PNG/SVG). */
	iconImage?: string | null;

	tabSize?: CustomIndex2DividerTabSize;
	tabIndex?: number;
	indent?: boolean;
};

export type CustomIndex2DividerProps =
	DividerWithRelations<CustomIndex2DividerParams>;

export type CustomIndex2DividerLayout = DividerLayout<{
	title: boolean;
}>;

export type CustomIndex2DividerLayoutObjects = ReturnType<
	typeof getCustomIndex2DividerLayoutObjects
>;

export type CustomIndex2DividerSxOptions = {
	objects: CustomIndex2DividerLayoutObjects;
	showIcon: boolean;
	tabIndex: number;
	tabSize: CustomIndex2DividerTabSize;
	indentSize: number;
};

export type CustomIndex2DividerSxCallback<T = object> = PrintSxCallback<
	CustomIndex2DividerSxOptions & T
>;
