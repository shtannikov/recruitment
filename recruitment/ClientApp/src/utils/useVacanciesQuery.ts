import {gql} from "../__generated__";
import {useLazyQuery, useQuery} from "@apollo/client";

const GET_ACTIVE_VACANCIES = gql(`
    query GetActiveVacancies {
        activeVacancies {
            id,
            name,
            recruitemtFunnelId,
        }
    }
`);

export function useVacanciesQuery() {
    return useQuery(
        GET_ACTIVE_VACANCIES
    ); 
}

export function useLazyVacanciesQuery() {
    return useLazyQuery(
        GET_ACTIVE_VACANCIES
    );
}