import { Box, type BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { getArkhamIndexPrefixedTabTitle } from "../../../lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerTabTitle.styles";

type ArkhamIndexDividerTabTitleProps = BoxProps;

export function ArkhamIndexDividerTabTitle(
	props: ArkhamIndexDividerTabTitleProps,
) {
	const { divider, sxOptions } = useArkhamIndexContext();
	const { translateStory } = useStoryTranslation(divider.story);
	const getPrintSx = usePrintSx(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTitleSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const titleOutlineSx = getPrintSx(S.getTitleOutlineSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const textSx = getPrintSx(S.getTextSx);
	const defaultTitle = translateStory(divider.title);
	const defaultTabTitle = getArkhamIndexPrefixedTabTitle(divider, defaultTitle);

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
		defaultValue: defaultTabTitle,
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
				value={title}
				defaultValue={defaultValue}
				fitTextOptions={{
					minFontSize: 5,
					onFontSizeChange,
				}}
				onValueChange={onChange}
				onBlur={onBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={titleOutlineSx}
				strokeSx={strokeSx}
				visible
			/>
		</Box>
	);
}
