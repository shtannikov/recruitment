import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {FC, useEffect} from "react";
import {StageTab} from "./StageTab";
import {gql} from "../../__generated__";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Skeleton} from "@mui/material";
import {usePageContext} from "../../utils/usePageContext";
import QA from "../../utils/QASelectorConstants";

export const GET_FUNNEL = gql(`
    query GetFunnel($id: Int!) {
      recruitmentFunnel(id: $id) {
        vacancy {
            name
        }
        stages {
          id,
          name,
          candidates {
            id,
            firstName
            middleName
            lastName
            stageEntranceDateTimeUtc
          }
        }
      }
    }
`);

export const RecruitmentFunnel: FC = () => {
    const { id } = useParams<{id: string}>();

    const { loading, data } = useQuery(
        GET_FUNNEL,
        { variables: { id: Number(id) }}
    );

    const pageContext = usePageContext();
    useEffect(() => {
        const vacancy = data?.recruitmentFunnel?.vacancy.name;
        const title = vacancy
            ? `Recruitment funnel / ${vacancy}`
            : "Recruitment funnel";
        pageContext.setTitle(title);
    }, [data, pageContext]);

    const [openedStageIndex, setOpenedStageIndex] = React.useState(0);

    const openStage = (event: React.SyntheticEvent, newValue: any) => {
        setOpenedStageIndex(newValue);
    };

    const isStageHidden = (stageIndex: number) => {
        return openedStageIndex !== stageIndex;
    };

    const accessibilityProps = (index: number) => {
        return {
            key: `stage-tab-${index}`,
            id: `stage-tab-${index}`,
            'aria-controls': `stage-tabpanel-${index}`,
        };
    }
    
    const stageList = data?.recruitmentFunnel?.stages;

    return loading
        ? (<Skeleton data-testid={QA.funnel.skeleton} variant="rectangular" height={200} />)
        : (
            <Box data-testid={QA.funnel.body} sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={openedStageIndex} onChange={openStage} aria-label="basic tabs example">
                        {
                            stageList?.map((stage, index) =>
                                (<Tab
                                    data-testid={QA.funnel.stage.header}
                                    label={stage.name}
                                    {...accessibilityProps(index)} />))
                        }
                    </Tabs>
                </Box>
                {
                    stageList?.map((stage, index) =>
                        (<StageTab
                            key={`stage-tabpanel-${index}`}
                            index={index}
                            hidden={isStageHidden}
                            stage={stage} />))
                }
            </Box>
        );
}