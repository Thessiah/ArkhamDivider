import type { Faction } from "@/modules/faction/shared/model";
import { percent } from "@/shared/util";
import { getArkhamIndexDividerTabTitleObject as getTitleObject } from "../../../lib/logic/objects/getArkhamIndexDividerTabTitleObject";
import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerSxCallback,
} from "../../../model";

type Options = {
	iconLeft: number;
	iconPosition: "left" | "right";
	showIcon: boolean;
	tabWidth: number;
	tabLeft: number;
};

type SxCallback<T = void> = ArkhamIndexDividerSxCallback<Options & T>;

const sideBackgroundScale = 1.1;
const sideTextOffset = {
	x: -0.15,
	y: -0.05,
};

export const getTabGlyphStrokeSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	textShadow: `0 0 ${mm(1)} black`,
	WebkitTextStroke: `${mm(0.3)} rgba(0, 0, 0, 0.5)`,
});

export const getTabImageStrokeSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	filter: `drop-shadow(0 0 ${mm(1)} black)`,
});

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
		cursor: "pointer",
		"@media screen": {
			":hover": {
				opacity: percent(70),
			},
		},
	};
};

export const getIconGlyphSx: SxCallback = (options) => {
	const centerOffset = options.objects.icon.height / 2;
	const isRight = options.iconPosition === "right";

	return {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: isRight ? undefined : options.mm(centerOffset),
		right: isRight ? options.mm(centerOffset) : undefined,
		transform: isRight ? "translateX(50%)" : "translateX(-50%)",
		fontSize: options.mm(options.objects.icon.fontSize),
		color: "white",
		zIndex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "max-content",
		lineHeight: 1,
	};
};

export const getIconGlyphStrokeSx: SxCallback = (options) => {
	const centerOffset = options.objects.icon.height / 2;
	const isRight = options.iconPosition === "right";

	return {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: isRight ? undefined : options.mm(centerOffset),
		right: isRight ? options.mm(centerOffset) : undefined,
		transform: isRight ? "translateX(50%)" : "translateX(-50%)",
		fontSize: options.mm(options.objects.icon.fontSize),
		color: "white",
		zIndex: 0,
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "max-content",
		lineHeight: 1,
		...getTabGlyphStrokeSx(options),
	};
};

export const getSideBackgroundSx: SxCallback = ({
	mm,
	iconLeft: left,
	objects: O,
	iconPosition,
}) => {
	const baseSize = O.sideBackground.width;
	const size = baseSize * sideBackgroundScale;
	const offset = {
		x:
			iconPosition === "right"
				? O.icon.width - O.sideBackground.left - size
				: O.sideBackground.left,
		y: O.sideBackground.top + O.sideBackground.height - size,
	};
	return {
		position: "absolute",
		width: mm(size),
		height: mm(size),
		top: mm(offset.y),
		left: mm(left + offset.x),
	};
};

export const getSideTextSx: SxCallback<
	Options & { sideObject: ArkhamIndexDividerLayoutObjects["sideText"] }
> = ({ mm, iconLeft: left, iconPosition, objects: O, sideObject: S }) => {
	const sideBackgroundGrowth =
		O.sideBackground.width * (sideBackgroundScale - 1);
	const sideBackgroundCenterOffset =
		iconPosition === "right"
			? -sideBackgroundGrowth / 2
			: sideBackgroundGrowth / 2;
	const sideTextLeft =
		iconPosition === "right" ? O.icon.width - S.left - S.width : S.left;
	return {
		position: "absolute",
		fontFamily: "Arkhamic, Teutonic, serif",
		fontSize: mm(S.fontSize),
		top: mm(S.top - sideBackgroundGrowth / 2 + sideTextOffset.y),
		left: mm(
			left + sideTextLeft + sideBackgroundCenterOffset + sideTextOffset.x,
		),
		width: mm(S.width),
		height: mm(S.height),
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		whiteSpace: "nowrap",
	};
};

export const getTitleSx: SxCallback<Options & { showSideText: boolean }> = (
	options,
) => {
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

export const getTabSx: SxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(4),
		fontSize: mm(3),
		color: "white",
	};
};

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

const factionPosition: Record<
	Faction,
	{ top: number; left: number; width: number; height: number }
> = {
	neutral: { top: 1.1, left: 1.3, width: 7.3, height: 7.5 },
	guardian: { top: 1.2, left: 1.3, width: 7.5, height: 7.5 },
	seeker: { top: 1.2, left: 1.3, width: 7.6, height: 7.5 },
	rogue: { top: 0.9, left: 1.2, width: 7.7, height: 7.5 },
	mystic: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
	survivor: { top: 1.6, left: 1.3, width: 7.45, height: 7.5 },
	multiclass: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
};

export const getFactionImageSx: SxCallback = (options) => {
	const { mm, iconLeft, iconPosition, faction, objects: O } = options;
	const F = factionPosition[faction];
	const factionLeft =
		iconPosition === "right" ? O.icon.width - F.left - F.width : F.left;
	return {
		position: "absolute",
		top: mm(F.top),
		left: mm(iconLeft + factionLeft),
		height: mm(F.height),
		width: mm(F.width),
		zIndex: 4,
		cursor: "pointer",
		objectFit: "contain",
		...getTabImageStrokeSx(options),
		"@media screen": {
			":hover": {
				opacity: percent(30),
			},
		},
	};
};

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
