import Head from 'next/head';
import Link from 'next/link';

import getContrast from '@/lib/getContrast';
import { getVideo } from '@/api/get-video';
import Wrap from '@/components/wrap';
import Nav from '@/components/nav';
import DownloadVideoForm from '@/components/download-video-form';

export default function ViewVideoPage({ data }) {
    if (data && data.colors) {
        return (
            <Wrap>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <Nav />
                <div className="w-full flex flex-col flex-nowrap space-x-8 z-10">
                    <article className="bg-gray-900 flex-grow z-10">
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
                    </article>
                    <aside
                        className="flex-col w-full px-2 py-2"
                    >
                        <h1
                            className={`font-bold text-3xl text-black my-8`}
                        >
                            <Link href={`/channel/${data.channel_id}`}>
                            <img
                                src={`/data/${data.channel_id}/${data.channel_id}.jpg`}
                                alt={data.channel_id}
                                className="inline-block float-left cursor-pointer mr-4"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%'
                                }}
                            />
                        </Link> {data.title}
                        </h1>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                data.colors.split(',').map((color) => (
                                    <p
                                        key={color}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color
                                        )}`}
                                        style={{ backgroundColor: color }}
                                    >
                                        {color}
                                    </p>
                                ))}
                        </div>

                        {data.description && (
                            <p
                                className={`my-2 text-sm break-words text-gray-500`}>
                                {data.description}
                            </p>
                        )}

				        <DownloadVideoForm downloaded={data.downloaded} />
                    </aside>
                </div>
            </Wrap>
        );
    } else {
        return (
            <Wrap>
                <Nav />
                <h1 className="font-bold text-3xl my-2">...</h1>
                <p>...</p>
                <p>...</p>
            </Wrap>
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
