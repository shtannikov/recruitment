import React, {FC} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/authorization/AuthorizeRoute';
import { Layout } from './components/layout/Layout';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./utils/apolloClient";

export const App: FC = () => {
    return (
      <ApolloProvider client={apolloClient}>
          <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, requireAuth, ...rest } = route;
                return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
              })}
            </Routes>
          </Layout>
      </ApolloProvider>
    );
}
