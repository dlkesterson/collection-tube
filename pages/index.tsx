import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Skeleton from 'react-loading-skeleton';

import Nav from '@/components/nav';
import Container from '@/components/container';

export default function Home() {
	return (
		<Container>
			<Head>
				<title>YT-DVR</title>
			</Head>
			<Nav />
			<h1 className='block mt-6 mx-auto p-4 text-center text-4xl text-black_coffee font-extrabold uppercase tracking-tight'>
				YT-DVR
			</h1>
			<p className='text-center text-lg italic text-black_coffee'>
				A place to automatically download the latest videos from your
				favorite channels
			</p>
		</Container>
	);
}
