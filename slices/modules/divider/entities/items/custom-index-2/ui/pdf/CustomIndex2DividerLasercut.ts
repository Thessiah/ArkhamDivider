import { LASERCUT_LINE_WIDTH } from "@/modules/pdf/shared/config";
import { PDFLasercutService } from "@/modules/pdf/shared/lib";
import { fromMm2Pt } from "@/modules/print/shared/lib";
import type { CustomIndex2DividerBackgroundPathOptions } from "../../lib";
import { getCustomIndex2DividerBackgroundPath } from "../../lib";

type PDFPathable = PDFKit.PDFDocument & {
	path: (d: string) => PDFKit.PDFDocument;
};

export type DrawCustomIndex2LasercutOptions = {
	/** Top-left of the divider in PDF units (pt), matches screen origin (0,0 of the layout). */
	x: number;
	y: number;
	/** Path geometry in the same **mm** space as the on-screen `layout.size` / SVG viewBox. */
	path: CustomIndex2DividerBackgroundPathOptions;
};

/**
 * Red lasercut stroke along {@link getCustomIndex2DividerBackgroundPath} (tab + rounded body or full-bleed card).
 * We render the SVG `d` string in a scaled millimeter user space (see {@link drawCustomIndex2DividerLasercut}).
 */
export class CustomIndex2DividerLasercut extends PDFLasercutService {
	drawCustomIndex2DividerLasercut(options: DrawCustomIndex2LasercutOptions) {
		if (!this.options.enabled) {
			return;
		}
		const mm = fromMm2Pt();
		const gap = this.gap / mm(1);
		const d = getCustomIndex2DividerBackgroundPath({
			...options.path,
			x: 0,
			y: 0,
			gap,
			tabWidthOffset: 2 * gap,
		});
		const s = mm(1);
		const doc = this.doc as PDFPathable;
		this.doc.save();
		this.doc.translate(options.x, options.y);
		this.doc.scale(s, s);
		doc.path(d);
		this.doc.lineWidth(LASERCUT_LINE_WIDTH / s).stroke(this.color);
		this.doc.restore();
	}
}
