import { path as d3Path } from "d3-path";
import { SVGPath } from "@/entities/common/lib";
import type { CustomIndex2DividerTabSize } from "../../model";

const path = () => SVGPath.of(d3Path());

export type CustomIndex2DividerBackgroundPathOptions = {
	width: number;
	height: number;
	cornerRadius: number;
	cornerRadiusEnabled: boolean;
	tabHeight: number;
	tabSideWidth: number;
	tabWidths: Record<number, number>;
	tabSize: CustomIndex2DividerTabSize;
	tabIndex: number;
	tabsCount: number;
	x?: number;
	y?: number;
	gap?: number;
	tabWidthOffset?: number;
};

type Options = CustomIndex2DividerBackgroundPathOptions;

type TabbedOptions = Options & { tabSize: number };

const getRoundedPath = ({
	width: w,
	height: h,
	cornerRadius: r,
	cornerRadiusEnabled: cRE,
	x = 0,
	y = 0,
	gap = 0,
}: Options) => {
	const ox = x - gap;
	const oy = y - gap;
	if (!cRE) {
		return path().rect(ox, oy, w, h).closePath().toString();
	}
	return path()
		.moveTo(ox + r, oy)
		.lineTo(ox + w - r, oy)
		.arcTo(ox + w, oy, ox + w, oy + r, r)
		.lineTo(ox + w, oy + h - r)
		.arcTo(ox + w, oy + h, ox + w - r, oy + h, r)
		.lineTo(ox + r, oy + h)
		.arcTo(ox, oy + h, ox, oy + h - r, r)
		.lineTo(ox, oy + r)
		.arcTo(ox, oy, ox + r, oy, r)
		.closePath()
		.toString();
};

const getTabContentWidth = (options: {
	tabWidths: Record<number, number>;
	tabSize: CustomIndex2DividerTabSize;
	tabSideWidth: number;
	width: number;
	tabWidthOffset?: number;
}) => {
	const { tabSideWidth } = options;
	return getCustomIndex2DividerTabWidth(options) - 2 * tabSideWidth;
};

export const getCustomIndex2DividerTabWidth = ({
	tabWidths,
	tabSize,
	width,
	tabWidthOffset = 0,
}: {
	tabWidths: Record<number, number>;
	tabSize: CustomIndex2DividerTabSize;
	width: number;
	tabWidthOffset?: number;
}) => {
	if (tabSize === "full") {
		return width;
	}
	return tabWidths[tabSize] + tabWidthOffset;
};

export const getCustomIndex2DividerTabLeft = ({
	tabSize,
	tabIndex,
	tabsCount,
	width,
	tabWidths,
	tabWidthOffset,
}: {
	tabSize: CustomIndex2DividerTabSize;
	tabIndex: number;
	tabsCount: number;
	width: number;
	tabWidths: Record<number, number>;
	cornerRadius: number;
	tabWidthOffset?: number;
}) => {
	if (tabIndex === 0 || tabSize === 3 || tabSize === "full") {
		return 0;
	}

	const physicalLastTabIndex = 3 - tabSize;
	const isLastTab = tabIndex >= Math.min(tabsCount - 1, physicalLastTabIndex);
	const tabWidth = getCustomIndex2DividerTabWidth({
		tabWidths,
		tabSize,
		width,
		tabWidthOffset,
	});

	if (tabSize === 2 || isLastTab) {
		return width - tabWidth;
	}

	return (width - tabWidth) / 2;
};

const getTabbedPath = (options: TabbedOptions) => {
	const {
		width: w,
		height: h,
		tabHeight: tH,
		tabSideWidth,
		cornerRadius: r,
		cornerRadiusEnabled: cRE,
		x = 0,
		y = 0,
		gap = 0,
	} = options;
	const ox = x - gap;
	const oy = y - gap;

	const tabContentWidth = getTabContentWidth(options);

	const tabLeft = getCustomIndex2DividerTabLeft(options);
	const tabRight = tabLeft + tabSideWidth * 2 + tabContentWidth;
	const innerLeft = tabLeft + tabSideWidth;
	const innerRight = innerLeft + tabContentWidth;

	const p = path().moveTo(ox + tabLeft, oy + tH);

	if (tabSideWidth === 0) {
		const tabCornerRadius = Math.min(r, tH, tabContentWidth / 2);
		p.lineTo(ox + tabLeft, oy + tabCornerRadius)
			.arcTo(
				ox + tabLeft,
				oy,
				ox + tabLeft + tabCornerRadius,
				oy,
				tabCornerRadius,
			)
			.lineTo(ox + tabRight - tabCornerRadius, oy)
			.arcTo(
				ox + tabRight,
				oy,
				ox + tabRight,
				oy + tabCornerRadius,
				tabCornerRadius,
			)
			.lineTo(ox + tabRight, oy + tH);
	} else {
		// These two values control the “hill” shape on both sides of the tab.
		// Longer horizontal handles make the steeper tab sides ease into the top/body.
		const tabCurviness = {
			/** X offset of the control point on the bottom edge (y = tH) */
			bottom: tabSideWidth * 0.7,
			/** X offset of the control point on the top edge (y = 0) */
			top: tabSideWidth * 0.3,
		};

		p.bezierCurveTo(
			ox + tabLeft + tabCurviness.bottom,
			oy + tH,
			ox + tabLeft + tabCurviness.top,
			oy,
			ox + innerLeft,
			oy,
		)
			// tab top border
			.lineTo(ox + innerRight, oy)
			.bezierCurveTo(
				ox + innerRight + (tabSideWidth - tabCurviness.top),
				oy,
				ox + innerRight + (tabSideWidth - tabCurviness.bottom),
				oy + tH,
				ox + tabRight,
				oy + tH,
			);
	}

	// If corner radius is disabled, keep the tab “hills” but draw the body corners as sharp 90° angles.
	if (!cRE) {
		return p
			.lineTo(ox + w, oy + tH)
			.lineTo(ox + w, oy + h)
			.lineTo(ox, oy + h)
			.lineTo(ox, oy + tH)
			.closePath()
			.toString();
	}

	if (tabRight >= w) {
		p.lineTo(ox + w, oy + tH + r);
	} else {
		p.lineTo(ox + w - r, oy + tH).arcTo(
			ox + w,
			oy + tH,
			ox + w,
			oy + tH + r,
			r,
		);
	}

	p.lineTo(ox + w, oy + h - r)
		.arcTo(ox + w, oy + h, ox + w - r, oy + h, r)
		.lineTo(ox + r, oy + h)
		.arcTo(ox, oy + h, ox, oy + h - r, r);

	if (tabLeft <= 0) {
		p.lineTo(ox, oy + tH);
	} else {
		p.lineTo(ox, oy + tH + r).arcTo(ox, oy + tH, ox + r, oy + tH, r);
	}

	return p.closePath().toString();
};

/**
 * Path for a stroke-only border: top tab with symmetric hills, bottom body with rounded lower corners; or full rounded rect when `tabSize === "full"`.
 * Coordinates in px; build inputs with `getPrintUnit` / `usePrintUnitCallback`.
 */
export const getCustomIndex2DividerBackgroundPath = (
	options: Options,
): string => {
	const x = options.x ?? 0;
	const y = options.y ?? 0;
	const gap = options.gap ?? 0;
	const adjusted: Options = {
		...options,
		x,
		y,
		gap,
		width: options.width + 2 * gap,
		height: options.height + 2 * gap,
	};

	if (adjusted.tabSize === "full") {
		return getRoundedPath(adjusted);
	}

	return getTabbedPath(adjusted as TabbedOptions);
};
