import type { BoxProps } from "@mui/material";

type ArkhamIndexDividerMediaContentProps = BoxProps;

export function ArkhamIndexDividerMediaContent(
	_props: ArkhamIndexDividerMediaContentProps,
) {
	return null;

	// return (
	// 	<Box {...props}>
	// 		<ArkhamIndexDividerTitle sx={titleSx} />
	// 		<Box sx={topLineSx} />
	// 		{url && (
	// 			<Box sx={imageSx}>
	// 				<Image
	// 					src={url}
	// 					sx={{
	// 						width: "100%",
	// 						height: "100%",
	// 						objectFit: "cover",
	// 						objectPosition: "center",
	// 					}}
	// 					crossOrigin="anonymous"
	// 				/>
	// 				<NotExportable>
	// 					<Row sx={uploadSx} displayPrint="none">
	// 						{customImage && (
	// 							<IconButton onClick={revokeCustomImage}>
	// 								<Icon icon="trash" sx={iconSx} />
	// 							</IconButton>
	// 						)}
	// 						<Tooltip
	// 							arrow
	// 							title={t(
	// 								`mui divider.arkham-index.customImage.${orientation}.size`,
	// 							)}
	// 						>
	// 							<Upload accept="image/*" onChange={upload}>
	// 								<Icon icon="image" sx={iconSx} />
	// 							</Upload>
	// 						</Tooltip>
	// 					</Row>
	// 				</NotExportable>
	// 				{coversCount > 1 && (
	// 					<NotExportable>
	// 						<Row sx={coversCountSx}>
	// 							<IconButton onClick={prev}>
	// 								<Icon icon="arrow-left" sx={iconSx} />
	// 							</IconButton>
	// 							<IconButton onClick={next}>
	// 								<Icon icon="arrow-right" sx={iconSx} />
	// 							</IconButton>
	// 						</Row>
	// 					</NotExportable>
	// 				)}
	// 			</Box>
	// 		)}
	// 		<Box sx={bottomLineSx} />
	// 	</Box>
	// );
}
