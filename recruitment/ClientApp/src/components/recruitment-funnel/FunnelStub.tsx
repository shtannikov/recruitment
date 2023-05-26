import React, {FC} from 'react';
import {useVacanciesQuery} from "../../utils/useVacanciesQuery";
import {Skeleton} from "@mui/material";
import {useAppNavigation} from "../../utils/useAppNavigation";

export const FunnelStub: FC = () => {
    const appNavigation = useAppNavigation();
    const { loading, data } = useVacanciesQuery();

    if (!loading && data && data.vacancies.length > 0)
    {
        const defaultFunnelId = data.vacancies[0].recruitemtFunnelId;
        appNavigation.redirectToFunnel(defaultFunnelId);
    }

    return (
        <Skeleton variant="rectangular" height={250} />
    );
}
