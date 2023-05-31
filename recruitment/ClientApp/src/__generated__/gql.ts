/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetCandidate($id: Int!) {\n      candidate(id: $id) {\n        firstName\n        middleName\n        lastName\n        city\n        email\n        mobilePhone\n        \n        currentStage {\n          name\n          order\n          funnel {\n            vacancy {\n              name\n            }\n            stages {\n              id\n              name\n              order\n            }\n          }\n        }\n       \n        feedbacks {\n          id\n          text\n          author {\n            personalName\n          }\n          funnelStage {\n            name\n          }\n          creationDateTimeUtc\n        }\n      }\n    }\n": types.GetCandidateDocument,
    "\n    mutation MoveToNextStage($candidateId: Int!, $nextStageId: Int!, $motivation: String!) {\n      candidates {\n        moveToNextFunnelStage(\n            candidateId: $candidateId,\n            nextStageId: $nextStageId,\n            motivation: $motivation\n          ) \n        {\n          succeeded\n          validationErrors\n        }\n      }\n    }\n": types.MoveToNextStageDocument,
    "\n    query GetFunnel($id: Int!) {\n      recruitmentFunnel(id: $id) {\n        vacancy {\n            name\n        }\n        stages {\n          id,\n          name,\n          candidates {\n            id,\n            firstName\n            middleName\n            lastName\n            elapsedDaysInCurrentStage\n          }\n        }\n      }\n    }\n": types.GetFunnelDocument,
    "\n    query GetUserRole {\n      userSettings {\n        userRole\n      }\n    }\n": types.GetUserRoleDocument,
    "\n    query GetActiveVacancies {\n        activeVacancies {\n            id,\n            name,\n            recruitemtFunnelId,\n        }\n    }\n": types.GetActiveVacanciesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCandidate($id: Int!) {\n      candidate(id: $id) {\n        firstName\n        middleName\n        lastName\n        city\n        email\n        mobilePhone\n        \n        currentStage {\n          name\n          order\n          funnel {\n            vacancy {\n              name\n            }\n            stages {\n              id\n              name\n              order\n            }\n          }\n        }\n       \n        feedbacks {\n          id\n          text\n          author {\n            personalName\n          }\n          funnelStage {\n            name\n          }\n          creationDateTimeUtc\n        }\n      }\n    }\n"): (typeof documents)["\n    query GetCandidate($id: Int!) {\n      candidate(id: $id) {\n        firstName\n        middleName\n        lastName\n        city\n        email\n        mobilePhone\n        \n        currentStage {\n          name\n          order\n          funnel {\n            vacancy {\n              name\n            }\n            stages {\n              id\n              name\n              order\n            }\n          }\n        }\n       \n        feedbacks {\n          id\n          text\n          author {\n            personalName\n          }\n          funnelStage {\n            name\n          }\n          creationDateTimeUtc\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation MoveToNextStage($candidateId: Int!, $nextStageId: Int!, $motivation: String!) {\n      candidates {\n        moveToNextFunnelStage(\n            candidateId: $candidateId,\n            nextStageId: $nextStageId,\n            motivation: $motivation\n          ) \n        {\n          succeeded\n          validationErrors\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation MoveToNextStage($candidateId: Int!, $nextStageId: Int!, $motivation: String!) {\n      candidates {\n        moveToNextFunnelStage(\n            candidateId: $candidateId,\n            nextStageId: $nextStageId,\n            motivation: $motivation\n          ) \n        {\n          succeeded\n          validationErrors\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetFunnel($id: Int!) {\n      recruitmentFunnel(id: $id) {\n        vacancy {\n            name\n        }\n        stages {\n          id,\n          name,\n          candidates {\n            id,\n            firstName\n            middleName\n            lastName\n            elapsedDaysInCurrentStage\n          }\n        }\n      }\n    }\n"): (typeof documents)["\n    query GetFunnel($id: Int!) {\n      recruitmentFunnel(id: $id) {\n        vacancy {\n            name\n        }\n        stages {\n          id,\n          name,\n          candidates {\n            id,\n            firstName\n            middleName\n            lastName\n            elapsedDaysInCurrentStage\n          }\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUserRole {\n      userSettings {\n        userRole\n      }\n    }\n"): (typeof documents)["\n    query GetUserRole {\n      userSettings {\n        userRole\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetActiveVacancies {\n        activeVacancies {\n            id,\n            name,\n            recruitemtFunnelId,\n        }\n    }\n"): (typeof documents)["\n    query GetActiveVacancies {\n        activeVacancies {\n            id,\n            name,\n            recruitemtFunnelId,\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;