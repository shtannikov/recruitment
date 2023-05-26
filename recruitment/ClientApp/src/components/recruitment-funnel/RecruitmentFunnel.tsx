import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {FC} from "react";
import {StageTab} from "./StageTab";
import {gql} from "../../__generated__";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Skeleton} from "@mui/material";

const GET_FUNNEL = gql(`
    query GetFunnel($id: Int!) {
      recruitmentFunnel(id: $id) {
        orderedStages {
          id,
          name,
          candidates {
            id,
            firstName,
            middleName,
            lastName,
            elapsedDaysInCurrentStage
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

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setCurrentIndex(newValue);
    };

    const isPanelHidden = (panelIndex: number) => {
        return currentIndex !== panelIndex;
    };

    const accessibilityProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    const orderedStages = data?.recruitmentFunnel?.orderedStages;

    return loading
        ? (<Skeleton variant="rectangular" height={200} />)
        : (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentIndex} onChange={handleChange} aria-label="basic tabs example">
                    {
                        orderedStages?.map((stage, index) =>
                            (<Tab label={stage.name} {...accessibilityProps(index)} />))
                    }
                </Tabs>
            </Box>
            {
                orderedStages?.map((stage, index) =>
                    (<StageTab index={index} hidden={isPanelHidden} stage={stage} />))
            }
        </Box>
    );
}