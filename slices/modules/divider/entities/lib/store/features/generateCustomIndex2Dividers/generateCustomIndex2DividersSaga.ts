import { put, select, takeEvery } from "redux-saga/effects";
import { customIndex2Items } from "@/modules/divider/entities/items/custom-index-2/config";
import { toDivider } from "@/modules/divider/entities/items/custom-index-2/lib";
import {
	addManyDividers,
	createPhantomDividers,
	getTabResetPadding,
	selectDividersTotal,
	setDividers,
} from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { selectLayout } from "../../selectors";
import { generateCustomIndex2Dividers } from "./generateCustomIndex2Dividers";

function* worker({ payload }: ReturnType<typeof generateCustomIndex2Dividers>) {
	const { mode } = payload;
	// The store's entity adapter is typed for the shared `Divider` (params: void);
	// every category's richer params shape is cast the same way `setDividerParam` does.
	const newDividers = customIndex2Items.map(toDivider) as unknown as Divider[];

	if (mode === "create") {
		yield put(setDividers(newDividers));
	} else if (mode === "add") {
		const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
		const existingCount: ReturnType<typeof selectDividersTotal> =
			yield select(selectDividersTotal);
		const tabsCount = layout?.tabs?.type === "fixed" ? layout.tabs.value : 2;
		const phantomCount = layout?.tabs
			? getTabResetPadding(existingCount, tabsCount)
			: 0;
		const phantoms = createPhantomDividers(phantomCount);
		yield put(addManyDividers([...phantoms, ...newDividers]));
	}
}

export function* generateCustomIndex2DividersSaga() {
	yield takeEvery(generateCustomIndex2Dividers.match, worker);
}
