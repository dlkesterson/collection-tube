import Head from 'next/head';

import { getVideo } from '@/api/get-video';
import Container from '@/components/container';
import Nav from '@/components/nav';

export default function ViewVideoPage({ data }) {
    console.log(data);

    if (data) {
        return (
            <div>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <Nav title="View" />
                <Container>
                    <h1 className="font-bold text-3xl my-2">{data.title}</h1>
                    <p>url: {data.video_url}</p>
                    <p>id: {data.id}</p>
                    <p>duration: {data.duration}</p>
                    <p>
                        thumbnail: <img src={data.thumbnail} />
                    </p>
                    {data.colors && <p>colors: {data.colors}</p>}
                    {data.video_id && (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`https://www.youtube.com/embed/${data.video_id}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </Container>
            </div>
        );
    } else {
        return (
            <>
                <Nav title="View" />
                <Container>
                    <h1 className="font-bold text-3xl my-2">...</h1>
                    <p>...</p>
                    <p>...</p>
                </Container>
            </>
        );
    }
}
export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await getVideo(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));

    // Pass data to the page via props
    return { props: { data } };
}
