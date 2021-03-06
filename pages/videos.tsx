import Head from 'next/head';

import Nav from '@/components/nav';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';

import Videos from '@/components/videos';
import { useVideos } from '@/lib/swr-hooks';

export default function VideosPage() {
    const { videos, isLoading } = useVideos();

    if (isLoading) {
        return (
            <Container>
                <Head>
                    <title>Latest Videos</title>
                </Head>
                <Nav />
                <motion.h1 layoutId="pageTitle" className="text-3xl border-b border-gray-300 py-4 my-6">
                    Latest Videos
                </motion.h1>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-nowrap h-full">
                        <div className="relative flex-none shadow hover:shadow-md">
                            <Skeleton height={195} width={350} />
                        </div>
                        <div className="flex-grow p-2">
                            <Skeleton circle={true} height={50} width={50} />
                            <Skeleton className="ml-4" width={180} height={30} />
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Wrap>
        <Container>
            <Head>
                <title>Latest Videos</title>
            </Head>
            <Nav />
            <motion.h1 layoutId="pageTitle" className="text-3xl border-b border-gray-300 py-4 my-6">
                Latest Videos
            </motion.h1>
            <Videos videos={videos} contrastColor="black" />
        </Container>
        </Wrap>
    );
}
