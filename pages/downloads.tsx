import Head from 'next/head';
import { useRouter } from 'next/router';

import Nav from '@/components/nav';
import Container from '@/components/container';
import Videos from '@/components/videos';
import { getDownloads } from '@/api/get-downloads';
import Wrap from '@/components/wrap';

export default function DownloadsPage({ data }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    console.log(data);
    return (
        <Wrap>
            <Container>
                <Head>
                    <title>Downloads</title>
                </Head>
                <Nav />
                <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                    Downloads
                </h1>
                {data && data.videos && data.videos.length ? (
                    <Videos videos={data.videos} contrastColor="black" />
                ) : (
                    <p className="text-center">No videos downloaded yet</p>
                )}
            </Container>
        </Wrap>
    );
}

export async function getStaticProps() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const data = await getDownloads();
    // console.log(data);
    // const data = await JSON.parse(res);

    // Pass post data to the page via props
    return {
        props: { data },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1
    };
}
