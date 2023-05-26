import * as React from 'react';
import {FC} from "react";
import {useParams} from "react-router-dom";
import {gql} from "../../__generated__";
import {useQuery} from "@apollo/client";

const GET_BOOK = gql(`
    query GetBook {
      book {
        title
        author {
          name
        }
      }
    }
`);

export const Candidate: FC = () => {
    const { id } = useParams<{id: string}>();

    const { loading, data } = useQuery(
        GET_BOOK
    );

    return (
        <div>
            <div>ID: {id}</div>
            <div>ФИО: Штанников Евгений Павлович</div>
            { loading
                ? (<div>Loading...</div>)
                : ( <>
                        <div> Title: {data?.book.title}</div>
                        <div> Author: {data?.book.author.name}</div>
                    </>)
            }
        </div>
    );
}