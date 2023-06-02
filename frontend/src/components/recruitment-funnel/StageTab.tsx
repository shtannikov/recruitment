import {FC} from "react";
import Box from "@mui/material/Box";
import {Candidate, CandidateList} from "./CandidateList";
import * as React from "react";

interface Stage {
    id: number;
    candidates: Candidate[];
}

interface StagePanelProps {
    index: number;
    stage: Stage;
    hidden: (index: number) => boolean;
}

export const StageTab: FC<StagePanelProps> = ({ index, stage, hidden }) => {
    
    return (
        <div
            role="tabpanel"
            hidden={hidden(index)}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            <Box sx={{ paddingLeft: 12, paddingTop: 3 }}>
                <CandidateList candidates={stage.candidates}/>
            </Box>
        </div>
    );
}