import * as React from "react";
import {FC} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ResumeTabProps {
    children?: React.ReactNode;
    index: number;
    hidden: (index: number) => boolean;
}

export const ResumeTab: FC<ResumeTabProps> = ({children, index, hidden}) => {
    return (
        <div
            role="tabpanel"
            hidden={hidden(index)}
            id={`resume-tabpanel-${index}`}
            aria-labelledby={`resume-tab-${index}`}
        >
            <Box sx={{p: 3}}>
                <Typography>{children}</Typography>
            </Box>
        </div>
    );
}