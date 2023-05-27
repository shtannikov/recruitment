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
            <Tooltip title="В разработке">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Заявка на вакансию" />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
            <Tooltip title="В разработке">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Настройки" />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
        </List>
    );
}
