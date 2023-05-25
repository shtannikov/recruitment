import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {FC} from "react";
import {PhasePanel} from "./PhasePanel";

export const RecruitmentFunnel: FC = () => {
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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Новые отклики" {...accessibilityProps(0)} />
                    <Tab label="Техническое интервью" {...accessibilityProps(1)} />
                    <Tab label="Командное" {...accessibilityProps(2)} />
                </Tabs>
            </Box>
            <PhasePanel hidden={isPanelHidden} index={0} />
            <PhasePanel hidden={isPanelHidden} index={1} />
            <PhasePanel hidden={isPanelHidden} index={2} />
        </Box>
    );
}