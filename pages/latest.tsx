import Head from 'next/head';

import Nav from '@/components/nav';
import Container from '@/components/container';
import Skeleton from 'react-loading-skeleton';

import Videos from '@/components/videos';
import { useVideos } from '@/lib/swr-hooks';

export default function LatestPage() {
    const { videos, isLoading } = useVideos();

    if (isLoading) {
        return (
            <Container>
                <Head>
                    <title>Latest Videos</title>
                </Head>
                <Nav />
                <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                    Videos
                </h1>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
            </Container>
        );
    }

    return (
        <Container>
            <Head>
                <title>Latest Videos</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Videos
            </h1>
            <Videos videos={videos} contrastColor="white" />
        </Container>
    );
}
