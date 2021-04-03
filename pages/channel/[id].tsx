import { useRouter } from 'next/router';
import Head from 'next/head';

import { useChannel } from '@/lib/swr-hooks';
import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Nav from '@/components/nav';

export default function ViewChannelPage({ data }) {
	// const router = useRouter();
	// const id = router.query.id?.toString();
	// const { data } = useChannel(id);

	console.log(data);

	if (data) {
		return (
			<>
				<Head>
					<title>{data.name}</title>
				</Head>
				<Nav title='View' />
				<Container>
					<h1 className='font-bold text-3xl my-2'>{data.name}</h1>
					<p>{data.description}</p>
					<p>
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
