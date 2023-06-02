import { FC } from "react";
import { TableContainer, TableHead, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';

interface Feedback {
    id: number;
    text: string;
    author: {
        personalName: string;
    };
    funnelStage: {
        name: string
    };
    creationDateTimeUtc: string;
}

interface Props {
    feedbacks: Feedback[]
}

export const FeedbackList: FC<Props> = ({ feedbacks }) => {
    return (
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
                    {feedbacks.reverse().map((feedback) => (
                        <TableRow
                            key={feedback.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{feedback.text}</TableCell>
                            <TableCell component="th" scope="row">
                                {feedback.funnelStage.name}
                            </TableCell>
                            <TableCell align="left">{feedback.author.personalName}</TableCell>
                            <TableCell align="left">
                                {new Date(feedback.creationDateTimeUtc).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}