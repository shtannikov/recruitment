import React, {FC} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import {VacanciesFolder} from "./VacanciesFolder";
import {ListItem, Tooltip} from "@mui/material";

export const LeadRecruiterSidebar: FC = () => {
    return (
        <List component="nav">
            <VacanciesFolder />
            <Tooltip title="В разработке">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <FolderCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Управление вакансиями" />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
            <Tooltip title="В разработке">
                <ListItem disablePadding>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <FilterAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Управление воронкой" />
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
