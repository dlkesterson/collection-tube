import Head from 'next/head';

import Nav from '@/components/nav';
import Container from '@/components/container';
import ChannelForm from '@/components/channel-form';

export default function NewChannelPage() {
    return (
        <Container>
            <Head>
                <title>Add New Channel</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Add New Channel
            </h1>
            <ChannelForm />
        </Container>
    );
}
