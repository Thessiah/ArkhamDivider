import { createAction } from "@reduxjs/toolkit";
import type { GenerateDividersMode } from "@/modules/divider/shared/model";

type GenerateCustomIndex2DividersPayload = {
	mode: GenerateDividersMode;
};

export const generateCustomIndex2Dividers =
	createAction<GenerateCustomIndex2DividersPayload>(
		"divider/generateCustomIndex2Dividers",
	);
