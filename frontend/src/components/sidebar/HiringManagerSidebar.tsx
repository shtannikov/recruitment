import React, {FC} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import {VacanciesFolder} from "./VacanciesFolder";
import {ListItem, Tooltip} from "@mui/material";

export const HiringManagerSidebar: FC = () => {
    return (
        <List component="nav">
            <VacanciesFolder />
            <Tooltip title="We're working on this section">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="New vacancy request" />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
            <Tooltip title="We're working on this section">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
        </List>
    );
}
