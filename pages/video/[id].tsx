import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import getContrast from '@/lib/getContrast';
import { getVideo } from '@/api/get-video';
import Wrap from '@/components/wrap';
// import Container from '@/components/container';
import Nav from '@/components/nav';
import DownloadVideoForm from '@/components/download-video-form';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllVideoPaths } from '@/api/get-videos';
import VideoColors from '@/components/video-colors';
import VideoRelated from '@/components/video-related';
import VideoPlayerArea from '@/components/video-player-area';

extend([harmoniesPlugin]);

export default function ViewVideoPage({ data }) {
    if (data.related) {
        console.log('this page has related videos, count is: ' + data.related.length);
    }
    const colorPrimary = data.colors ? data.colors.split(',')[0] : '#fff';
    const color_d = colord(colorPrimary);
    const colorContrast = `text-${getContrast(colorPrimary)}`
    const colorSecondaryHarmonics = color_d.harmonies('triadic');
    const bgGradient = 'linear-gradient(125deg, ' +
        colorSecondaryHarmonics[1].toRgbString() + ' 0%, ' + 
        colorSecondaryHarmonics[0].toRgbString() + ' 50%, ' + 
        colorSecondaryHarmonics[2].toRgbString() + ' 100%)';

    const videoDescription = data.description.split("\n").map((value, index) => {
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
                <VideoPlayerArea downloaded={data.downloaded} channel_id={data.channel_id} video_id={data.video_id} />
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
                    <VideoColors colors={data.colors} mainColor={color_d} />
                    {data.related && <VideoRelated related={data.related} colorContrast={colorContrast}/>}
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
