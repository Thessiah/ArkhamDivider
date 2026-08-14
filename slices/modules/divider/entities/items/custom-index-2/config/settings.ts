import type { FontFamily } from "@/shared/model";

/**
 * Global settings for the Custom Index category. Edit these to fit your game.
 */
export type CustomIndex2Settings = {
	/** Font family used for the tab title text, on screen and in the print PDF.
	 *  Must be registered as a slices/shared/fonts/common/*.ts entry (`createFont`) —
	 *  see CustomIndex2.ts in that folder for the placeholder to swap out. */
	font: FontFamily;
	/** Path (under /public) to the default background image, shown when an item has
	 *  no `background` override. Leave `null` for a plain white background. */
	background: string | null;
	/** Base font size (mm) for the tab title text, on screen and in the print PDF.
	 *  The title box height scales with this value, and text still auto-shrinks to
	 *  fit if a name is too long — raise it if your font renders visually smaller
	 *  than Arkhamic did. Also scales the tab icon glyph size proportionally (kept
	 *  3/4 of this). On the Pill layout (8mm tall) values above ~7 will start to
	 *  overflow the divider's physical height; the taller layouts have more room. */
	titleFontSize: number;
	/** When false (default), the tab title stays on one line and auto-shrinks its
	 *  font size to fit the tab. When true, auto-shrink is disabled — text wraps
	 *  normally at the fixed `titleFontSize` and is allowed to overflow past the
	 *  tab into the divider body if it's too long to fit. */
	wordWrap: boolean;
	/** Extra space (mm) added between letters in the tab title, on screen and in
	 *  the print PDF. 0 is normal spacing; negative values tighten it. */
	letterSpacing: number;
	/** Line height multiplier for the tab title when `wordWrap` is on (only
	 *  matters once text actually wraps to more than one line). 1 is tight/normal
	 *  spacing; higher values (e.g. 1.3) add more room between wrapped lines. */
	lineHeight: number;
	/** Extra space (mm) added between the tab's left edge and the title text, on
	 *  top of the built-in layout inset (which already grows to make room for the
	 *  icon when one is shown). 0 is the default inset; negative values pull the
	 *  text closer to the edge. */
	titleMarginLeft: number;
	/** Same as `titleMarginLeft`, but for the tab's right edge. */
	titleMarginRight: number;
	/** Extra space (mm) added above the title text, on screen and in the print
	 *  PDF. When `wordWrap` is on, this shifts the whole vertically-centered
	 *  block down (it doesn't shrink its centering space); when off, it shifts
	 *  the auto-fit single line down. 0 is the default position; negative
	 *  values pull the text up. */
	titleMarginTop: number;
};

export const customIndex2Settings: CustomIndex2Settings = {
	font: "CustomIndex2",
	background: "/tab-2.png",
	titleFontSize: 4,
	wordWrap: true,
	letterSpacing: 0.1,
	lineHeight: 0.8,
	titleMarginLeft: -0.2,
	titleMarginRight: -0.2,
	titleMarginTop: -0.2,
};
