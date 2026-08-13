import { Box, type BoxProps } from "@mui/material";
import { useMemo } from "react";
import { selectShowCornerRadius } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import {
	getCustomIndexDividerTabsCount,
	getCustomIndexDividerBackgroundPath as getPath,
} from "../../lib";
import { useCustomIndexContext } from "../CustomIndexContext";

type CustomIndexDividerBorderProps = BoxProps;

export function CustomIndexDividerBorder(props: CustomIndexDividerBorderProps) {
	const { layout, tabSize, tabIndex, sxOptions } = useCustomIndexContext();
	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);
	const { tab, cornerRadius } = sxOptions.objects;

	const { width, height } = layout.size;
	const tabsCount = getCustomIndexDividerTabsCount(layout);

	const strokeWidth = 2;

	const path = useMemo(
		() =>
			getPath({
				width,
				height,
				cornerRadius,
				tabHeight: tab.height,
				tabSideWidth: tab.sideWidth,
				tabWidths: tab.width,
				tabSize,
				tabIndex,
				tabsCount,
				cornerRadiusEnabled,
			}),
		[
			cornerRadius,
			height,
			tab.height,
			tab.sideWidth,
			tab.width,
			tabIndex,
			tabSize,
			tabsCount,
			width,
			cornerRadiusEnabled,
		],
	);

	return (
		<Box
			aria-hidden
			component="svg"
			preserveAspectRatio="none"
			sx={{
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				width: "100%",
				...props.sx,
			}}
			viewBox={`0 0 ${width} ${height}`}
		>
			<path
				d={path}
				fill="none"
				stroke="red"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
		</Box>
	);
}
