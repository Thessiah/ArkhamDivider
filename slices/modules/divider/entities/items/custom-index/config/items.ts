export type CustomIndexConfigItem = {
	/** Shown on the divider tab. */
	name: string;
	/** Path (under /public) to an icon image (PNG/SVG). */
	icon?: string | null;
	/** Path (under /public) to a per-item background image override. */
	background?: string | null;
};

/**
 * Edit this list to define your dividers. Re-run "Generate" (or "Add") from the
 * Custom Index category screen after changing it.
 */
export const customIndexItems: CustomIndexConfigItem[] = [
	{ name: "GOAL A" },
	{ name: "GOAL B" },
	{ name: "GOAL C" },
	{ name: "GOAL I" },
	{ name: "GOAL N" },
	{ name: "GOAL Y" },
	{ name: "GOAL Z" },
	{ name: "ITEM 1-10" },
	{ name: "ITEM 11-20" },
	{ name: "ITEM 21-30" },
	{ name: "ITEM 31-40" },
	{ name: "ITEM 41-50" },
	{ name: "ITEM 51-60" },
	{ name: "ITEM 61-70" },
	{ name: "ITEM 71-80" },
	{ name: "ITEM 81-90" },
	{ name: "ITEM 91-100" },
	{ name: "ITEM ANY" },
	{ name: "STRUCTURE 1-10" },
	{ name: "STRUCTURE 11-20" },
	{ name: "STRUCTURE 21-30" },
	{ name: "STRUCTURE 31-40" },
	{ name: "STRUCTURE M" },
	{ name: "STRUCTURE N" },
	{ name: "JOURNEY A" },
	{ name: "JOURNEY B" },
	{ name: "JOURNEY C" },
	{ name: "JOURNEY E" },
	{ name: "JOURNEY M" },
	{ name: "JOURNEY N" },
	{ name: "JOURNEY Q" },
	{ name: "JOURNEY R" },
	{ name: "JOURNEY S" },
	{ name: "JOURNEY T" },
	{ name: "JOURNEY U" },
	{ name: "JOURNEY V" },
	{ name: "JOURNEY W" },
	{ name: "JOURNEY Y" },
	{ name: "NIGHT A" },
	{ name: "NIGHT B" },
	{ name: "NIGHT M" },
	{ name: "NIGHT N" },
	{ name: "NIGHT P" },
	{ name: "NIGHT R" },
	{ name: "NIGHT T" },
	{ name: "NIGHT U" },
	{ name: "NIGHT V" },
	{ name: "NIGHT X" },
	{ name: "NIGHT Y" },
	{ name: "NIGHT Z" },
];
