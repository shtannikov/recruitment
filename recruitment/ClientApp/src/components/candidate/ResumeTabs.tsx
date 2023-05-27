import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ResumeTab(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Резюме pdf" {...a11yProps(0)} />
          <Tab label="Резюме hh" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <ResumeTab value={value} index={0}>
      <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="800px" height="600px">
      <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
  </object>
      </ResumeTab>
      <ResumeTab value={value} index={1}>
      .net developer
Специализации:    
—    Программист, разработчик

Занятость: полная занятость, частичная занятость, проектная работа
График работы: полный день, гибкий график, удаленная работа

Желательное время в пути до работы: не имеет значения

      </ResumeTab>
    </Box>
  );
}