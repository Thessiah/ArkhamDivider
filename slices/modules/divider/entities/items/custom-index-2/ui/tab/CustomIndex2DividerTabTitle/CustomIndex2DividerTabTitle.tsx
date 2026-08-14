import { Box, type BoxProps } from "@mui/material";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { customIndex2Settings } from "../../../config";
import { useCustomIndex2Context } from "../../CustomIndex2Context";
import * as S from "./CustomIndex2DividerTabTitle.styles";

type CustomIndex2DividerTabTitleProps = BoxProps;

export function CustomIndex2DividerTabTitle(
	props: CustomIndex2DividerTabTitleProps,
) {
	const { divider, sxOptions } = useCustomIndex2Context();
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
				fit={!customIndex2Settings.wordWrap}
				inputSx={{ height: "100%" }}
				containerSx={{
					lineHeight: customIndex2Settings.lineHeight,
					height: "100%",
					width: "100%",
				}}
				value={title}
				defaultValue={defaultValue}
				fitTextOptions={
					customIndex2Settings.wordWrap
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
