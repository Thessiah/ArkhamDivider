import { Buffer } from "buffer";
import { cmyk } from "@/modules/core/color/shared/lib";
import type { PDFColor } from "../../model";
import { PDFOverprintService } from "./PDFOverprintService";

export type DrawImageOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	opacity?: number;
	/**
	 * How the image fills the box. Defaults to `contain` (PDFKit `fit`) so
	 * existing callers keep their previous aspect-preserving centered draw.
	 * Use `cover` only from layouts that intentionally crop (e.g. custom-index-2).
	 */
	fit?: "contain" | "cover";
	/** PDFKit: omit/`undefined` = left, then `center` | `right`. */
	align?: "left" | "center" | "right";
	/** PDFKit: omit/`undefined` = top, then `center` | `bottom`. */
	valign?: "top" | "center" | "bottom";
	/**
	 * Soft-fade one vertical edge (same coordinate units as `x`/`width`).
	 * Opt-in only — default draw is unchanged when omitted.
	 * `minOpacity` is the opacity at the faded edge (default 0 = fully transparent).
	 */
	fadeEdge?: {
		side: "left" | "right";
		width: number;
		minOpacity?: number;
	};
};

export type DrawSVGOptions = DrawImageOptions & {
	overprint?: boolean;
	color?: PDFColor;
};

export class PDFImageService {
	protected overprint: PDFOverprintService;
	constructor(public readonly doc: PDFKit.PDFDocument) {
		this.overprint = new PDFOverprintService(doc);
	}

	async drawSVG(svgString: string, options: DrawSVGOptions) {
		const { default: SVGtoPDF } = await import("svg-to-pdfkit");
		const black = cmyk(0, 0, 0, 100);
		const {
			width,
			height,
			opacity = 1,
			overprint: overprintEnabled,
			color = black,
		} = options;
		const { x, y } = options;

		if (overprintEnabled) {
			this.overprint.enable();
		}

		SVGtoPDF(this.doc, svgString, x, y, {
			width,
			height,
			preserveAspectRatio: "xMidYMid meet",
			colorCallback(srcColors) {
				const count = srcColors.length;
				const baseColor = [color, opacity];

				if (count === 2) {
					return baseColor;
				}

				const colors = srcColors.slice(0, count - 1).fill(baseColor);

				return [...colors, opacity];
			},
		});

		if (overprintEnabled) {
			this.overprint.disable();
		}
	}

	drawImage(arrayBuffer: ArrayBuffer, options: DrawImageOptions) {
		const {
			x,
			y,
			width,
			height,
			opacity = 1,
			fit = "contain",
			align = "center",
			valign = "center",
			fadeEdge,
		} = options;

		// Default `contain`/`fit` preserves aspect ratio without cropping.
		// Opt into `cover` + align/valign only when a caller asks for it.
		// PDFKit treats omitted align/valign as left/top; it has no "left"/"top" literals.
		const sizeKey = fit === "cover" ? "cover" : "fit";
		const imageOptions = {
			[sizeKey]: [width, height],
			...(align === "left" ? {} : { align }),
			...(valign === "top" ? {} : { valign }),
		};
		const buffer = Buffer.from(arrayBuffer);

		const paint = (clipX: number, clipW: number, paintOpacity: number) => {
			if (clipW <= 0 || paintOpacity <= 0) {
				return;
			}
			this.doc.save();
			this.doc.rect(clipX, y, clipW, height).clip();
			this.doc.opacity(opacity * paintOpacity);
			// Always place in the full box so cover/align stays identical per strip.
			this.doc.image(buffer, x, y, imageOptions);
			this.doc.restore();
		};

		const fadeW = fadeEdge ? Math.min(Math.max(fadeEdge.width, 0), width) : 0;
		if (!fadeEdge || fadeW <= 0) {
			this.doc.opacity(opacity);
			this.doc.image(buffer, x, y, imageOptions);
			this.doc.opacity(1);
			return;
		}

		const steps = 8;
		const stepW = fadeW / steps;
		const minOpacity = Math.min(Math.max(fadeEdge.minOpacity ?? 0, 0), 1);
		const opaqueX = fadeEdge.side === "left" ? x + fadeW : x;
		const opaqueW = width - fadeW;
		paint(opaqueX, opaqueW, 1);

		for (let i = 0; i < steps; i++) {
			const stripX =
				fadeEdge.side === "left"
					? x + i * stepW
					: x + width - fadeW + i * stepW;
			// 0 at the faded edge → 1 at the opaque side, then lerp into [minOpacity, 1].
			const t =
				fadeEdge.side === "left" ? (i + 0.5) / steps : 1 - (i + 0.5) / steps;
			const stripOpacity = minOpacity + (1 - minOpacity) * t;
			// Slight overlap avoids hairline gaps between clipped strips.
			paint(stripX, stepW + 0.05, stripOpacity);
		}
		this.doc.opacity(1);
	}
}
