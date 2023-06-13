import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ResumeTab(props: TabProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ResumePanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    const accessibilityProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="LinkedIn CV" {...accessibilityProps(0)} />
          <Tab label="PDF CV" {...accessibilityProps(1)} />
        </Tabs>
      </Box>
      <ResumeTab value={value} index={0}>
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
      <ResumeTab value={value} index={1}>
        <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="800px" height="600px">
            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
        </object>
      </ResumeTab>
    </Box>
  );
}
