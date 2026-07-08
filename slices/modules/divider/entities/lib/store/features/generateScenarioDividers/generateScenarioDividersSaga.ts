import { put, select, takeEvery } from "redux-saga/effects";
import {
	addManyDividers,
	createPhantomDividers,
	getTabResetPadding,
	selectDividersTotal,
	setDividers,
} from "@/modules/divider/shared/lib";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { selectLayout } from "../../selectors";
import { generateScenarioDividers } from "./generateScenarioDividers";
import {
	getCampaignDividers,
	getEncounterSetDividers,
	getScenarioDividers,
} from "./lib";

function* worker({ payload }: ReturnType<typeof generateScenarioDividers>) {
	const story: ReturnType<typeof selectStoryWithRelations> = yield select(
		selectStoryWithRelations,
	);

	if (!story) {
		return;
	}

	const campaignDividers = payload.campaignDivider
		? getCampaignDividers({
				story,
				includeReturnStory: payload.returnSet,
			})
		: [];

	const scenarioDividers = payload.scenarioDividers
		? getScenarioDividers({
				story,
				exceptEncounterCards: payload.scenarioEncounterDividers,
				includeReturnStory: payload.returnSet,
			})
		: [];

	const encounterSetDividers =
		payload.encounterDividers || payload.scenarioEncounterDividers
			? getEncounterSetDividers({
					story,
					includeEncounterSets: payload.encounterDividers,
					includeReturnStory: payload.returnSet,
					includeScenarioEncounterSets: payload.scenarioEncounterDividers,
					includeExtraEncounterSets: payload.extraEncounterSets,
				})
			: [];

	const newDividers = [
		...scenarioDividers,
		...encounterSetDividers,
		...campaignDividers,
	];

	if (payload.mode === "add") {
		const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
		const existingCount: ReturnType<typeof selectDividersTotal> =
			yield select(selectDividersTotal);
		const tabsCount = layout?.tabs?.type === "fixed" ? layout.tabs.value : 2;
		const phantomCount = layout?.tabs
			? getTabResetPadding(existingCount, tabsCount)
			: 0;
		const phantoms = createPhantomDividers(phantomCount);
		yield put(addManyDividers([...phantoms, ...newDividers]));
	} else {
		yield put(setDividers(newDividers));
	}
}

export function* generateScenarioDividersSaga() {
	yield takeEvery(generateScenarioDividers.match, worker);
}
