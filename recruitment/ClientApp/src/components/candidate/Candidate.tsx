import * as React from 'react';
import {FC} from "react";
import {useParams} from "react-router-dom";
import {gql} from "../../__generated__";
import {useQuery} from "@apollo/client";

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
    const { id } = useParams<{id: string}>();

    const { loading, data } = useQuery(
        GET_CANDIDATE,
        { variables: { id: Number(id) }}
    );
    
    const candidate = data?.candidate;

    // TODO: handle scenario when candidate is not found
    // TODO: handle loading with skeleton
    return (
        <div>
            { loading
                ? (<div>Loading...</div>)
                : ( <>
                        <div>ID: {id}</div>
                        <div> ФИО: {candidate?.firstName} {candidate?.middleName} {candidate?.lastName}</div>
                    </>)
            }
        </div>
    );
}