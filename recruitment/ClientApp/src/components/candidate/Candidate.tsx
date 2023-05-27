import { Avatar, ListItem, ListItemAvatar, ListItemText, List, TableContainer, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import { FC } from "react";
import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { FunnelForCandidate } from './FunnelForCandidate';
import ResumeTab from './ResumeTabs';
import OtherVacancies from './OtherVacancies';

const GET_CANDIDATE = gql(`
    query GetCandidate($id: Int!) {
      candidate(id: $id) {
        firstName
        middleName
        lastName
        elapsedDaysInCurrentStage
      }
    }
`);

export const Candidate: FC = () => {
  const { id } = useParams<{ id: string }>();


  const { loading, data } = useQuery(
    GET_CANDIDATE,
    { variables: { id: Number(id) } }
  );

  const candidate = data?.candidate;

  var rows = [
    createData('Скриннинг', "25.04.2023", "Катя(ссылка)", "надо брать"),
    createData('Тех собес', "29.04.2023", "Иван(ссылка)", "плохо ответил по алгоритмам"),
  ];

  function createData(
    name: string,
    date: string,
    who: string,
    comment: string,
  ) {
    return { name, date, who, comment };
  }

  return (
    <List sx={{ width: '100%', minWidth: 400, maxWidth: 700, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar sx={{ pr: 4 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </ListItemAvatar>
        <ListItemText primary="Штанников Евгений Павлович" />
        <ListItemText secondary="телефон: +79859801993" />
        <ListItemText secondary="почта: mail@google.com" />
        <ListItemText secondary="город: Москва" />
      </ListItem>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <FunnelForCandidate rows={rows} funnelName='Техническое собеседование' vacanceName='Разработчик backend' nextFunnelStages={["Найм", "Отказ"]} ></FunnelForCandidate>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <OtherVacancies>
                  <FunnelForCandidate rows={rows} funnelName='Отказали' vacanceName='Разработчик frontend (архив)' nextFunnelStages={["Технический директор", "Отказ"]} disableNextStages={true}></FunnelForCandidate>
                </OtherVacancies>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ResumeTab />
    </List>
  );
}