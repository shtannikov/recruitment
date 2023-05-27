import React, {FC} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/layout/Layout';
import {GraphQLClientProvider} from "./utils/GraphQLClientProvider";

export const App: FC = () => {
    return (
        <GraphQLClientProvider>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) =>
                        (<Route key={index} {...route} />))}
                </Routes>
            </Layout>
        </GraphQLClientProvider>
    );
}
