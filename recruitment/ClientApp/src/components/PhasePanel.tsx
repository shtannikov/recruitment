import {FC, useMemo} from "react";
import Box from "@mui/material/Box";
import {Candidate, CandidateList} from "./CandidateList";
import * as React from "react";


function createCandidate(fullname: string, phaseDuration: number) : Candidate {
    return { fullname, phaseDuration };
}

const candidatesPerPhase: Candidate[][] = [
    [
        createCandidate('Штанников Евгений', 15),
        createCandidate('Родимов Кирилл', 6),
        createCandidate('Кузмичева Марина', 1),
    ],
    [
        createCandidate('Кравцов Павел', 9),
        createCandidate('Мисюрев Роман', 7),
        createCandidate('Филатов Вячесла', 3),
    ],
    [
        createCandidate('Прудников Никита', 8),
        createCandidate('Тарасенко Сергей', 4),
        createCandidate('Андрейчук Николай', 2),
    ],
];

interface PhasePanelProps {
    index: number;
    hidden: (index: number) => boolean;
}

export const PhasePanel: FC<PhasePanelProps> = ({ index, hidden }) => {
    
    const candidates = candidatesPerPhase[index];
    
    return (
        <div
            role="tabpanel"
            hidden={hidden(index)}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            <Box sx={{ p: 3 }}>
                <CandidateList candidates={candidates}/>
            </Box>
        </div>
    );
}