import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, ServerError} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import React, {FC, ReactNode} from "react";

interface ProviderProps {
    children: ReactNode;
}

export const GraphQLClientProvider: FC<ProviderProps> = ({ children }) => {
    const [isAuthExpired, setIsAuthExpired] = React.useState(false);

    const forceToLoginPage = () => window.location.reload();

    const apolloClient = new ApolloClient({
        uri: '/graphql',
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'cache-first',
            },
            mutate: {
                fetchPolicy: 'no-cache',
            },
        },
        link: ApolloLink.from([
            onError(({ networkError }) => {
                const serverError = networkError as ServerError;
                if (serverError && serverError.statusCode === 401)
                    setIsAuthExpired(true);
            }),
            new HttpLink({uri: '/graphql'})])
    });   

    if (isAuthExpired)
        forceToLoginPage();

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}