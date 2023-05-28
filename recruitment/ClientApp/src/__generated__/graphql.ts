/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Candidate = {
  __typename?: 'Candidate';
  city: Scalars['String']['output'];
  currentStage: FunnelStage;
  currentStageId: Scalars['Int']['output'];
  elapsedDaysInCurrentStage: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  mobilePhone: Scalars['String']['output'];
};

export type CreationResponse = {
  __typename?: 'CreationResponse';
  succeeded: Scalars['Boolean']['output'];
  validationErrors?: Maybe<Array<Scalars['String']['output']>>;
};

export type Funnel = {
  __typename?: 'Funnel';
  id: Scalars['Int']['output'];
  stages: Array<FunnelStage>;
  vacancy: Vacancy;
};

export type FunnelStage = {
  __typename?: 'FunnelStage';
  candidates: Array<Candidate>;
  funnel: Funnel;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreationResponse;
};


export type MutationCreateUserArgs = {
  newUser: UserInput;
};

export type Query = {
  __typename?: 'Query';
  activeVacancies: Array<Vacancy>;
  candidate?: Maybe<Candidate>;
  recruitmentFunnel?: Maybe<Funnel>;
  userSettings: UserSettingsQuery;
};


export type QueryCandidateArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecruitmentFunnelArgs = {
  id: Scalars['Int']['input'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};

export enum UserRole {
  HiringManager = 'HIRING_MANAGER',
  LeadRecruiter = 'LEAD_RECRUITER',
  Recruiter = 'RECRUITER'
}

export type UserSettingsQuery = {
  __typename?: 'UserSettingsQuery';
  userRole: UserRole;
};

export type Vacancy = {
  __typename?: 'Vacancy';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  recruitemtFunnel: Funnel;
  recruitemtFunnelId: Scalars['Int']['output'];
};

export type GetCandidateQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCandidateQuery = { __typename?: 'Query', candidate?: { __typename?: 'Candidate', firstName: string, middleName?: string | null, lastName: string, city: string, email: string, mobilePhone: string, currentStage: { __typename?: 'FunnelStage', name: string, funnel: { __typename?: 'Funnel', vacancy: { __typename?: 'Vacancy', name: string } } } } | null };

export type GetFunnelQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetFunnelQuery = { __typename?: 'Query', recruitmentFunnel?: { __typename?: 'Funnel', vacancy: { __typename?: 'Vacancy', name: string }, stages: Array<{ __typename?: 'FunnelStage', id: number, name: string, candidates: Array<{ __typename?: 'Candidate', id: number, firstName: string, middleName?: string | null, lastName: string, elapsedDaysInCurrentStage: number }> }> } | null };

export type GetUserRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserRoleQuery = { __typename?: 'Query', userSettings: { __typename?: 'UserSettingsQuery', userRole: UserRole } };

export type GetActiveVacanciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveVacanciesQuery = { __typename?: 'Query', activeVacancies: Array<{ __typename?: 'Vacancy', id: number, name: string, recruitemtFunnelId: number }> };


export const GetCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhone"}},{"kind":"Field","name":{"kind":"Name","value":"currentStage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"funnel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vacancy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCandidateQuery, GetCandidateQueryVariables>;
export const GetFunnelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFunnel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recruitmentFunnel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vacancy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"elapsedDaysInCurrentStage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFunnelQuery, GetFunnelQueryVariables>;
export const GetUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRole"}}]}}]}}]} as unknown as DocumentNode<GetUserRoleQuery, GetUserRoleQueryVariables>;
export const GetActiveVacanciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveVacancies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeVacancies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"recruitemtFunnelId"}}]}}]}}]} as unknown as DocumentNode<GetActiveVacanciesQuery, GetActiveVacanciesQueryVariables>;