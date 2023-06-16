import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, DialogContentText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {ChangeEvent, FC, useMemo} from 'react';
import {gql} from "../../__generated__";
import {useMutation} from "@apollo/client";
import {UserRole} from "../../__generated__/graphql";

const MOVE_TO_NEXT_STAGE = gql(`
    mutation MoveToNextStage($candidateId: Int!, $nextStageId: Int!, $motivation: String!) {
      candidates {
        moveToNextFunnelStage(
            candidateId: $candidateId,
            nextStageId: $nextStageId,
            motivation: $motivation
          ) 
        {
          succeeded
          validationErrors
        }
      }
    }
`);

interface Props {
    userRole: UserRole | undefined,
    candidateId: number,
    currentStage: {
        name: string,
        order: number,
        funnel: {
            vacancy: {
                name: string,
            },
            stages: {
                id: number,
                order: number,
                name: string
            }[]
        }
    },
    updateCandidate: () => void
}

export const ChangeFunnelStageDialog: FC<Props> = ({ userRole, candidateId, currentStage, updateCandidate }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    const [selectedNextStageId, setSelectedNextStageId] = React.useState<number | undefined>(undefined);
    const [comment, setComment] = React.useState<string | undefined>(undefined);
    const [isValidationError, setIsValidationError] = React.useState(false);

    const selectNextStage = (event: SelectChangeEvent) => {
        setSelectedNextStageId(Number(event.target.value));
    };

    const changeComment = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const [ moveToNextStage ] = useMutation(
        MOVE_TO_NEXT_STAGE,
        { variables: { candidateId, nextStageId: selectedNextStageId!, motivation: comment!  } }
    );

    const save = async () => {
        if (!comment || !selectedNextStageId)
            setIsValidationError(true);
        else {
            await moveToNextStage();
            setDialogOpen(false);
            updateCandidate();
        }
    };

    const nextStages = useMemo(() => {
        return currentStage.funnel
            .stages
            .filter(s => s.order > currentStage.order);
    }, [currentStage]);

    return !userRole || userRole === UserRole.HiringManager || nextStages.length === 0
        ? null
        : (<>
            <Button variant="contained" onClick={openDialog}>Change stage</Button>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Stage change</DialogTitle>
                <DialogContent>
                    {
                        isValidationError && !comment &&
                        (<Alert severity="error" sx={{ marginBottom: 1 }}>Comment can't be empty</Alert>)
                    }
                    {
                        isValidationError && !selectedNextStageId &&
                            (<Alert severity="error" sx={{ marginBottom: 1 }}>Stage must be selected</Alert>)
                    }

                    <DialogContentText>Comment about the candidate</DialogContentText>
                    <TextField
                        id="comment"
                        multiline
                        minRows={3}
                        maxRows={5}
                        value={comment}
                        onChange={changeComment}
                        sx={{ minWidth: 500, marginBottom: 2 }}
                    />

                    <InputLabel id="stage-label">Stage</InputLabel>
                    <Select
                        labelId="stage-label"
                        id="stage-select"
                        value={selectedNextStageId?.toString()}
                        onChange={selectNextStage}
                        sx={{ minWidth: 200 }}
                    >
                        {nextStages.map((stage) => (
                            <MenuItem value={stage.id}>{stage.name}</MenuItem>
                        ))}
                    </Select>
                    <DialogActions>
                        <Button onClick={closeDialog}>Close</Button>
                        <Button onClick={save}>Change</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}