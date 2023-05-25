import * as React from 'react';
import {FC} from "react";
import {useParams} from "react-router-dom";

export const Candidate: FC = () => {
    const { id } = useParams<{id: string}>();

    return (
        <div>
            <div>ID: {id}</div>
            <div>ФИО: Штанников Евгений Павлович</div>
        </div>
    );
}