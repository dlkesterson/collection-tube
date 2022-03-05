import Head from 'next/head';
// import { useCollection } from '@/lib/swr-hooks';
import { getCollection } from '@/api/get-collection';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Nav from '@/components/nav';
// import { useCollection } from '@/lib/swr-hooks';

export default function ViewCollectionPage({ collection }: { collection: { id?: string; name?: string; } }) {
    if (collection) {
        console.log(collection);
        return (
            <Wrap>
                <Head>
                    <title>#{collection.id}: {collection.name}</title>
                </Head>
                <Nav />
                <h1 className="font-bold text-3xl text-center my-8">
                    #${collection.id}: ${collection.name}
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
export async function getServerSideProps(context: { params: { id: string; }}) {
    // Fetch data from external API
    console.log('getServerSideProps() with ID ' + context.params.id);
    const res = await getCollection(context.params.id);
    console.log('serverside props request result:');
    console.log(res);
    // const data = await JSON.parse(JSON.stringify(res));
    // if (data.error) {
    //     console.log(data.error);
    // }
    const { collection } = res;

    // Pass data to the page via props
    return { props: { collection } };
}
