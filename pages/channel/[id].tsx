import { useRouter } from 'next/router';
import Head from 'next/head';

import { useChannel } from '@/lib/swr-hooks';
import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Nav from '@/components/nav';

export default function ViewChannelPage({ data }) {
	console.log(data);

	const dotStyles = {
		width: '100px',
		height: '100px',
		display: 'block',
		margin: '2em',
		borderRadius: '50%',
		backgroundColor: data.color_primary,
	};

	const avatarStyles = {
		width: '100px',
		height: '100px',
		display: 'block',
		margin: '2em',
		borderRadius: '50%',
		backgroundImage: `url(${data.avatar}) 50% 50% no-repeat`,
	};

	if (data) {
		return (
			<>
				<Head>
					<title>{data.name}</title>
				</Head>
				<Nav title='View' />
				<Container>
					<h1 className='font-bold text-3xl my-2'>{data.name}</h1>
					<span style={dotStyles}></span>
					{data.description && (
						<p className='my-2'>
							<span className='font-bold text-sm'>
								Description:
							</span>
							<br />
							{data.description}
						</p>
					)}
					<p className='my-2'>
						<span className='font-bold text-sm'>avatar:</span>
						<br />
						{data.avatar}
					</p>
					<span style={avatarStyles}></span>
					<img
						src={data.avatar}
						alt={data.name}
						className='channel-avatar'
					/>
					<p className='my-2'>
						<span className='font-bold text-sm'>
							color_primary:
						</span>
						<br />
						{data.color_primary}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>color_list:</span>
						<br />
						{data.color_list}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>channel_url:</span>
						<br />
						{data.channel_url}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>yt_user_url:</span>
						<br />
						{data.yt_user_url}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>
							yt_channel_id:
						</span>
						<br />
						{data.yt_channel_id}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>shortid:</span>
						<br />
						{data.shortid}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>total_visits:</span>
						<br />
						{data.total_visits}
					</p>
					<p className='my-2'>
						<span className='font-bold text-sm'>total_items:</span>
						<br />
						{data.total_items}
					</p>
					<p className='my-2'>
						<a href={data.channel_url} target='_blank'>
							{data.channel_url}
						</a>
					</p>
				</Container>
			</>
		);
	} else {
		return (
			<>
				<Nav title='View' />
				<Container>
					<h1 className='font-bold text-3xl my-2'>...</h1>
					<p>...</p>
					<p>...</p>
				</Container>
			</>
		);
	}
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	const res = await getChannel(context.params.id);
	const data = await JSON.parse(JSON.stringify(res));

	// Pass data to the page via props
	return { props: { data } };
}
