import { put, select, takeEvery } from "redux-saga/effects";
import {
	addManyDividers,
	createPhantomDividers,
	getTabResetPadding,
	selectDividersTotal,
	setDividers,
} from "@/modules/divider/shared/lib";
import { selectStoryCode } from "@/modules/story/shared/lib";
import { selectLayout } from "../../selectors";
import { generatePlayerDividers } from "./generatePlayerDividers";
import { getPlayerDividers } from "./lib";

function* worker({ payload }: ReturnType<typeof generatePlayerDividers>) {
	const storyCode: ReturnType<typeof selectStoryCode> =
		yield select(selectStoryCode);
	const { mode } = payload;
	const newDividers = getPlayerDividers({
		...payload,
		storyCode,
	});

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

export function* generatePlayerDividersSaga() {
	yield takeEvery(generatePlayerDividers.match, worker);
}
