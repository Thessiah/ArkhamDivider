import { Box, Tooltip } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import {
	setAllDividersParam,
	useTabPosition,
	useTabSize,
} from "@/modules/divider/shared/lib";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppDispatch } from "@/shared/lib";
import { Image } from "@/shared/ui";
import {
	getCustomIndexDividerIconLeft,
	getCustomIndexDividerTabLeft,
	getCustomIndexDividerTabsCount,
	getCustomIndexDividerTabWidth,
	showCustomIndexDividerTabIcon,
	showCustomIndexDividerTabTitle,
	useCustomIndexIndent,
} from "../../../lib";
import { useCustomIndexContext } from "../../CustomIndexContext";
import { CustomIndexDividerTabTitle as TabTitle } from "../CustomIndexDividerTabTitle";
import * as S from "./CustomIndexDividerTab.styles";

const leftPosition = { position: "left" } as const;
const rightPosition = { position: "right" } as const;

const tabSizes = [1, 2, 3, "full"];

export function CustomIndexDividerTab() {
	const { t } = useTranslation();
	const { layout, tabSize, tabIndex, divider, sxOptions } =
		useCustomIndexContext();

	const dispatch = useAppDispatch();

	const tabWidths = sxOptions.objects.tab.width;
	const tabSideWidth = sxOptions.objects.tab.sideWidth;
	const iconWidth = sxOptions.objects.icon.width;

	const { cornerRadius } = sxOptions.objects;
	const tabHeight = sxOptions.objects.tab.height;
	const { width } = layout.size;
	const tabsCount = getCustomIndexDividerTabsCount(layout);
	const tabWidth = getCustomIndexDividerTabWidth({
		tabWidths,
		tabSize,
		width,
	});

	const iconImage = divider.params?.iconImage ?? null;

	const tabLeft = getCustomIndexDividerTabLeft({
		tabSize,
		tabIndex,
		tabsCount,
		tabWidths,
		width,
		cornerRadius,
	});
	const iconPosition: "left" | "right" =
		tabSize === "full" || tabLeft + tabWidth >= width - 0.01 ? "left" : "right";
	const left = getCustomIndexDividerIconLeft({
		tabSize,
		tabLeft,
		tabWidth,
		tabSideWidth,
		iconWidth,
		edgeMargin: sxOptions.objects.icon.edgeMargin,
		iconPosition,
	});

	const showGlyph = showCustomIndexDividerTabIcon(divider);
	const showIcon = Boolean(iconImage);

	const tabSxOptions = useMemo(
		() => ({
			...sxOptions,
			iconLeft: left,
			iconPosition,
			showIcon,
			tabWidth,
			tabLeft,
		}),
		[left, sxOptions, iconPosition, tabWidth, tabLeft, showIcon],
	);

	const getPrintSx = usePrintSx(tabSxOptions);

	const iconWrapperSx = getPrintSx(S.getIconWrapperSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const shiftLeftSx = getPrintSx(S.getShiftSx, leftPosition);
	const shiftRightSx = getPrintSx(S.getShiftSx, rightPosition);
	const enlargeSx = getPrintSx(S.getEnlargeSx);
	const shrinkSx = getPrintSx(S.getShrinkSx, { isFull: tabSize === "full" });
	const increaseIndentSx = getPrintSx(S.getIncreaseIndentSx);
	const decreaseIndentSx = getPrintSx(S.getDecreaseIndentSx);
	const fullSizeSx = getPrintSx(S.getFullSizeSx);

	const {
		canIncreaseIndent,
		canDecreaseIndent,
		increaseIndent,
		decreaseIndent,
	} = useCustomIndexIndent();

	const showTitle = showCustomIndexDividerTabTitle({
		tabSize,
		showIcon,
	});

	const { shiftLeft, shiftRight, canShiftLeft, canShiftRight } = useTabPosition(
		{
			dividerId: divider.id,
			tabIndex,
			tabsCount,
		},
	);

	const { enlarge, shrink, canEnlarge, canShrink } = useTabSize({
		dividerId: divider.id,
		sizes: tabSizes,
		tabSize,
	});

	const setFullSizeForAll = useCallback(() => {
		dispatch(setAllDividersParam({ key: "tabSize", value: "full" }));
	}, [dispatch]);

	const mm = usePrintUnitCallback();

	const isFullSize = tabSize === "full" || tabSize === 3;

	const showShiftLeft = canShiftLeft && !isFullSize;
	const showShiftRight = canShiftRight && !isFullSize;

	const canChangeSize = layout.params?.title !== false;

	return (
		<>
			{canChangeSize && (
				<NotExportable>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: mm(tabLeft),
							width: mm(tabWidth),
							height: mm(tabHeight),
							display: divider.side === "front" ? "flex" : "none",
							displayPrint: "none",
						}}
					>
						{showShiftLeft && (
							<Box onClick={shiftLeft} sx={shiftLeftSx}>
								<Icon icon="action" />
							</Box>
						)}
						{showShiftRight && (
							<Box onClick={shiftRight} sx={shiftRightSx}>
								<Icon icon="action" />
							</Box>
						)}
						{canEnlarge && (
							<Box onClick={enlarge} sx={enlargeSx}>
								<Icon icon="enlarge2" />
							</Box>
						)}
						{canShrink && (
							<Box onClick={shrink} sx={shrinkSx}>
								<Icon icon="shrink2" />
							</Box>
						)}
						{canIncreaseIndent && (
							<Box onClick={increaseIndent} sx={increaseIndentSx}>
								<Icon icon="indent-increase" />
							</Box>
						)}
						{canDecreaseIndent && (
							<Box onClick={decreaseIndent} sx={decreaseIndentSx}>
								<Icon icon="indent-decrease" />
							</Box>
						)}
						{tabSize === "full" && (
							<Tooltip title={t("divider.arkham-index.setAllFull")} arrow>
								<Box onClick={setFullSizeForAll} sx={fullSizeSx}>
									<Icon icon="pushpin" />
								</Box>
							</Tooltip>
						)}
					</Box>
				</NotExportable>
			)}
			{showGlyph && iconImage && (
				<Box sx={iconWrapperSx}>
					<Image
						src={iconImage}
						sx={{ width: "100%", height: "100%", objectFit: "contain" }}
					/>
				</Box>
			)}
			{showTitle && <TabTitle sx={titleSx} />}
		</>
	);
}
