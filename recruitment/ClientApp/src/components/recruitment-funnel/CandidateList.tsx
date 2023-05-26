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

export interface Candidate {
    id: number;
    fullname: string;
    phaseDuration: number;
}

//TODO: empty state
export const CandidateList: FC<{ candidates: Candidate[] }> = ({ candidates }) =>  {
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
                    {candidates.map((candidate) => (
                        <TableRow
                            key={candidate.fullname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link href={`/candidate/${candidate.id}`} underline="hover">
                                    {candidate.fullname}
                                </Link>
                            </TableCell>
                            <TableCell align="right">{candidate.phaseDuration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}