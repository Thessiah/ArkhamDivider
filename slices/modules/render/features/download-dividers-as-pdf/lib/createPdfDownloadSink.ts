import {
	createStreamingDownloadSink,
	type StreamingDownloadSink,
} from "@/modules/render/shared/lib/logic/createStreamingDownloadSink";

export type PdfChunkSink = StreamingDownloadSink;

type CreatePdfDownloadSinkOptions = {
	suggestedName?: string;
};

export function createPdfDownloadSink(
	options: CreatePdfDownloadSinkOptions = {},
): Promise<PdfChunkSink> {
	return createStreamingDownloadSink({
		suggestedName: options.suggestedName ?? "Arkham Divider.pdf",
		mimeType: "application/pdf",
		types: [
			{
				description: "PDF",
				accept: { "application/pdf": [".pdf"] },
			},
		],
	});
}
