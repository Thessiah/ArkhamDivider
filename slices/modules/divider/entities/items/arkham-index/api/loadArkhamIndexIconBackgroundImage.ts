import { getVips } from "@/modules/render/shared/lib";
import { arkhamIndexDividerBaseUrl } from "../config";

let iconBackgroundPng: ArrayBuffer | null = null;

export const loadArkhamIndexIconBackgroundImage = async () => {
	if (iconBackgroundPng) {
		return iconBackgroundPng;
	}

	const response = await fetch(
		`${arkhamIndexDividerBaseUrl}/icon-background.avif`,
	);
	const avifBuffer = await response.arrayBuffer();

	const vips = await getVips();
	const image = vips.Image.newFromBuffer(avifBuffer);
	const pngBuffer = image.writeToBuffer(".png");
	image.delete();

	iconBackgroundPng = pngBuffer.buffer.slice(
		pngBuffer.byteOffset,
		pngBuffer.byteOffset + pngBuffer.byteLength,
	) as ArrayBuffer;

	return iconBackgroundPng;
};
