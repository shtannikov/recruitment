import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, ServerError} from "@apollo/client";
import React, {FC, ReactNode} from "react";
import {onError} from "@apollo/client/link/error";

interface ProviderProps {
    children: ReactNode;
}

export const GraphQLClientProvider: FC<ProviderProps> = ({ children }) => {
    const [isAuthExpired, setIsAuthExpired] = React.useState(false);
    const forceFallbackToLoginPage = () => window.location.reload();

    const apolloClient = new ApolloClient({
        uri: '/graphql',
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only',
            },
            mutate: {
                fetchPolicy: 'no-cache',
            },
            watchQuery: {
                fetchPolicy: 'no-cache',
            }
        },
        link: ApolloLink.from([
            onError(({ networkError }) => {
                const serverError = networkError as ServerError;
                if (serverError && serverError.statusCode === 401)
                    setIsAuthExpired(true);
            }),
            new HttpLink({uri: '/graphql' })])
    });
    
    if (isAuthExpired)
        forceFallbackToLoginPage();

    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}