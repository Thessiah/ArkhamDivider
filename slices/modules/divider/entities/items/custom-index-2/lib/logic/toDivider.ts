import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import type { CustomIndex2ConfigItem } from "../../config";
import type { CustomIndex2DividerParams } from "../../model";

/**
 * Maps a user-authored config item to a `Divider`. Internally reuses the shared
 * `"player"` divider shape with a neutral faction — this category has no factions
 * of its own, and the shared `Divider` union doesn't have a lore-free variant.
 */
export const toDivider = (
	item: CustomIndex2ConfigItem,
): Divider<CustomIndex2DividerParams> => ({
	id: v4(),
	side: "front",
	type: "player",
	layoutType: "player",
	faction: "neutral",
	title: item.name,
	params: {
		background: item.background ?? null,
		iconImage: item.icon ?? null,
	},
});
