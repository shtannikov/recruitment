import * as React from 'react';
import {FC} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ResumeTab} from "./ResumeTab";

export const ResumeList: FC = () => {
    const [openedResumeIndex, setOpenedResumeIndex] = React.useState(0);

    const openResume = (event: React.SyntheticEvent, newValue: any) => {
        setOpenedResumeIndex(newValue);
    };

    const isResumeHidden = (resumeIndex: number) => {
        return openedResumeIndex !== resumeIndex;
    };

    const accessibilityProps = (index: number) => {
        return {
            id: `resume-tab-${index}`,
            'aria-controls': `resume-tabpanel-${index}`,
        };
    }

    return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={openedResumeIndex} onChange={openResume} aria-label="basic tabs example">
          <Tab label="LinkedIn CV" {...accessibilityProps(0)} />
          <Tab label="PDF CV" {...accessibilityProps(1)} />
        </Tabs>
      </Box>
      <ResumeTab index={0} hidden={isResumeHidden}>
          <Typography variant="h6" gutterBottom>
              Fullstack developer
          </Typography>
          <Typography variant="body2" gutterBottom>
              Employment: full-time, part-time, project-based work.
          </Typography>
          <Typography variant="body2" gutterBottom>
              Work schedule: full day, flexible schedule, remote work.
          </Typography>
          <Typography variant="body2" gutterBottom>
              Desired commute time: doesn't matter.
          </Typography>
      </ResumeTab>
      <ResumeTab index={1} hidden={isResumeHidden}>
        <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="800px" height="600px">
            <p><a href="http://africau.edu/images/default/sample.pdf">Open PDF file</a></p>
        </object>
      </ResumeTab>
    </Box>
    );
}
