import {gql} from "../__generated__";
import {useLazyQuery, useQuery} from "@apollo/client";

const GET_VACANCIES = gql(`
    query GetVacancies {
      vacancies {
        id,
        name,
        recruitemtFunnelId
      }
    }
`);

export function useVacanciesQuery() {
    return useQuery(
        GET_VACANCIES
    ); 
}

export function useLazyVacanciesQuery() {
    return useLazyQuery(
        GET_VACANCIES
    );
}