import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import {useAppNavigation} from "../../utils/useAppNavigation";
import { NavLink } from 'react-router-dom';
import {DateCalculator} from "../../utils/DateCalculator";

export interface Candidate {
    id: number;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    stageEntranceDateTimeUtc: string;
}
export const CandidateList: FC<{ candidates: Candidate[] }> = ({ candidates }) =>  {
    const appNavigation = useAppNavigation();

    const getElapsedDaysInCurrentStage = (rawStageEntranceDateTimeUtc: string) => {
        const dateTimeNow = new Date();
        const stageEntranceDateTime = new Date(rawStageEntranceDateTimeUtc);

        return new DateCalculator().getDifferenceInDays(dateTimeNow, stageEntranceDateTime);
    }

    return (
        <TableContainer sx={{ minWidth: 400, maxWidth: 700 }} component={Paper}>
            <Table data-testid="candidate list" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Elapsed days in the stage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {candidates
                        .map(c => {
                            return {
                                ...c,
                                elapsedDaysInCurrentStage: getElapsedDaysInCurrentStage(c.stageEntranceDateTimeUtc)
                            };
                        })
                        .sort((c1, c2) => 
                            c1.elapsedDaysInCurrentStage > c2.elapsedDaysInCurrentStage
                                ? -1
                                : 1
                        )
                        .map((candidate) => (
                            <TableRow
                                data-testid="candidate"
                                key={candidate.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell data-testid="full name" component="th" scope="row">
                                    <NavLink to={appNavigation.getCandidateUrl(candidate.id)} style={{ textDecoration: 'none' }}>
                                        {candidate.firstName} {candidate.middleName} {candidate.lastName}
                                    </NavLink>
                                </TableCell>
                                <TableCell data-testid="elapsed days in the stage" align="right">{candidate.elapsedDaysInCurrentStage}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}