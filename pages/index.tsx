import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import Skeleton from 'react-loading-skeleton';

import Nav from '@/components/nav';
import Wrap from '@/components/wrap';
import Container from '@/components/container';
import Subscriptions from '@/components/subscriptions';
import { useSubscriptions } from '@/lib/swr-hooks';

export default function Home() {
    const { subscriptions, isLoading } = useSubscriptions();
    return (
        <Wrap>
            <Container>
                <Head>
                    <title>offline.tube</title>
                </Head>
                <Nav />
                <h1 className="block mt-6 mx-auto p-4 text-center text-4xl text-black_coffee font-extrabold uppercase tracking-tight">
                    offline.tube
                </h1>
                <p className="text-center text-lg italic text-black_coffee">
                    A place to automatically download the latest videos from
                    your favorite subscriptions
                </p>
                {isLoading ? (
                    <Skeleton width={180} height={24} />
                ) : (
                    <Subscriptions subscriptions={subscriptions} />
                )}
            </Container>
        </Wrap>
    );
}
