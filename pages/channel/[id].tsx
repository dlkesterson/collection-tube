import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

import getContrast from '@/lib/getContrast';
import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Videos from '@/components/videos/';
import Nav from '@/components/nav';
import UpdateChannelForm from '@/components/update-channel-form';

export default function ViewChannelPage({ channel, videos }) {
    if (channel) {
        return (
            <Wrap>
                <Head>
                    <title>{channel.name}</title>
                </Head>
                <Nav />
                <h1 className="font-bold text-3xl text-center my-8">
                    {channel.name}
                </h1>
                <div className="w-full flex flex-row flex-nowrap space-x-4 z-10">
                    <aside
                        className="flex-none w-60 px-2 py-4 text-white bg-blend-multiply rounded"
                        style={{ background: `rgba(0,0,0,0.5)` }}
                    >
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
                        <button 
                            type="button" 
                            className="flex align-center shadow-md rounded mx-auto my-4 py-2 px-4" 
                            style={{ 
                                backgroundColor: 
                                    channel.colors
                                    ? channel.colors.split(',')[1] 
                                    : 'white' }}>
                            Get Latest Data
                        </button>
				        <UpdateChannelForm />
                    </aside>
                    <article
                        className="flex-grow z-10"
                        style={{ overflowY: `auto` }}
                    >
                        {videos && channel.colors ? (
                            <Videos
                                videos={videos}
                                hideChannelAvatar={true}/>
                        ) : (
                            <Videos videos={videos} hideChannelAvatar={true} contrastColor="white" />
                        )}
                    </article>
                </div>
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
export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await getChannel(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));
    if (data.error) {
        console.log(data.error);
    }
    const { channel, videos } = data;

    console.log(videos[0]);

    // Pass data to the page via props
    return { props: { channel, videos } };
}
