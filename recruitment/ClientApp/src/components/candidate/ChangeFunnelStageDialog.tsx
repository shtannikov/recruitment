import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, DialogContentText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {ChangeEvent, FC} from 'react';

interface Props {
    nextFunnelStages?: string[];
}

export const ChangeFunnelStageDialog: FC<Props> = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    const [nextStage, setNextStage] = React.useState<string | undefined>(undefined);
    const [comment, setComment] = React.useState<string | undefined>(undefined);
    const [isValidationError, setIsValidationError] = React.useState(false);

    const selectNextStage = (event: SelectChangeEvent) => {
        setNextStage(event.target.value as string);
    };

    const changeComment = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const save = () => {
        if (!comment || !nextStage)
            setIsValidationError(true);
        else
            setDialogOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={openDialog}>Сменить этап</Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Смена этапа</DialogTitle>
                <DialogContent>
                    {
                        isValidationError && !comment &&
                        (<Alert severity="error" sx={{ marginBottom: 1 }}>Комментарий должен быть заполнен</Alert>)
                    }
                    {
                        isValidationError && !nextStage &&
                            (<Alert severity="error" sx={{ marginBottom: 1 }}>Должен быть выбран этап</Alert>)
                    }

                    <DialogContentText>Комментарий по кандидату</DialogContentText>
                    <TextField
                        id="comment"
                        multiline
                        minRows={3}
                        maxRows={5}
                        value={comment}
                        onChange={changeComment}
                        sx={{ minWidth: 500, marginBottom: 2 }}
                    />

                    <InputLabel id="stage-label">Этап</InputLabel>
                    <Select
                        labelId="stage-label"
                        id="stage-select"
                        value={nextStage}
                        onChange={selectNextStage}
                        sx={{ minWidth: 200 }}
                    >
                        {props.nextFunnelStages!.map((row) => (
                            <MenuItem value={row}>{row}</MenuItem>
                        ))}
                    </Select>
                    <DialogActions>
                        <Button onClick={closeDialog}>Закрыть</Button>
                        <Button onClick={save}>Сменить</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}