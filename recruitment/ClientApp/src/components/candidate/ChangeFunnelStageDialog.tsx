import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

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

    const [nextStage, setNextStage] = React.useState('');

    const selectNextStage = (event: SelectChangeEvent) => {
        setNextStage(event.target.value as string);
    };

    return (
        <>
            <Button variant="contained" onClick={openDialog}>Сменить этап</Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Смена этапа</DialogTitle>
                <DialogContent>
                    <DialogContentText>Комментарий по кандидату</DialogContentText>
                    <TextField
                        id="comment"
                        multiline
                        minRows={3}
                        maxRows={5}
                        required={true}
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
                        <Button onClick={closeDialog} disabled>Сменить (в разработке)</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}