import type { BoxPosition } from "@/shared/model";
import type { DPI, PageFormat, PageLayout } from "../../../model";
import { fromDPI } from "../../util";
import { getMinPageMarginTop } from "../getMinPageMarginTop";
import { getLayoutSizePx } from "./getLayoutSizePx";
import { getPageSize } from "./getPageSize";
import { getUnitSizePx } from "./getUnitSizePx";

type Options<T> = {
	pageLayout: PageLayout<T>;
	pageFormat: PageFormat;
	dpi: DPI;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
	pageMargin: BoxPosition;
};

export const getPageLayoutOffsetPx = <T>(options: Options<T>) => {
	const {
		dpi,
		pageLayout,
		pageFormat,
		singleItemPerPage,
		cropmarksEnabled,
		pageMargin,
	} = options;

	if (singleItemPerPage && !cropmarksEnabled) {
		return { x: pageMargin.left, y: pageMargin.top };
	}
	const unitSize = getUnitSizePx({
		unitSize: pageLayout.grid.unitSize,
		dpi,
	});

	const pageSize = getPageSize({
		units: "px",
		dpi,
		pageFormat,
		unitSize,
		singleItemPerPage,
		cropmarksEnabled,
	});

	const layoutSize = getLayoutSizePx({ pageLayout, dpi });

	const freeX = pageSize.width - layoutSize.width;
	const isLandscape = pageFormat.size.mm.width > pageFormat.size.mm.height;
	const x = pageMargin.left + freeX * (isLandscape ? 1 / 3 : 1 / 2);

	if (!pageLayout.isLast) {
		const y = pageMargin.top + (pageSize.height - layoutSize.height) / 2;

		return { x, y };
	}
	const mm = fromDPI(dpi);

	const minMarginTop = getMinPageMarginTop({
		pageSize,
		areaSize: layoutSize,
		isLast: pageLayout.isLast,
	});

	const bottomMargin = Math.max(minMarginTop, pageMargin.top) * 2;
	const y = pageSize.height - layoutSize.height - mm(bottomMargin);

	return { x, y };
};
