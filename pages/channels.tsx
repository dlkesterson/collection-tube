import Head from 'next/head';

import Nav from '@/components/nav';
import Container from '@/components/container';
import Skeleton from 'react-loading-skeleton';

import Channels from '@/components/channels';
import { useChannels } from '@/lib/swr-hooks';

export default function ChannelsPage() {
	const { channels, isLoading } = useChannels();

	if (isLoading) {
		return (
			<Container>
				<Head>
					<title>Channels</title>
				</Head>
				<Nav />
				<Skeleton circle={true} height={50} width={50} />
				<Skeleton width={180} height={24} />
				<Skeleton height={48} />
				<div className='my-4' />
				<Skeleton circle={true} height={50} width={50} />
				<Skeleton width={180} height={24} />
				<Skeleton height={48} />
			</Container>
		);
	}

	return (
		<Container>
			<Head>
				<title>Channels</title>
			</Head>
			<Nav />
			<h1 className='text-3xl border-b border-gray-300 py-4 my-6'>
				Channels
			</h1>
			<Channels channels={channels} />
		</Container>
	);
}
