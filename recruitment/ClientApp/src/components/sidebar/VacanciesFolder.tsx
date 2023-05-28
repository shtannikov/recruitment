import React, {FC, useState} from 'react';
import List from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Collapse from '@mui/material/Collapse';
import {useLazyVacanciesQuery} from "../../utils/useVacanciesQuery";
import {useAppNavigation} from "../../utils/useAppNavigation";

export const VacanciesFolder: FC = () => {
    const appNavigation = useAppNavigation();

    const [isFolderOpen, openFolder] = useState(false);
    
    const [ getVacancies, { loading, data }] = useLazyVacanciesQuery();

    const handleFolderClick = () => {
        openFolder(!isFolderOpen);
        void getVacancies();
    };

    return (
        <>
            <ListItemButton onClick={handleFolderClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Открытые вакансии" />
                {isFolderOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isFolderOpen} unmountOnExit>
                <List component="nav" disablePadding sx={{ flexDirection: "column" }}>
                    {
                        !loading && data?.activeVacancies.map((vacancy) => (
                            <ListItemButton sx={{ paddingLeft: 10 }} href={appNavigation.getFunnelUrl(vacancy.recruitemtFunnelId)}>
                                <ListItemText primary={vacancy.name} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}
