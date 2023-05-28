import { Avatar, ListItem, ListItemAvatar, ListItemText, List, TableContainer, Table, TableCell, TableBody, TableRow, Paper } from '@mui/material';
import {FC, useEffect} from "react";
import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { CandidateStage } from './CandidateStage';
import ResumePanel from './ResumePanel';
import {usePageContext} from "../../utils/usePageContext";

const GET_CANDIDATE = gql(`
    query GetCandidate($id: Int!) {
      candidate(id: $id) {
        firstName
        middleName
        lastName
        city
        contacts {
          id
          value
          type
          candidateId
        }
        elapsedDaysInCurrentStage
      }
    }
`);

export const Candidate: FC = () => {
  const pageContext = usePageContext();
  useEffect(() => {
    pageContext.setTitle("Анкета кандидата");
  }, []);

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <List sx={{ width: '100%', minWidth: 400, maxWidth: 700, bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListItemAvatar sx={{ pr: 4 }}>
                      <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 100, height: 100 }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={`${candidate?.firstName} ${candidate?.middleName} ${candidate?.lastName}`} />
                      { candidate?.contacts 
                          && candidate?.contacts.map((contact) => (
                            <ListItemText secondary={`${contact.type}: ${contact.value}`}/>
                          ))
                      }
                    { candidate?.city && (<ListItemText secondary={`Город: ${candidate?.city}`} />)}
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                 <CandidateStage rows={rows} funnelName='Ждём выхода' vacanceName='Разработчик Backend' nextFunnelStages={["Найм", "Отказ"]} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <ResumePanel />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
}