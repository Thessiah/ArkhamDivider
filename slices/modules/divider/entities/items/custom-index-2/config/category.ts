import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { customIndex2CategoryId } from "./common";
import { customIndex2Layouts } from "./layouts";

export const customIndex2Category: DividerCategory = createDividerCategory({
	id: customIndex2CategoryId,
	type: "divider",
	name: "Custom Index 2",
	image: "/images/divider/render/custom-index-2.avif",
	layouts: customIndex2Layouts,
	authors: [],
});
