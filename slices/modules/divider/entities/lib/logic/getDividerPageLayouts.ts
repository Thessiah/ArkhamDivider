import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { getPageLayouts } from "@/modules/print/shared/lib";
import type { PageLayoutGrid } from "@/modules/print/shared/model";

type Options<T extends DividerWithRelations> = {
	dividers: T[];
	layoutGrid: PageLayoutGrid;
	doubleSided?: boolean;
	singleItemPerPage?: boolean;
	maxItemsPerPage?: number;
};
export const getDividerPageLayouts = <T extends DividerWithRelations>({
	dividers,
	doubleSided,
	singleItemPerPage,
	layoutGrid,
	maxItemsPerPage,
}: Options<T>) => {
	const data = dividers.map((d): T | undefined => (d.phantom ? undefined : d));
	const pageLayouts = getPageLayouts({
		data,
		layoutGrid,
		singleItemPerPage,
		doubleSided,
		maxItemsPerPage,
	});

	return pageLayouts;
};
