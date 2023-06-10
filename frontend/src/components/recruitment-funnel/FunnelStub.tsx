import React, {FC} from 'react';
import {useVacanciesQuery} from "../../utils/useVacanciesQuery";
import {Skeleton} from "@mui/material";
import {useAppNavigation} from "../../utils/useAppNavigation";

export const FunnelStub: FC = () => {
    const appNavigation = useAppNavigation();
    const { loading, data } = useVacanciesQuery();

    if (!loading && data && data.activeVacancies.length > 0)
    {
        const defaultFunnelId = data.activeVacancies[0].recruitmentFunnelId;
        appNavigation.redirectToFunnel(defaultFunnelId);
    }

    return (
        <Skeleton variant="rectangular" height={250} />
    );
}
