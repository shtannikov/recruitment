import { FC } from "react";
import { ListItem, ListItemText, List, TableContainer, TableHead, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { ChangeFunnelStageDialog } from './ChangeFunnelStageDialog';
import {useUserContext} from "../../utils/UserContext";
import {UserRole} from "../../__generated__/graphql";

interface Props {
    stage?: string;
    vacancy?: string;
    nextStages?: string[];
}

interface Feedback {
    comment: string;
    stage: string;
    author: string;
    date: string;
}

function createFeedback(
    stage: string,
    date: string,
    author: string,
    comment: string,
) {
    return { stage, date, author, comment };
}

const feedbackList = [
    createFeedback('Прескрин', "25.04.2023", "Рекрутер Катя", "Огонь! Стопроцентная культурная совместимость"),
    createFeedback('Техническое интервью', "29.04.2023", "Заказчик Иван", "По технике слабовато, особенно с алгоритмами"),
];

export const CandidateStage: FC<Props> = (props) => {
    const { isLoading, userRole } = useUserContext();

    return (
        <List>
            <ListItem>
                <ListItemText primary={props.vacancy} secondary={props.stage} />
                {!isLoading && userRole != UserRole.HiringManager && <ChangeFunnelStageDialog nextFunnelStages={props.nextStages}/>}
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
                            {feedbackList.map((feedback) => (
                                <TableRow
                                    key={feedback.stage}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{feedback.comment}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {feedback.stage}
                                    </TableCell>
                                    <TableCell align="left">{feedback.author}</TableCell>
                                    <TableCell align="left">{feedback.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </List>
    );
}