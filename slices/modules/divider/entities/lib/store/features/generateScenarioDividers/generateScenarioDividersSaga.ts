import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { EMPTY_ICON } from "@/modules/core/icon/shared/config";
import { addManyDividers, selectDividers } from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { selectLayout } from "../../selectors";
import { generateScenarioDividers } from "./generateScenarioDividers";
import {
	getCampaignDividers,
	getEncounterSetDividers,
	getScenarioDividers,
} from "./lib";

const getLayoutTabsCount = (layout: ReturnType<typeof selectLayout>) => {
	const tabs = layout?.tabs;
	if (!tabs) {
		return 2;
	}
	if (tabs.type === "fixed") {
		return tabs.value;
	}
	return tabs.initial;
};

// An empty, content-less divider used to occupy a single tab slot. The tab
// index is otherwise derived from each divider's global position, so a blank
// spacer lets us "skip" a slot without breaking the continuous tab pattern
// (which keeps the cut layout identical across sheets).
const createTabSpacerDivider = (storyCode: string): Divider =>
	({
		id: v4(),
		type: "scenario",
		layoutType: "scenario",
		side: "front",
		title: "",
		icon: EMPTY_ICON,
		storyCode,
		cards: [],
		cardsCount: 0,
		params: {
			spacer: true,
		},
	}) as unknown as Divider;

function* worker({ payload }: ReturnType<typeof generateScenarioDividers>) {
	const story: ReturnType<typeof selectStoryWithRelations> = yield select(
		selectStoryWithRelations,
	);

	if (!story) {
		return;
	}

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

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

	const dividers = [
		...scenarioDividers,
		...encounterSetDividers,
		...campaignDividers,
	];

	if (dividers.length === 0) {
		return;
	}

	// Always append. The tab index is a function of each divider's global
	// position in the sheet (position % tabsCount), so the pattern stays
	// continuous and the cut layout can be reused across sheets. To make a newly
	// appended set start on the first tab, pad the existing dividers with blank
	// spacers up to the next full row instead of resetting the index (which would
	// shift the rest of the pattern).
	const existing: ReturnType<typeof selectDividers> =
		yield select(selectDividers);
	const tabsCount = getLayoutTabsCount(layout);
	const remainder = existing.length % tabsCount;
	const skipCount = remainder === 0 ? 0 : tabsCount - remainder;
	const spacers = Array.from({ length: skipCount }, () =>
		createTabSpacerDivider(story.code),
	);

	yield put(addManyDividers([...spacers, ...dividers]));
}

export function* generateScenarioDividersSaga() {
	yield takeEvery(generateScenarioDividers.match, worker);
}
