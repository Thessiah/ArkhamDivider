import { v4 } from "uuid";
import type { Divider } from "../../model";

/**
 * How many phantom spacer dividers to prepend before an appended campaign
 * so that its first divider lands at tabIndex 0.
 *
 * Returns 0 if the existing count is already a multiple of tabsCount (no
 * padding needed).
 */
export const getTabResetPadding = (
	existingCount: number,
	tabsCount: number,
): number => (tabsCount - (existingCount % tabsCount)) % tabsCount;

/**
 * Creates blank phantom dividers that occupy positions in the divider array
 * (and therefore in the tabIndex sequence) without rendering any content.
 *
 * They use the "player" layout type so they pass the story-filter in
 * getDividersWithRelations, but getDividerPageLayouts maps them to
 * undefined, turning them into blank page slots.
 */
export const createPhantomDividers = (count: number): Divider[] =>
	Array.from({ length: count }, () => ({
		id: v4(),
		side: "front" as const,
		title: "",
		phantom: true,
		type: "player" as const,
		layoutType: "player" as const,
		faction: "neutral" as const,
	}));
