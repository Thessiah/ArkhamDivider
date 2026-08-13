import type { BoxProps } from "@mui/material/Box";
import type { FC } from "react";
import { customIndexCategoryId } from "@/modules/divider/entities/items/custom-index/config";
import { customIndex2CategoryId } from "@/modules/divider/entities/items/custom-index-2/config";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectDividerType } from "@/modules/divider/shared/lib";
import type { DividerLayoutType } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import { CustomIndex2DividerOptions } from "../custom-index-2-divider-options";
import { CustomIndexDividerOptions } from "../custom-index-divider-options";
import { InvestigatorDividerOptions } from "../investigator-divider-options";
import { PlayerDividerOptions } from "../player-divider-options";
import { ScenarioDividerOptions } from "../scenario-divider-options";

type DividerLayoutOptionsProps = BoxProps;

const dividerTypeMap: Record<DividerLayoutType, FC<BoxProps>> = {
	scenario: ScenarioDividerOptions,
	player: PlayerDividerOptions,
	investigator: InvestigatorDividerOptions,
};

export function DividerLayoutOptions(props: DividerLayoutOptionsProps) {
	const dividerType = useAppSelector(selectDividerType);
	const layout = useAppSelector(selectLayout);

	if (layout?.categoryId === customIndexCategoryId) {
		return <CustomIndexDividerOptions {...props} />;
	}

	if (layout?.categoryId === customIndex2CategoryId) {
		return <CustomIndex2DividerOptions {...props} />;
	}

	const Component = dividerTypeMap[dividerType];
	return <Component {...props} />;
}
