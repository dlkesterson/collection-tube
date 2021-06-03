import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

import getContrast from '@/lib/getContrast';
import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Videos from '@/components/videos/';
import Nav from '@/components/nav';

export default function ViewChannelPage({ channel, videos }) {
    if (channel) {
        return (
            <Wrap
                className="channel-bg"
                inlineStyle={{
                    background: `linear-gradient(-45deg, ${channel.colors
                        .split(',')
                        .slice(1, 5)
                        .join()})`,
                    backgroundSize: `400% 400%`,
                    animation: `gradient 15s ease infinite`
                }}
            >
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
                    <aside
                        className="flex-none w-60 px-2 py-4 text-white bg-blend-multiply rounded"
                        style={{ background: `rgba(0,0,0,0.5)` }}
                    >
                        <h1 className="font-bold text-3xl text-center my-2">
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
                            <a
                                className="underline flex flex-row w-full justify-center items-center"
                                href={channel.channel_url}
                                target="_blank"
                            >
                                YT Channel <FiExternalLink className="ml-2" />
                            </a>
                        </p>
                        <p className="my-2 text-center">
                            <span className="font-bold text-sm">views:</span>
                            <br />
                            {channel.views}
                        </p>
                    </aside>
                    <article
                        className="flex-grow z-10"
                        style={{ maxHeight: `80vh`, overflowY: `auto` }}
                    >
                        {videos && channel.colors ? (
                            <Videos
                                videos={videos}
                                hideChannelAvatar={true}
                                contrastColor="white"
                            />
                        ) : (
                            <Videos videos={videos} contrastColor="white" />
                        )}
                    </article>
                </Container>
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
    if (data.error) {
        console.log(data.error);
    }
    const { channel, videos } = data;

    // Pass data to the page via props
    return { props: { channel, videos } };
}
