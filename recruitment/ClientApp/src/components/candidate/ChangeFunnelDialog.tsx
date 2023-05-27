import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, DialogContentText, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

interface Props {
    nextFunnelStages: string[];
};

export const ChangeFunnelDialog: FC<Props> = (props) => {
    const [age, setAge] = React.useState('');
    const [isCheckBoxSet, setisCheckBoxSet] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const checkboxHandler = () => {
        setisCheckBoxSet(!isCheckBoxSet);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Сменить этап</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Смена этапа</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '100%' },
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <DialogContentText>
                                Для обратной связи по кандидату
                            </DialogContentText>
                            <TextField
                                id="outlined-multiline-flexible"
                                multiline
                                minRows={3}
                                maxRows={5}
                                required={true}
                            />

                            <InputLabel id="demo-simple-select-label">Следующий этап для кандидата</InputLabel>
                            <Select
                                sx={{
                                    '& .MuiTextField-root': { width: '100%' },
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                {props.nextFunnelStages.map((row) => (
                                    <MenuItem value={row}>{row}</MenuItem>
                                ))}
                            </Select>

                            <FormControlLabel control={<Checkbox onClick={checkboxHandler} />} label="Отправить приглашение нанимающему менеджеру" />
                            {isCheckBoxSet && (<div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Ссылка приглашение"
                                    type="link"
                                    fullWidth
                                    variant="standard"
                                />
                            </div>)}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Сменить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}