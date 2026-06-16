import { createAction } from "@reduxjs/toolkit";
import type { DPI } from "@/modules/print/shared/model";

export type PDFDownloadMode = "default" | "cutPath" | "pdfAndCut";

type DownloadDividersAsPDFPayload = {
	dpi?: DPI;
	mode?: PDFDownloadMode;
};

export const downloadDividersAsPDF = createAction<DownloadDividersAsPDFPayload>(
	`render/downloadDividersAsPDF`,
);
