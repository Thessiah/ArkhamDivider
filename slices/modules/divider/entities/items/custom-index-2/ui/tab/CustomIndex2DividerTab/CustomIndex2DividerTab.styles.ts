import { percent } from "@/shared/util";
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

	return {
		position: "absolute",
		zIndex: 5,
		left: options.mm(options.iconLeft),
		top: options.mm(options.objects.icon.top),
		width: options.mm(options.objects.icon.width),
		height: options.mm(options.objects.icon.height),
		paddingTop: options.mm(0),
		paddingBottom: options.mm(glowInset),
		paddingLeft: options.mm(isRight ? glowInset : 0),
		paddingRight: options.mm(isRight ? 0 : glowInset),
		boxSizing: "border-box",
	};
};

export const getTitleSx: SxCallback = (options) => {
	const { mm, tabWidth, tabLeft } = options;
	const T = getTitleObject(options);
	const width = tabWidth - T.right;
	const left = tabLeft + T.left;

	return {
		position: "absolute",
		fontSize: mm(T.fontSize),
		top: mm(T.top),
		left: mm(left),
		width: mm(width),
		height: mm(T.height),
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
