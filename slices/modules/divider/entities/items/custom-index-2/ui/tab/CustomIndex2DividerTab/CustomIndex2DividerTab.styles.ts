import { percent } from "@/shared/util";
import {
	customIndex2IconTextEdgeFade,
	customIndex2Settings,
} from "../../../config";
import { getCustomIndex2DividerIconDrawBox } from "../../../lib/logic/getCustomIndex2DividerIconDrawBox";
import { getCustomIndex2DividerTabTitleObject as getTitleObject } from "../../../lib/logic/objects/getCustomIndex2DividerTabTitleObject";
import type { CustomIndex2DividerSxCallback } from "../../../model";

type Options = {
	iconLeft: number;
	iconPosition: "left" | "right";
	showIcon: boolean;
	tabWidth: number;
	tabLeft: number;
};

type SxCallback<T = void> = CustomIndex2DividerSxCallback<Options & T>;

export const getIconWrapperSx: SxCallback = (options) => {
	const glowInset = options.objects.icon.glowInset ?? 0;
	const isRight = options.iconPosition === "right";
	const fade = options.mm(customIndex2IconTextEdgeFade);
	// Visual-only widen toward the title; title insets still use the un-extended slot.
	const drawBox = getCustomIndex2DividerIconDrawBox({
		iconLeft: options.iconLeft,
		iconWidth: options.objects.icon.width,
		iconPosition: options.iconPosition,
	});
	// Fade the edge toward the title (left edge when icon is on the right, and vice versa).
	const maskImage = isRight
		? `linear-gradient(to right, transparent 0, #000 ${fade}, #000 100%)`
		: `linear-gradient(to left, transparent 0, #000 ${fade}, #000 100%)`;

	return {
		position: "absolute",
		// Stay under the red cut-path stroke so bleed past the tab corner is visible.
		zIndex: 1,
		left: options.mm(drawBox.left),
		top: options.mm(options.objects.icon.top),
		width: options.mm(drawBox.width),
		height: options.mm(options.objects.icon.height),
		paddingTop: options.mm(0),
		paddingBottom: options.mm(glowInset),
		paddingLeft: options.mm(isRight ? glowInset : 0),
		paddingRight: options.mm(isRight ? 0 : glowInset),
		boxSizing: "border-box",
		// Clips the oversized (`imageSize`) image below back down to this visible
		// slot — see `getIconImageSx`.
		overflow: "hidden",
		pointerEvents: "none",
		WebkitMaskImage: maskImage,
		maskImage,
	};
};

/**
 * Cover the slot and bias toward the tab's outer corner so square icons fill
 * the tab height and slightly bleed past the top-right (or top-left on the
 * alternate / right-edge tab).
 *
 * When `objects.icon.imageSize` is set (the horizontal bleed group), the
 * image itself is drawn at that larger, symmetric size — grown by the same
 * bleed amount on all 4 sides, so the artwork is honestly centered — flush
 * with the wrapper's top/outer edge. The extra growth on the bottom/inner
 * edges then gets clipped by the wrapper's `overflow: hidden`, leaving only
 * the top/outer corner's overhang visible.
 */
export const getIconImageSx: SxCallback = (options) => {
	const isRight = options.iconPosition === "right";
	const drawBox = getCustomIndex2DividerIconDrawBox({
		iconLeft: options.iconLeft,
		iconWidth: options.objects.icon.width,
		iconPosition: options.iconPosition,
	});
	const imageSize =
		options.objects.icon.imageSize ?? options.objects.icon.width;
	const left = isRight ? drawBox.width - imageSize : 0;

	return {
		position: "absolute",
		top: options.mm(0),
		left: options.mm(left),
		width: options.mm(imageSize),
		height: options.mm(imageSize),
		objectFit: "cover",
		objectPosition: isRight ? "top right" : "top left",
		display: "block",
	};
};

export const getTitleSx: SxCallback = (options) => {
	const { mm, tabWidth, tabLeft, objects } = options;
	const T = getTitleObject(options);
	const width = tabWidth - T.left - T.right;
	const left = tabLeft + T.left;
	// When wrapping is on, fill the tab so 1- and 2-line titles can center vertically.
	const top =
		(customIndex2Settings.wordWrap ? 0 : T.top) +
		customIndex2Settings.titleMarginTop;
	const height = customIndex2Settings.wordWrap ? objects.tab.height : T.height;

	return {
		position: "absolute",
		fontSize: mm(T.fontSize),
		top: mm(top),
		left: mm(left),
		width: mm(width),
		height: mm(height),
		display: "flex",
		alignItems: "center",
	};
};

export const getShiftSx: SxCallback<{
	position: "left" | "right";
}> = ({ mm, position }) => ({
	position: "absolute",
	zIndex: 4,
	top: mm(1),
	[position]: mm(-2),
	fontSize: mm(4),
	WebkitTextStroke: `${mm(0.1)} white`,
	color: "#ede3ce",
	cursor: "pointer",
	transform: position === "left" ? "rotate(180deg)" : "none",
});

export const getEnlargeSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.5),
	right: mm(-2.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	transform: "rotate(45deg)",
	cursor: "pointer",
});

export const getShrinkSx: SxCallback<{ isFull: boolean }> = ({
	mm,
	isFull,
}) => ({
	position: "absolute",
	zIndex: 4,
	top: isFull ? mm(9) : mm(5.5),
	left: isFull ? mm(8) : mm(-2.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	transform: "rotate(45deg)",
	cursor: "pointer",
});

export const getIncreaseIndentSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(1),
	right: mm(-0.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
});

export const getDecreaseIndentSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.5),
	left: mm(-8.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
});

export const getFullSizeSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	top: mm(3.5),
	right: mm(5.8),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});
