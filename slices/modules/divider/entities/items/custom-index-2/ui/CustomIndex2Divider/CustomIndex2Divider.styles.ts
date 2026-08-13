import type { PrintSxCallback } from "@/modules/print/shared/model";
import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerSxCallback,
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
	// Above tab icons so corner bleed reads against the cut path in the web UI.
	zIndex: 6,
});

export const getBodySx: CustomIndex2DividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.tab.height),
	left: 0,
	right: 0,
	bottom: 0,
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

/**
 * Clips the BleedView to the card's L-shaped cut path (+ bleed) for layouts
 * where the tab covers half the card height. Without this, the rectangular
 * corner opposite the tab prints background that is outside the cut path
 * and discarded after cutting.
 */
export const getBleedViewClipSx: CustomIndex2DividerSxCallback<{
	layout: CustomIndex2DividerLayout;
}> = ({ mm, objects: O, tabIndex, tabSize, layout }) => {
	if (layout.id !== "custom-index-2-lower-body" || tabSize === "full") {
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
