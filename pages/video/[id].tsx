import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import { useState } from 'react';
import getContrast from '@/lib/getContrast';
import { getVideo } from '@/api/get-video';
import Wrap from '@/components/wrap';
import Container from '@/components/container';
import Nav from '@/components/nav';
import DownloadVideoForm from '@/components/download-video-form';
import VideoPlayer from '@/components/video-player';

extend([harmoniesPlugin]);

export default function ViewVideoPage({ data }) {
    // const router = useRouter();
    // const video = getVideo(router.query.id);
    // const [isLoading, setIsLoading] = useState(!Boolean(data||video));
    // if (!isLoading) {
        if (data.related) {
            console.log('found related videos!');
            console.log(data.related);
        }
        // console.log(data);
        const colorPrimary = data.colors ? data.colors.split(',')[0] : '#fff';
        const colorSecondary = data.colors ? data.colors.split(',')[1] : '#bbb';
        const color_d_primary = colord(colorPrimary);
        const colorPrimaryContrast = `text-${getContrast(colorPrimary)}`;
        const colorSecondaryContrast = `text-${getContrast(colorSecondary)}`;
        return (<>
            <Wrap inlineStyle={{ backgroundColor: colorPrimary }}>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <Nav textColor={`${getContrast(colorPrimary)}`} className={`${colorPrimaryContrast}`} />
            </Wrap>
            <div className="flex flex-grow flex-col flex-nowrap justify-start items-center overflow-auto px-20 bg-black">
                <div className="w-full flex flex-col flex-nowrap space-x-8 z-10">
                    <article className="bg-gray-900 flex-grow z-10">
                            <div className="aspect-w-16 aspect-h-9">
                                {data.downloaded ? (
                                    <VideoPlayer
                                        options={{
                                            controls: true,
                                            responsive: true,
                                            fluid: true,
                                            sources: [
                                                {
                                                    src: `/data/${data.channel_id}/${data.video_id}.mp4`,
                                                    type: 'video/mp4'
                                                }
                                            ]
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${data.video_id}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                    </article>
                </div>
            </div>
            <Wrap inlineStyle={{ backgroundColor: colorSecondary }}>
                <Container className="flex-col w-full px-2 py-2">
                        <h1 className={`font-bold text-3xl ${colorSecondaryContrast} my-8`}>
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
                            </Link>{' '}
                            {data.title}
                        </h1>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>originals:</h3>
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
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>analogous:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('analogous').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>complementary:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('complementary').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>double-split-complementary:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('double-split-complementary').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>rectangle:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('rectangle').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>split-complementary:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('split-complementary').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>tetradic:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('tetradic').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>
                        <h3 className={`font-bold text-xl ${colorSecondaryContrast} my-4`}>triadic:</h3>
                        <div className="flex flex-wrap">
                            {data.colors &&
                                color_d_primary.harmonies('triadic').map((color) => (
                                    <p
                                        key={color.toHex()}
                                        className={`rounded-full h-16 w-16 text-sm px-4 m-2 flex items-center justify-center shadow text-${getContrast(
                                            color.toHex()
                                        )}`}
                                        style={{ backgroundColor: color.toHex() }}
                                    >
                                        {color.toHex()}
                                    </p>
                                ))}
                        </div>

                        {data.description && (
                            <p
                                className={`my-2 text-sm break-words ${colorSecondaryContrast}`}
                            >
                                {data.description}
                            </p>
                        )}

                        <DownloadVideoForm downloaded={data.downloaded} />
                        
                        {data.related && (
                            data.related.map((related) => {
                                return <p>{related.title}</p>
                            })
                        )}
                    </Container>
            </Wrap>
        </>);
    // } else {
    //     return (
    //         <Wrap>
    //             <Nav />
    //             <h1 className="font-bold text-3xl my-2">...</h1>
    //             <p>...</p>
    //             <p>...</p>
    //         </Wrap>
    //     );
    // }
}
export async function getServerSideProps(context) {
    // Fetch data from external API
    console.log('using id: ' + context.params.id);
    const res = await getVideo(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));

    // Pass data to the page via props
    return { props: { data } };
}
