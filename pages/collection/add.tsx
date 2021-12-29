import Head from 'next/head';
import Nav from '@/components/nav';
import Container from '@/components/container';
import CollectionForm from '@/components/collection-form';

export default function NewCollectionPage() {
    return (
        <Container>
            <Head>
                <title>Add New Collection</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Add New Collection
            </h1>
            <CollectionForm />
        </Container>
    );
}
