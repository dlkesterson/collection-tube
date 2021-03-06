import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

import getContrast from '@/lib/getContrast';
// import { getSubscription } from '@/api/get-subscription';
import { getSubscription } from '@/lib/get-subscription';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Videos from '@/components/videos/';
import Nav from '@/components/nav';
import UpdateSubscriptionForm from '@/components/update-subscription-form';

interface VideoProps { 
    key?: number;
    id: number; 
    title: string; 
    duration: string; 
    published: number; 
    video_id: string; 
    downloaded: number;
    subscription_id: string;
    file_size: string;
    file_name: string;
    file_path: string;
    views: number;
}

export default function ViewSubscriptionPage({ subscription, videos }: { subscription: {
    id: string;
    name: string;
    colors: string;
    description: string;
    avatar: string;
    subscription_url: string;
    subscription_id: string;
    last_updated: string;
    views: number;
}; videos: [VideoProps]; }) {
    if (subscription) {
        console.log(subscription);
        return (
            <Wrap>
                <Head>
                    <title>{subscription.name}</title>
                </Head>
                <Nav />
                <h1 className="font-bold text-3xl text-center my-8">
                    {subscription.name}
                </h1>
                <div className="w-full flex flex-row flex-nowrap space-x-4 z-10">
                    <aside
                        className="flex-none w-60 px-2 py-4 text-white bg-blend-multiply rounded"
                        style={
                            subscription.colors
                                ? {
                                      background: `${
                                          subscription.colors.split(',')[0]
                                      }`
                                  }
                                : { background: `rgba(0,0,0,0.5)` }
                        }
                    >
                        {subscription.description && (
                            <p className="my-2">
                                <span className="font-bold text-sm">
                                    Description:
                                </span>
                                <br />
                                {subscription.description}
                            </p>
                        )}
                        {subscription.avatar && (
                            <motion.img
                                layoutId="subscriptionAvatar"
                                src={`/data/${subscription.subscription_id}/${subscription.subscription_id}.jpg`}
                                alt={subscription.name}
                                className="cursor-pointer m-4"
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    display: 'block',
                                    borderRadius: '50%'
                                }}
                            />
                        )}
                        <div className="flex flex-wrap">
                            {subscription.colors &&
                                subscription.colors.split(',').map((color) => (
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
                        <p className="my-2">
                            <a
                                className="underline flex flex-row w-full justify-center items-center"
                                href={subscription.subscription_url}
                                target="_blank"
                            >
                                YT Subscription <FiExternalLink className="ml-2" />
                            </a>
                        </p>
                        <p className="my-2 text-center">
                            <span className="font-bold text-sm">views:</span>
                            <br />
                            {subscription.views}
                        </p>
                        <p className="my-2 text-center">
                            <span className="font-bold text-sm">
                                last updated:
                            </span>
                            <br />
                            {subscription.last_updated}
                        </p>
                        <UpdateSubscriptionForm id={subscription.id} />
                    </aside>
                    <article
                        className="flex-grow z-10"
                        style={{ overflowY: `auto` }}
                    >
                        {videos && subscription.colors ? (
                            <Videos videos={videos} hideSubscriptionAvatar={true} />
                        ) : (
                            <Videos
                                videos={videos}
                                hideSubscriptionAvatar={true}
                                contrastColor="black"
                            />
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
export async function getServerSideProps(context: any) {
    // Fetch data from external API
    console.log('sub ID is.....' + context.params.id);
    const res = await getSubscription(context.params.id);
    console.log(res);
    const data = await JSON.parse(JSON.stringify(res));
    if (data.error) {
        console.log(data.error);
    }
    const { subscription, videos } = data;

    console.log(videos[0]);

    // Pass data to the page via props
    return { props: { subscription, videos } };
}
