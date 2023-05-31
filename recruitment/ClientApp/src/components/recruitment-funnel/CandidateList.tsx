import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import {FC} from "react";
import {useAppNavigation} from "../../utils/useAppNavigation";

export interface Candidate {
    id: number;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    elapsedDaysInCurrentStage: number;
}
export const CandidateList: FC<{ candidates: Candidate[] }> = ({ candidates }) =>  {
    const appNavigation = useAppNavigation();

    return (
        <TableContainer sx={{ minWidth: 400, maxWidth: 700 }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell align="right">Время на этапе (в днях)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {candidates
                        .sort((c1, c2) => 
                            c1.elapsedDaysInCurrentStage > c2.elapsedDaysInCurrentStage
                                ? -1
                                : 1
                        )
                        .map((candidate) => (
                            <TableRow
                                key={candidate.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={appNavigation.getCandidateUrl(candidate.id)} underline="hover">
                                        {candidate.firstName} {candidate.middleName} {candidate.lastName}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{candidate.elapsedDaysInCurrentStage}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}