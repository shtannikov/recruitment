import { FC } from "react";
import { ListItem, ListItemText, List, TableContainer, TableHead, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { ChangeFunnelStageDialog } from './ChangeFunnelStageDialog';

interface Props {
    funnelName: string;
    vacanceName: string;
    rows: Row[];
    nextFunnelStages?: string[];
    disableNextStages?: boolean;
}

interface Row {
    name: string;
    date: string;
    who: string;
    comment: string;
}

export const CandidateStage: FC<Props> = (props) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={props.vacanceName} secondary={props.funnelName} />
                {!props.disableNextStages && <ChangeFunnelStageDialog nextFunnelStages={props.nextFunnelStages}/>}
            </ListItem>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Комментарий</TableCell>
                                <TableCell align="left">Этап</TableCell>
                                <TableCell align="left">Автор</TableCell>
                                <TableCell align="left">Дата</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.comment}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.who}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </List>
    );
}