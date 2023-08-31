import {FC} from "react";
import Box from "@mui/material/Box";
import {Candidate, CandidateList} from "./CandidateList";
import QA from "../../utils/QASelectorConstants";

interface Stage {
    id: number;
    candidates: Candidate[];
}

interface StageTabProps {
    index: number;
    stage: Stage;
    hidden: (index: number) => boolean;
}

export const StageTab: FC<StageTabProps> = ({ index, stage, hidden }) => {
    
    return (
        <div
            data-testid={QA.funnel.stage.panel}
            role="tabpanel"
            hidden={hidden(index)}
            id={`stage-tabpanel-${index}`}
            aria-labelledby={`stage-tab-${index}`}
        >
            <Box sx={{ paddingLeft: 12, paddingTop: 3 }}>
                <CandidateList candidates={stage.candidates}/>
            </Box>
        </div>
    );
}