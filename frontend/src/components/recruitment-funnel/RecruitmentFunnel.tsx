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

const GET_FUNNEL = gql(`
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
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const orderedStages = data?.recruitmentFunnel?.stages;

    return loading
        ? (<Skeleton variant="rectangular" height={200} />)
        : (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={openedStageIndex} onChange={openStage} aria-label="basic tabs example">
                        {
                            orderedStages?.map((stage, index) =>
                                (<Tab label={stage.name} {...accessibilityProps(index)} />))
                        }
                    </Tabs>
                </Box>
                {
                    orderedStages?.map((stage, index) =>
                        (<StageTab index={index} hidden={isStageHidden} stage={stage} />))
                }
            </Box>
        );
}