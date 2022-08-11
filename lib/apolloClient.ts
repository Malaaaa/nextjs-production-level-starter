import { useMemo } from 'react';
import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    NormalizedCacheObject,
    InMemoryCache,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = process.env.NEXT_PUBLIC_JWT_AUTHENTICATION_TOKEN;

    if (!token) {
        return forward(operation);
    }

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // set to true for SSR
        link: authLink.concat(
            new HttpLink({
                uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
            }),
        ),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = {}) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState: {}): ApolloClient<NormalizedCacheObject> {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
