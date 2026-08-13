import { put, select, takeEvery } from "redux-saga/effects";
import { customIndexItems } from "@/modules/divider/entities/items/custom-index/config";
import { toDivider } from "@/modules/divider/entities/items/custom-index/lib";
import {
	addManyDividers,
	createPhantomDividers,
	getTabResetPadding,
	selectDividersTotal,
	setDividers,
} from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { selectLayout } from "../../selectors";
import { generateCustomIndexDividers } from "./generateCustomIndexDividers";

function* worker({ payload }: ReturnType<typeof generateCustomIndexDividers>) {
	const { mode } = payload;
	// The store's entity adapter is typed for the shared `Divider` (params: void);
	// every category's richer params shape is cast the same way `setDividerParam` does.
	const newDividers = customIndexItems.map(toDivider) as unknown as Divider[];

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

export function* generateCustomIndexDividersSaga() {
	yield takeEvery(generateCustomIndexDividers.match, worker);
}
