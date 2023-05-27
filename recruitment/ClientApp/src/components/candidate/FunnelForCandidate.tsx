import { FC } from "react";
import { ListItem, ListItemText, List, ListItemButton, TableContainer, TableHead, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { ChangeFunnelDialog } from './ChangeFunnelDialog';

interface Props {
    funnelName: string;
    vacanceName: string;
    rows: Row[];
    nextFunnelStages: string[];
    disableNextStages?: boolean;
};

interface Row {
    name: string;
    date: string;
    who: string;
    comment: string;
}

export const FunnelForCandidate: FC<Props> = (props) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={props.vacanceName} secondary={props.funnelName} />
                {!props.disableNextStages && <ChangeFunnelDialog nextFunnelStages={props.nextFunnelStages}/>}
            </ListItem>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Этап</TableCell>
                                <TableCell align="right">Дата</TableCell>
                                <TableCell align="right">Кто</TableCell>
                                <TableCell align="right">Обратная связь</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.who}</TableCell>
                                    <TableCell align="right">{row.comment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { !props.disableNextStages && (<ListItemButton>Оставить обратную связь по текущему этапу</ListItemButton>)}
            
        </List>
    );
}