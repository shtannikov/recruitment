import {ApolloClient, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'none',
        },
        mutate: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});