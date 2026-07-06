import { put, select, takeEvery } from "redux-saga/effects";
import {
	addManyDividers,
	createPhantomDividers,
	getTabResetPadding,
	selectDividersTotal,
	setDividers,
} from "@/modules/divider/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { selectLayout } from "../../selectors";
import { generateInvestigatorDividers } from "./generateInvestigatorDividers";
import { getInvestigatorDividers } from "./lib";

function* worker({ payload }: ReturnType<typeof generateInvestigatorDividers>) {
	const { mode } = payload;

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		return;
	}

	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	const selectedStories = stories.filter(
		(story) =>
			payload.storyCodes.includes(story.code) && story.supported === true,
	);

	const newDividers = getInvestigatorDividers({
		stories: selectedStories,
		layout,
	});

	if (mode === "create") {
		yield put(setDividers(newDividers));
	} else if (mode === "add") {
		const existingCount: ReturnType<typeof selectDividersTotal> =
			yield select(selectDividersTotal);
		const tabsCount = layout.tabs?.type === "fixed" ? layout.tabs.value : 2;
		const phantomCount = getTabResetPadding(existingCount, tabsCount);
		const phantoms = createPhantomDividers(phantomCount);
		yield put(addManyDividers([...phantoms, ...newDividers]));
	}
}

export function* generateInvestigatorDividersSaga() {
	yield takeEvery(generateInvestigatorDividers.match, worker);
}
