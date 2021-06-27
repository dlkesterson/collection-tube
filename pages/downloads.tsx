import Head from 'next/head';

import Nav from '@/components/nav';
import Container from '@/components/container';

export default function DownloadsPage() {
    return (
        <Container>
            <Head>
                <title>Downloads</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Downloads
            </h1>
        </Container>
    );
}
