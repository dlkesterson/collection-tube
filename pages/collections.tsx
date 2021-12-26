import Container from '@/components/container';
import Wrap from '@/components/wrap';

import Head from 'next/head';

import Nav from '@/components/nav';
import Skeleton from 'react-loading-skeleton';
import ButtonLink from '@/components/button-link';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Collections from '@/components/collections';
import { useCollections } from '@/lib/swr-hooks';

export default function CollectionsPage() {
    const { collections, isLoading } = useCollections();

    if (isLoading) {
        return (
            <Wrap>
                <Container>
                    <Head>
                        <title>Collections</title>
                    </Head>
                    <Nav />
                    <h1 className="text-3xl my-6">Collections</h1>
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton width={180} height={24} />
                    <Skeleton height={48} />
                    <div className="my-4" />
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton width={180} height={24} />
                    <Skeleton height={48} />
                </Container>
            </Wrap>
        );
    }

    return (
        <Wrap>
            <Container>
                <Head>
                    <title>Collections</title>
                </Head>
                <Nav />
                <div className="w-full flex p-4 flex-column flex-nowrap space-y-4 z-10">
                    <motion.h1 layoutId="pageTitle" className="flex-grow text-3xl border-b border-gray-300 py-4 my-6">
                        Collections{' '}
                        {collections && collections.length > 1
                            ? `(${collections.length})`
                            : undefined}
                    </motion.h1>
                    <ButtonLink
                        className="self-center ml-4 my-4"
                        href="/collections/add"
                    >
                        <FiPlus className="text-white text-xl inline mr-2" />
                        Add Collection
                    </ButtonLink>
                </div>

                <Collections collections={collections} />
            </Container>
        </Wrap>
    );
}
