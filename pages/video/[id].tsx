import { Fragment } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
// import { useState } from 'react';
import getContrast from '@/lib/getContrast';
import { getVideo } from '@/api/get-video';
import Wrap from '@/components/wrap';
// import Container from '@/components/container';
import Nav from '@/components/nav';
import DownloadVideoForm from '@/components/download-video-form';
import VideoPlayer from '@/components/video-player';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useVideos } from '@/lib/swr-hooks';
import { getAllVideoPaths } from '@/api/get-videos';

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
    const colorPrimary = data.colors ? data.colors.split(',')[0] : '#fff';
    const color_d = colord(colorPrimary);
    const colorContrast = `text-${getContrast(colorPrimary)}`
    const colorSecondaryHarmonics = color_d.harmonies('triadic');
    const bgGradient = `linear-gradient(125deg, ${colorSecondaryHarmonics[1].toRgbString()} 0%, ${colorSecondaryHarmonics[0].toRgbString()} 50%, ${colorSecondaryHarmonics[2].toRgbString()} 100%)`;
    const styleBorders = `border-2 border-opacity-50 border-white`;
    const styleColorDots = `rounded-full h-8 w-8 ${styleBorders} m-2 flex`;
    const videoDescription = data.description.split("\n").map((value, index) => {
        console.log('val: ' + value);
        return (
            <Fragment key={index}>
                {value}
                <br />
            </Fragment>
        )
    });

    return (<>
        <Wrap inlineStyle={{ backgroundColor: colorPrimary }}>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Nav textColor={`${getContrast(colorPrimary)}`} className={`${colorContrast}`} />
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
        <Wrap inlineStyle={{ backgroundImage: bgGradient }}>
            <section className="video-details">
                <header className="video-details__header">
                    <Link href={`/channel/${data.channel_id}`}>
                        <img
                            src={`/data/${data.channel_id}/${data.channel_id}.jpg`}
                            alt={data.channel_id}
                            className="inline-block w-16 h-16 rounded-full float-left cursor-pointer mr-4"
                        />
                    </Link>
                    <h1 className={`font-bold text-3xl ${colorContrast} my-8`}>
                        {data.title}
                    </h1>
                </header>
                <article className="video-details__content">
                    <DownloadVideoForm downloaded={data.downloaded} />
                    <p className={`my-2 prose lg:prose-xl ${colorContrast}`}
                    >
                        {videoDescription}
                    </p>
                    {data.keywords && (
                        <ul>
                        {data.keywords.map(keyword => {
                            <li>{keyword}</li>
                        })}
                        </ul>
                    )}
                </article>
                <aside className="video-details__sidebar flex flex-col">

                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            data.colors.split(',').map((color) => (
                                <p
                                    key={color}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('analogous').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('complementary').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('double-split-complementary').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('rectangle').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('split-complementary').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('tetradic').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-start flex-row-reverse">
                        {data.colors &&
                            color_d.harmonies('triadic').map((color) => (
                                <p
                                    key={color.toHex()}
                                    className={styleColorDots}
                                    style={{ backgroundColor: color.toHex() }}
                                >
                                </p>
                            ))}
                    </div>
                    {data.related && (
                        <div className="w-full">
                            {data.related.map((v) => (
                                <div key={v.id} className="py-2">
                                    <img src={v.richThumbnails.length ? v.richThumbnails[0].url : v.thumbnails[0].url} title={v.title} />
                                    <p className={`my-2 text-sm break-words ${colorContrast}`}>{v.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </aside>
            </section>
        </Wrap>
    </>);
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllVideoPaths();
    return { paths, fallback: `blocking` }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await getVideo(params.id);
    // parse/stringify for deep cloning the response
    console.log('inside getStaticProps()');
    const data = await JSON.parse(JSON.stringify(res));

    return { props: { data }, revalidate: 60 };
}
