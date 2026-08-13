import { Box } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerCreaseLine as CreaseLine,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import { selectLasercutEnabled, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { customIndexSettings } from "../../config";
import {
	getCustomIndexDividerTabSize,
	getCustomIndexDividerTabsCount,
	useCustomIndexDividerSxOptions,
} from "../../lib";
import type {
	CustomIndexDividerLayout,
	CustomIndexDividerProps,
} from "../../model";
import { CustomIndexContext } from "../CustomIndexContext";
import { CustomIndexDividerBorder as BackgroundStroke } from "../CustomIndexDividerBorder";
import { CustomIndexDividerTab as Tab } from "../tab";
import * as C from "./CustomIndexDivider.components";
import * as S from "./CustomIndexDivider.styles";

export function CustomIndexDivider(props: CustomIndexDividerProps) {
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);
	const layout = useAppSelector(selectLayout) as CustomIndexDividerLayout;

	const tabsCount = getCustomIndexDividerTabsCount(layout);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount, side: props.side }),
	);

	const backgroundSrc =
		props.params?.background ?? customIndexSettings.background;

	const tabSize = getCustomIndexDividerTabSize({
		divider: props,
		layout,
	});

	const sxOptions = useCustomIndexDividerSxOptions({
		divider: props,
		tabIndex,
		tabSize,
	});

	const getPrintSx = usePrintSx(sxOptions);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundStrokeSx = getPrintSx(S.getBackgroundStrokeSx);
	const bodySx = getPrintSx(S.getBodySx);
	const menuSx = getPrintSx(S.getMenuSx);
	const bleedClipSx = getPrintSx(S.getBleedViewClipSx, { layout });

	const isLowerBodyClipActive =
		layout.id === "custom-index-lower-body" && tabSize !== "full";
	const isPill = layout.id.includes("pill");

	const { side } = props;

	return (
		<CustomIndexContext.Provider
			value={{ layout, divider: props, tabSize, tabIndex, sxOptions }}
		>
			<Container
				sx={isLowerBodyClipActive ? { backgroundColor: "white" } : undefined}
			>
				<BleedView sx={{ backgroundColor: "white", ...bleedClipSx }}>
					{backgroundSrc && (
						<Image
							src={backgroundSrc}
							sx={{
								...backgroundSx,
								zIndex: 1,
							}}
						/>
					)}
				</BleedView>
				<C.Layer side={props.side}>
					{!isPill && <CreaseLine offset={layout.creasingTop} />}
					{!isPill && (
						<Box sx={bodySx}>
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
				</C.Layer>
			</Container>
		</CustomIndexContext.Provider>
	);
}

export default CustomIndexDivider;
