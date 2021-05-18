import Head from 'next/head';

import { getChannel } from '@/api/get-channel';
import Container from '@/components/container';
import Videos from '@/components/videos/';
import Nav from '@/components/nav';

export default function ViewChannelPage({ channel, videos }) {
    console.log(channel);

    if (channel) {
        return (
            <div>
                <Head>
                    <title>{channel.name}</title>
                </Head>
                <Nav title="View" />
                <Container>
                    <h1 className="font-bold text-3xl my-2">{channel.name}</h1>
                    {channel.description && (
                        <p className="my-2">
                            <span className="font-bold text-sm">
                                Description:
                            </span>
                            <br />
                            {channel.description}
                        </p>
                    )}
                    <p className="my-2">
                        <span className="font-bold text-sm">colors:</span>
                        <br />
                        {channel.colors}
                    </p>
                    <p className="my-2">
                        <span className="font-bold text-sm">channel_url:</span>
                        <br />
                        {channel.channel_url}
                    </p>
                    <p className="my-2">
                        <span className="font-bold text-sm">yt_user_url:</span>
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
                        <span className="font-bold text-sm">total_visits:</span>
                        <br />
                        {channel.total_visits}
                    </p>
                    <p className="my-2">
                        <span className="font-bold text-sm">total_items:</span>
                        <br />
                        {channel.total_items}
                    </p>
                    <p className="my-2">
                        <a href={channel.channel_url} target="_blank">
                            {channel.channel_url}
                        </a>
                    </p>
                    {videos && <Videos videos={videos} />}
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
    const res = await getChannel(context.params.id);
    const data = await JSON.parse(JSON.stringify(res));
    const { channel, videos } = data;

    console.log(data);

    // Pass data to the page via props
    return { props: { channel, videos } };
}
