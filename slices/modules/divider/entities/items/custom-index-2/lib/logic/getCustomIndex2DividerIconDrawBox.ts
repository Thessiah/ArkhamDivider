import { customIndex2IconTextEdgeFade } from "../../config";

type Options = {
	iconLeft: number;
	iconWidth: number;
	iconPosition: "left" | "right";
	/** Fade length in mm; draw box extends toward the title by half of this. */
	fadeLength?: number;
};

/**
 * Visual icon box used for rendering only. Extends toward the title by half the
 * fade length so the soft edge overlaps the title gap — does not affect title
 * layout insets (those still use the un-extended icon slot).
 */
export const getCustomIndex2DividerIconDrawBox = ({
	iconLeft,
	iconWidth,
	iconPosition,
	fadeLength = customIndex2IconTextEdgeFade,
}: Options) => {
	const extend = fadeLength / 2;
	if (iconPosition === "right") {
		return {
			left: iconLeft - extend,
			width: iconWidth + extend,
		};
	}
	return {
		left: iconLeft,
		width: iconWidth + extend,
	};
};
