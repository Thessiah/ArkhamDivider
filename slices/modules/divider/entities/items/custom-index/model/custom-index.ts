import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getCustomIndexDividerLayoutObjects } from "../lib";

export type CustomIndexDividerTabSize = number | "full";

export type CustomIndexDividerParams = {
	tabTitle?: string | null;
	tabTitleFontSizeScale?: number;

	/** Path (under /public) to a per-item background image override. */
	background?: string | null;
	/** Path (under /public) to a per-item icon image (PNG/SVG). */
	iconImage?: string | null;

	tabSize?: CustomIndexDividerTabSize;
	tabIndex?: number;
	indent?: boolean;
};

export type CustomIndexDividerProps =
	DividerWithRelations<CustomIndexDividerParams>;

export type CustomIndexDividerLayout = DividerLayout<{
	title: boolean;
}>;

export type CustomIndexDividerLayoutObjects = ReturnType<
	typeof getCustomIndexDividerLayoutObjects
>;

export type CustomIndexDividerSxOptions = {
	objects: CustomIndexDividerLayoutObjects;
	showIcon: boolean;
	tabIndex: number;
	tabSize: CustomIndexDividerTabSize;
	indentSize: number;
};

export type CustomIndexDividerSxCallback<T = object> = PrintSxCallback<
	CustomIndexDividerSxOptions & T
>;
