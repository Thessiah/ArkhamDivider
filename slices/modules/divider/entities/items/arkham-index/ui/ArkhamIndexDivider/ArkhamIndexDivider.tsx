// import * as C from "./ArkhamIndexDivider.components";

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerCardsInfo as CardsInfo,
	DividerColorPicker as ColorPicker,
	DividerContainer as Container,
	DividerCreaseLine as CreaseLine,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import { selectLasercutEnabled, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { absoluteFill } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../config";
import {
	getArkhamIndexDividerDefaultColor,
	getArkhamIndexDividerDefaultFilter,
	getArkhamIndexDividerTabSize,
	getArkhamIndexDividerTabsCount,
	useArkhamIndexDividerSxOptions,
} from "../../lib";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
} from "../../model";
import { ArkhamIndexContext } from "../ArkhamIndexContext";
import { ArkhamIndexDividerBorder as BackgroundStroke } from "../ArkhamIndexDividerBorder";
import {
	ArkhamIndexDividerCardsCount as CardsCount,
	ArkhamIndexDividerMediaContent as MediaContent,
} from "../content";
import { ArkhamIndexDividerTab as Tab } from "../tab";
import * as C from "./ArkhamIndexDivider.components";
import * as S from "./ArkhamIndexDivider.styles";

export function ArkhamIndexDivider(props: ArkhamIndexDividerProps) {
	const { t } = useTranslation();
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;
	const [showCardsInfo, setShowCardsInfo] = useBoolean(false);

	const tabsCount = getArkhamIndexDividerTabsCount(layout);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount, side: props.side }),
	);

	const defaultColor = getArkhamIndexDividerDefaultColor(props);

	const backgroundColor = props.params?.color ?? defaultColor;
	const backgroundFilter = backgroundColor
		? "none"
		: getArkhamIndexDividerDefaultFilter(props);

	const tabSize = getArkhamIndexDividerTabSize({
		divider: props,
		layout,
	});

	const sxOptions = useArkhamIndexDividerSxOptions({
		divider: props,
		tabIndex,
		tabSize,
	});

	const getPrintSx = usePrintSx(sxOptions);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundStrokeSx = getPrintSx(S.getBackgroundStrokeSx);
	const bodySx = getPrintSx(S.getBodySx);
	const mediaContentSx = getPrintSx(S.getMediaContentSx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const infoSx = getPrintSx(S.getInfoSx);
	const dividerCardsSx = getPrintSx(S.getDividerCardsSx);
	const bleedClipSx = getPrintSx(S.getBleedViewClipSx, { layout });

	const isLowerBodyClipActive =
		layout.id === "arkham-index-lower-body" && tabSize !== "full";
	const isPill = layout.groupId === "pill";

	const { side } = props;

	const showMediaContent = props.layoutType !== "player";
	return (
		<ArkhamIndexContext.Provider
			value={{ layout, divider: props, tabSize, tabIndex, sxOptions }}
		>
			<Container
				sx={isLowerBodyClipActive ? { backgroundColor: "white" } : undefined}
			>
				<BleedView sx={bleedClipSx}>
					<Image
						src={`${arkhamIndexDividerBaseUrl}/background.avif`}
						sx={{
							...backgroundSx,
							filter: backgroundFilter,
							zIndex: 1,
						}}
					/>
					{backgroundColor && (
						<Box
							sx={{
								...absoluteFill,
								zIndex: 3,
								backgroundColor,
								mixBlendMode: "color",
								pointerEvents: "none",
								printColorAdjust: "exact",
							}}
						/>
					)}
				</BleedView>
				<C.Layer side={props.side}>
					{!isPill && <CreaseLine offset={layout.creasingTop} />}
					{!isPill && (
						<Box sx={bodySx}>
							{showMediaContent && <MediaContent sx={mediaContentSx} />}
							<Menu dividerId={props.id} sx={menuSx} />
						</Box>
					)}
					<Tab />
					<NotExportable
						visible={!lasercutEnabled}
						visibleOn={["image", "zip"]}
					>
						{side === "front" && <BackgroundStroke sx={backgroundStrokeSx} />}
					</NotExportable>

					<NotExportable>
						<ColorPicker
							dividerId={props.id}
							param="color"
							defaultColor={backgroundColor}
							sx={colorPickerSx}
							title={t("divider.arkhamIndex.background.pickerTitle")}
						/>
					</NotExportable>
					{!isPill && (
						<CardsCount sx={infoSx} onClick={setShowCardsInfo.toggle} />
					)}
					{!isPill && showCardsInfo && (
						<CardsInfo sx={dividerCardsSx} divider={props} />
					)}
				</C.Layer>
			</Container>
		</ArkhamIndexContext.Provider>
	);
}

export default ArkhamIndexDivider;
