import { createSelector } from "@reduxjs/toolkit";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectDoubleSidePrintEnabled,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { getDividerPageLayouts } from "../../logic";
import { selectLayout } from "./selectLayout";

export const selectDividerPageLayouts = createSelector(
	[
		selectDividersWithRelations,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectPageLayoutGrid,
		selectLayout,
	],
	(dividers, doubleSided, singleItemPerPage, layoutGrid, layout) => {
		if (!layoutGrid || !dividers) {
			return [];
		}
		return getDividerPageLayouts({
			dividers,
			doubleSided,
			singleItemPerPage,
			layoutGrid,
			maxItemsPerPage: layout?.maxItemsPerPage,
		});
	},
);
