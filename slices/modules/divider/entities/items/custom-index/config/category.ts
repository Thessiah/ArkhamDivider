import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { customIndexCategoryId } from "./common";
import { customIndexLayouts } from "./layouts";

export const customIndexCategory: DividerCategory = createDividerCategory({
	id: customIndexCategoryId,
	type: "divider",
	name: "Custom Index",
	image: "/images/divider/render/custom-index.avif",
	layouts: customIndexLayouts,
	authors: [],
});
