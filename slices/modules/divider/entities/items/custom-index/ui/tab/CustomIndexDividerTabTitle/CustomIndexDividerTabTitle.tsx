import { Box, type BoxProps } from "@mui/material";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { customIndexSettings } from "../../../config";
import { useCustomIndexContext } from "../../CustomIndexContext";
import * as S from "./CustomIndexDividerTabTitle.styles";

type CustomIndexDividerTabTitleProps = BoxProps;

export function CustomIndexDividerTabTitle(
	props: CustomIndexDividerTabTitleProps,
) {
	const { divider, sxOptions } = useCustomIndexContext();
	const getPrintSx = usePrintSx(sxOptions);
	const titleSx = getPrintSx(S.getTitleSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const titleOutlineSx = getPrintSx(S.getTitleOutlineSx);
	const textSx = getPrintSx(S.getTextSx);

	const {
		value: title,
		translatedValue: defaultValue,
		onFontSizeChange,
		onChange,
		onBlur,
	} = useDividerText({
		divider,
		param: "tabTitle",
		fontSizeScaleParam: "tabTitleFontSizeScale",
		defaultValue: divider.title,
	});

	const sx = {
		...props.sx,
		...titleSx,
	};

	return (
		<Box {...props} sx={sx}>
			<DividerText
				dividerId={divider.id}
				sx={textSx}
				fit={!customIndexSettings.wordWrap}
				inputSx={{ height: "100%" }}
				containerSx={{
					lineHeight: customIndexSettings.lineHeight,
					height: "100%",
					width: "100%",
				}}
				value={title}
				defaultValue={defaultValue}
				fitTextOptions={
					customIndexSettings.wordWrap
						? undefined
						: { minFontSize: 5, onFontSizeChange }
				}
				onValueChange={onChange}
				onBlur={onBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={titleOutlineSx}
			/>
		</Box>
	);
}
