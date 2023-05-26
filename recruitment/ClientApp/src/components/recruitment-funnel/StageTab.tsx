import {FC} from "react";
import Box from "@mui/material/Box";
import {Candidate, CandidateList} from "./CandidateList";
import * as React from "react";


function createCandidate(id: number, fullname: string, phaseDuration: number) : Candidate {
    return { id, fullname, phaseDuration };
}

const candidatesPerPhase: Candidate[][] = [
    [
        createCandidate(1,'Штанников Евгений', 15),
        createCandidate(2,'Родимов Кирилл', 6),
        createCandidate(3,'Кузмичева Марина', 1),
    ],
    [
        createCandidate(4,'Кравцов Павел', 9),
        createCandidate(5,'Мисюрев Роман', 7),
        createCandidate(6,'Филатов Вячесла', 3),
    ],
    [
        createCandidate(7,'Прудников Никита', 8),
        createCandidate(8,'Тарасенко Сергей', 4),
        createCandidate(9,'Андрейчук Николай', 2),
    ],
];

interface PhasePanelProps {
    index: number;
    hidden: (index: number) => boolean;
}

export const StageTab: FC<PhasePanelProps> = ({ index, hidden }) => {
    
    const candidates = candidatesPerPhase[index];
    
    return (
        <div
            role="tabpanel"
            hidden={hidden(index)}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            <Box sx={{ paddingLeft: 12, paddingTop: 3 }}>
                <CandidateList candidates={candidates}/>
            </Box>
        </div>
    );
}