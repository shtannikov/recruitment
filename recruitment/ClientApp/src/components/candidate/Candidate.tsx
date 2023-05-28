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
        email
        mobilePhone
        
        currentStage {
          name
          funnel {
            vacancy {
              name
            }
          }
        }
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
                    <ListItemText primary={`${candidate?.firstName} ${candidate?.middleName} ${candidate?.lastName}`}>
                    </ListItemText>
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                 <CandidateStage 
                     stage={candidate?.currentStage.name}
                     vacancy={candidate?.currentStage.funnel.vacancy.name}
                     nextStages={["Найм", "Отказ"]} />
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