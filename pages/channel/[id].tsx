import Head from 'next/head';
import { motion } from 'framer-motion';

import getContrast from '@/lib/getContrast';
import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Videos from '@/components/videos/';
import Nav from '@/components/nav';

export default function ViewChannelPage({ channel, videos }) {
    if (channel) {
        return (
            <Wrap>
                <Head>
                    <title>{channel.name}</title>
                </Head>
                <Nav
                    title="View"
                    textColor={
                        channel.colors
                            ? getContrast(channel.colors.split(',')[0])
                            : undefined
                    }
                />
                <Container className="w-full flex flex-row flex-nowrap space-x-8 z-10">
                    <aside className="flex-none w-60 px-2 py-4">
                        <h1 className="font-bold text-3xl my-2">
                            {channel.name}
                        </h1>
                        {channel.description && (
                            <p className="my-2">
                                <span className="font-bold text-sm">
                                    Description:
                                </span>
                                <br />
                                {channel.description}
                            </p>
                        )}
                        <motion.img
                            layoutId="channelAvatar"
                            src={`/data/${channel.channel_id}/${channel.channel_id}.jpg`}
                            alt={channel.channel_id}
                            className="cursor-pointer m-4"
                            style={{
                                width: '200px',
                                height: '200px',
                                display: 'block',
                                borderRadius: '50%'
                            }}
                        />
                        <p className="my-2">
                            <span className="font-bold text-sm">colors:</span>
                            <br />
                            {channel.colors}
                        </p>
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                channel_url:
                            </span>
                            <br />
                            <a
                                className="underline"
                                href={channel.channel_url}
                                target="_blank"
                            >
                                {channel.channel_url}
                            </a>
                        </p>
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                yt_user_url:
                            </span>
                            <br />
                            {channel.yt_user_url}
                        </p>
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                yt_channel_id:
                            </span>
                            <br />
                            {channel.yt_channel_id}
                        </p>
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                total_visits:
                            </span>
                            <br />
                            {channel.total_visits}
                        </p>
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                total_items:
                            </span>
                            <br />
                            {channel.total_items}
                        </p>
                        <p className="my-2">
                            <a href={channel.channel_url} target="_blank">
                                {channel.channel_url}
                            </a>
                        </p>
                    </aside>
                    <article className="flex-grow z-10">
                        {videos && channel.colors ? (
                            <Videos
                                videos={videos}
                                contrastColor={getContrast(
                                    channel.colors.split(',')[0]
                                )}
                            />
                        ) : (
                            <Videos videos={videos} contrastColor="white" />
                        )}
                    </article>
                </Container>
                {channel.colors && (
                    <div
                        className="w-screen min-h-screen fixed overscroll-none shadow-inner filter blur-xl bg-blend-overlay"
                        style={{
                            background: `url(${`/data/${channel.channel_id}/${channel.channel_id}.jpg`}) 50% 50% no-repeat ${
                                channel.colors.split(',')[0]
                            }`,
                            backgroundSize: 'cover'
                        }}
                    ></div>
                )}
            </Wrap>
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
    const res = await getChannel(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));
    const { channel, videos } = data;

    // Pass data to the page via props
    return { props: { channel, videos } };
}
