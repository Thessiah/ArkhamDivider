import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { customIndexItems } from "@/modules/divider/entities/items/custom-index/config";
import { generateCustomIndexDividers } from "@/modules/divider/entities/lib/store/features/generateCustomIndexDividers";
import { deleteAllDividers } from "@/modules/divider/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { formButtonSx } from "../../../DividerLayoutOptions/DividerLayoutOptions.styles";

export function CustomIndexDividerOptions(props: BoxProps) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const generate = useCallback(
		(mode: "create" | "add") => () => {
			dispatch(generateCustomIndexDividers({ mode }));
		},
		[dispatch],
	);

	const clear = useCallback(() => {
		dispatch(deleteAllDividers());
	}, [dispatch]);

	return (
		<Box {...props}>
			<Stack gap={2}>
				<Typography variant="body2" color="text.secondary" textAlign="center">
					{customIndexItems.length} item(s) configured in
					slices/modules/divider/entities/items/custom-index/config/items.ts
				</Typography>
				<Row
					flex={{ xs: 1, sm: 0 }}
					flexWrap={{ xs: "wrap", sm: "nowrap" }}
					gap={2}
					justifyContent="center"
				>
					<Button
						variant="contained"
						sx={formButtonSx}
						onClick={clear}
						color="error"
					>
						<Row gap={0.5} alignItems="center">
							<Icon icon="trash" />
							<span> {t("Clear")}</span>
						</Row>
					</Button>
					<Button
						variant="contained"
						sx={formButtonSx}
						onClick={generate("create")}
					>
						<Row gap={0.5} alignItems="center">
							<Icon icon="check" />
							<span> {t("Generate")}</span>
						</Row>
					</Button>
					<Button
						variant="contained"
						sx={formButtonSx}
						onClick={generate("add")}
					>
						<Row gap={0.5} alignItems="center">
							<Icon icon="plus" />
							<span> {t("Add")}</span>
						</Row>
					</Button>
				</Row>
			</Stack>
		</Box>
	);
}
