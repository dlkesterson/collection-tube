import styles from '../styles/Home.module.css';

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
			<Nav title='Channels' />
			<Channels channels={channels} />
		</Container>
	);
}
