import '../styles/globals.scss';
import type { AppProps } from "next/app";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeComplete', () => {
            const event = new Event('nextjs-loaded');
            document.dispatchEvent(event);
        });
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                <link rel="manifest" href="/site.webmanifest" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                    key="meta_viewport"
                />
            </Head>
            <div>
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}
