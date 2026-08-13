import { spawn } from "redux-saga/effects";
import { changeLayoutColorSaga } from "./changeLayoutColor/changeLayoutColorSaga";
import { changeLayoutOrientationSaga } from "./changeLayoutOrientation/changeLayoutOrientationSaga";
import { generateCustomIndex2DividersSaga } from "./generateCustomIndex2Dividers/generateCustomIndex2DividersSaga";
import { generateCustomIndexDividersSaga } from "./generateCustomIndexDividers/generateCustomIndexDividersSaga";
import { generateInvestigatorDividersSaga } from "./generateInvestigatorDividers/generateInvestigatorDividersSaga";
import { generatePlayerDividersSaga } from "./generatePlayerDividers/generatePlayerDividersSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield spawn(generateScenarioDividersSaga);
	yield spawn(generatePlayerDividersSaga);
	yield spawn(generateInvestigatorDividersSaga);
	yield spawn(generateCustomIndexDividersSaga);
	yield spawn(generateCustomIndex2DividersSaga);
	yield spawn(changeLayoutColorSaga);
	yield spawn(changeLayoutOrientationSaga);
}
