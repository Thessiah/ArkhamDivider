import { createAction } from "@reduxjs/toolkit";
import type { GenerateDividersMode } from "@/modules/divider/shared/model";

type GenerateCustomIndexDividersPayload = {
	mode: GenerateDividersMode;
};

export const generateCustomIndexDividers =
	createAction<GenerateCustomIndexDividersPayload>(
		"divider/generateCustomIndexDividers",
	);
