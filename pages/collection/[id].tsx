import Head from 'next/head';
import { useCollection } from '@/lib/swr-hooks';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Nav from '@/components/nav';

export default function ViewCollectionPage({ collection }: { collection: { id?: string; name?: string; } }) {
    if (collection) {
        console.log(collection);
        return (
            <Wrap>
                <Head>
                    <title>{collection.name}</title>
                </Head>
                <Nav />
                <h1 className="font-bold text-3xl text-center my-8">
                    {collection.name}
                </h1>
            </Wrap>
        );
    } else {
        return (
            <>
                <Nav />
                <Container>
                    <h1 className="font-bold text-3xl my-2">...</h1>
                    <p>...</p>
                    <p>...</p>
                </Container>
            </>
        );
    }
}
export async function getServerSideProps(context: any) {
    // Fetch data from external API
    const res = await useCollection(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));
    if (data.error) {
        console.log(data.error);
    }
    const { collection } = data;

    // Pass data to the page via props
    return { props: { collection } };
}
