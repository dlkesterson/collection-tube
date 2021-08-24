import Head from 'next/head';
import Nav from '@/components/nav';
import Wrap from '@/components/wrap';
import Container from '@/components/container';
import SettingsForm from '@/components/settings-form';

export default function SettingsPage() {
    return (
        <Wrap>
        <Container>
            <Head>
                <title>Settings</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Settings
            </h1>
            <SettingsForm/>
        </Container>
        </Wrap>
    );
}
