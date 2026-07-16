import type { PrintSxCallback } from "@/modules/print/shared/model";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerSxCallback,
} from "../../model";

export const getBackgroundSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
});

export const getBackgroundStrokeSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
	pointerEvents: "none",
});

export const getBodySx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.tab.height),
	left: 0,
	right: 0,
	bottom: 0,
});

export const getMediaContentSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
});

export const getColorPickerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	bottom: mm(13),
	left: mm(2.5),
	width: mm(4),
	height: mm(4),
	outline: `${mm(0.2)} solid rgba(255, 255, 255, 0.5)`,
	borderRadius: "50%",
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 5,
	top: `calc(50% - ${mm(3)})`,
	transform: "translateY(-50%)",
	left: mm(2.5),
	color: "#ffffff",
	filter: "drop-shadow(2px 2px 5px #000)",
});

export const getInfoSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	fontSize: mm(3),
	bottom: mm(1.5),
	right: mm(1.5),
	gap: mm(0.5),
	alignItems: "center",
	color: "white",
	cursor: "pointer",
});

export const getDividerCardsSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 6,
	backgroundColor: "#ffffffb0",
	boxShadow: `inset 0 0 ${mm(2)} rgba(0, 0, 0, 0.5), 0 0 ${mm(1)} rgba(255, 255, 255, 0.2)`,
	left: mm(15),
	top: mm(20.5),
	bottom: mm(11),
	right: mm(1.5),
});

/**
 * Clips the BleedView to the card's L-shaped cut path (+ bleed) for layouts
 * where the tab covers half the card height. Without this, the rectangular
 * corner opposite the tab prints background that is outside the cut path
 * and discarded after cutting.
 *
 * BleedView coordinate geometry (bleed = b):
 *   - BV origin (0,0) is b mm above/left of the card top-left corner.
 *   - Step bleed line: BV y = creasingTop  (the +b card→BV and -b bleed cancel)
 *   - Tab right bleed (tab on left): BV x = tabWidth + 2b
 *   - Tab left bleed  (tab on right): BV x = cardWidth − tabWidth
 */
export const getBleedViewClipSx: ArkhamIndexDividerSxCallback<{
	layout: ArkhamIndexDividerLayout;
}> = ({ mm, objects: O, tabIndex, tabSize, layout }) => {
	if (layout.id !== "arkham-index-lower-body" || tabSize === "full") {
		return {};
	}

	const { bleed } = layout;
	const { width: cW, height: cH } = layout.size;
	const creasingTop = layout.creasingTop ?? O.tab.height;
	const tabWidth =
		typeof tabSize === "number" ? (O.tab.width[tabSize] ?? cW) : cW;

	const step = mm(creasingTop);
	const bw = mm(cW + 2 * bleed);
	const bh = mm(cH + 2 * bleed);

	const clipPath =
		tabIndex === 0
			? `polygon(0 0, ${mm(tabWidth + 2 * bleed)} 0, ${mm(tabWidth + 2 * bleed)} ${step}, ${bw} ${step}, ${bw} ${bh}, 0 ${bh})`
			: `polygon(${mm(cW - tabWidth)} 0, ${bw} 0, ${bw} ${bh}, 0 ${bh}, 0 ${step}, ${mm(cW - tabWidth)} ${step})`;

	return { clipPath };
};
