import Head from 'next/head';
import Nav from '@/components/nav';
import Container from '@/components/container';
import SubscriptionForm from '@/components/subscription-form';

export default function NewSubscriptionPage() {
    return (
        <Container>
            <Head>
                <title>Add New Subscription</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Add New Subscription
            </h1>
            <SubscriptionForm />
        </Container>
    );
}
