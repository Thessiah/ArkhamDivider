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
import { customIndex2Settings } from "../../config";
import {
	getCustomIndex2DividerTabSize,
	getCustomIndex2DividerTabsCount,
	useCustomIndex2DividerSxOptions,
} from "../../lib";
import type {
	CustomIndex2DividerLayout,
	CustomIndex2DividerProps,
} from "../../model";
import { CustomIndex2Context } from "../CustomIndex2Context";
import { CustomIndex2DividerBorder as BackgroundStroke } from "../CustomIndex2DividerBorder";
import { CustomIndex2DividerTab as Tab } from "../tab";
import * as C from "./CustomIndex2Divider.components";
import * as S from "./CustomIndex2Divider.styles";

export function CustomIndex2Divider(props: CustomIndex2DividerProps) {
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);
	const layout = useAppSelector(selectLayout) as CustomIndex2DividerLayout;

	const tabsCount = getCustomIndex2DividerTabsCount(layout);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount, side: props.side }),
	);

	const backgroundSrc =
		props.params?.background ?? customIndex2Settings.background;

	const tabSize = getCustomIndex2DividerTabSize({
		divider: props,
		layout,
	});

	const sxOptions = useCustomIndex2DividerSxOptions({
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
		layout.id === "custom-index-2-lower-body" && tabSize !== "full";
	const isPill = layout.id.includes("pill");

	const { side } = props;

	return (
		<CustomIndex2Context.Provider
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
		</CustomIndex2Context.Provider>
	);
}

export default CustomIndex2Divider;
