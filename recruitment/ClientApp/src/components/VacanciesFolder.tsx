import React, {FC} from 'react';
import List from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Collapse from '@mui/material/Collapse';

export const VacanciesFolder: FC = () => {
    const [isFolderOpen, openFolder] = React.useState(false);

    const handleFolderClick = () => {
        openFolder(!isFolderOpen);
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
                <List component="div" disablePadding>
                    <ListItemButton sx={{ paddingLeft: 10 }} href="/">
                        <ListItemText primary="Разработчики" />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
}
