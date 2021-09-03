import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '@/components/nav';
import Container from '@/components/container';
import Videos from '@/components/videos';
import { useDownloads } from '@/lib/swr-hooks';
import Wrap from '@/components/wrap';
import Skeleton from 'react-loading-skeleton';

export default function DownloadsPage() {
    const router = useRouter();
    const { videos, isLoading } = useDownloads();

    if (router.isFallback || isLoading) {
        return (
            <Wrap>
                <Container>
                    <Head>
                        <title>Downloads</title>
                    </Head>
                    <Nav />
                    <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                        Downloads
                    </h1>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-nowrap h-full">
                            <div className="relative flex-none shadow hover:shadow-md">
                                <Skeleton height={195} width={350} />
                            </div>
                            <div className="flex-grow p-2">
                                <Skeleton
                                    circle={true}
                                    height={50}
                                    width={50}
                                />
                                <Skeleton
                                    className="ml-4"
                                    width={180}
                                    height={30}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </Wrap>
        );
    }

    return (
        <Wrap>
            <Container>
                <Head>
                    <title>Downloads</title>
                </Head>
                <Nav />
                <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                    Downloads
                </h1>
                {videos && videos.length ? (
                    <Videos videos={videos} contrastColor="black" />
                ) : (
                    <p className="text-center">No videos downloaded yet</p>
                )}
            </Container>
        </Wrap>
    );
}
