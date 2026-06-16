import Stack from "@mui/material/Stack";
import { pick, range } from "ramda";
import { usePrintUnitByRect } from "@/modules/print/shared/lib";
import type { PageFormat, PageLayout } from "@/modules/print/shared/model";
import { Page } from "@/modules/print/shared/ui";
import type { BoxPosition, BoxSize, WithId } from "@/shared/model";
import { Row } from "@/shared/ui";
import { getRelativeBoxSize } from "@/shared/util";

type PrintablePageProps<Props extends WithId> = {
	pageLayout: PageLayout<Props>;
	pageFormat: PageFormat;
	showSide?: boolean;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
	enablePageCounter?: boolean;
	bleed: number;
	bleedEnabled: boolean;
	pageSize: BoxSize;
	Component: React.ComponentType<Props>;
	pageMargin: BoxPosition;
};

export function PrintablePage<T extends WithId>({
	pageLayout,
	Component,
	showSide = false,
	singleItemPerPage = false,
	cropmarksEnabled,
	enablePageCounter = true,
	pageSize,
	pageMargin,
}: PrintablePageProps<T>) {
	const { items, grid } = pageLayout;

	const { width } = pageSize;
	const { ref, mm, mmSize } = usePrintUnitByRect({ width });

	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const containerSize = getRelativeBoxSize(pageSize, grid.size);

	const unitAspectRatio = grid.unitSize.width / grid.unitSize.height;

	const aspectRatio = grid.size.width / grid.size.height;
	const pageOptions = pick(["side", "number", "total"], pageLayout);

	const contentSx = {
		aspectRatio,
		width: `${containerSize.width}%`,
		"@media print": {
			width: `${grid.size.width}mm`,
		},
	};

	const justifyContent = pageLayout.isLast ? "flex-start" : "center";

	const hideCounter =
		(singleItemPerPage && !cropmarksEnabled) || !enablePageCounter;

	return (
		<Page
			{...pageOptions}
			{...pageSize}
			hideCounter={hideCounter}
			mmSize={mmSize}
			ref={ref}
			showSide={showSide}
			justifyContent={justifyContent}
			paddingTop={mm(pageMargin.top)}
			paddingBottom={mm(pageMargin.bottom)}
			paddingLeft={mm(pageMargin.left)}
			paddingRight={mm(pageMargin.right)}
		>
			<Stack sx={contentSx}>
				{rows.map((rowIndex) => (
					<Row key={rowIndex}>
						{cols.map((colIndex) => {
							const row = items[rowIndex];
							const item = row?.items[colIndex];

							return (
								<Row
									key={colIndex}
									sx={{
										aspectRatio: unitAspectRatio,
										width: "100%",
									}}
								>
									{item && <Component {...item} />}
								</Row>
							);
						})}
					</Row>
				))}
			</Stack>
		</Page>
	);
}
