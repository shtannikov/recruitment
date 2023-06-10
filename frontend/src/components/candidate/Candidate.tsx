import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Paper
} from '@mui/material';
import {FC, useEffect} from "react";
import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useLazyQuery } from "@apollo/client";
import ResumePanel from './ResumePanel';
import {usePageContext} from "../../utils/usePageContext";
import {UserRole} from "../../__generated__/graphql";
import {ChangeFunnelStageDialog} from "./ChangeFunnelStageDialog";
import {useUserContext} from "../../utils/UserContext";
import {FeedbackList} from "./FeedbackList";
import * as React from "react";

const GET_CANDIDATE = gql(`
    query GetCandidate($id: Int!) {
      candidate(id: $id) {
        firstName
        middleName
        lastName
        
        currentStage {
          name
          order
          funnel {
            vacancy {
              name
            }
            stages {
              id
              name
              order
            }
          }
        }
       
        feedbacks {
          id
          text
          author {
            personalName
          }
          funnelStage {
            name
          }
          creationDateTimeUtc
        }
      }
    }
`);

export const Candidate: FC = () => {
  const pageContext = usePageContext();
  useEffect(() => {
    pageContext.setTitle("Анкета кандидата");
  }, [pageContext]);

  const { id } = useParams<{ id: string }>();
  const candidateId = Number(id);

  const [getCandidate, { data: candidateData }] = useLazyQuery(
     GET_CANDIDATE,
     { variables: { id: candidateId } }
  );

   useEffect( () => {
     getCandidate().catch(console.error);
   }, [getCandidate]);

  const { isLoading: isUserLoading, userRole } = useUserContext();

  const candidate = candidateData?.candidate;

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
                <List>
                  <ListItem>
                    <ListItemText 
                        primary={candidate?.currentStage.funnel.vacancy.name}
                        secondary={candidate?.currentStage.name} />
                    {
                      !isUserLoading 
                        && userRole !== UserRole.HiringManager 
                        && candidate
                        && <ChangeFunnelStageDialog
                            candidateId={candidateId}
                            currentStage={candidate?.currentStage}
                            updateCandidate={() => getCandidate()}
                        />
                    }
                  </ListItem>
                  { 
                    candidate 
                      && candidate.feedbacks.length > 0 
                      && <FeedbackList feedbacks={candidate.feedbacks} /> 
                  }
                </List>
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