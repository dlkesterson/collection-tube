import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import getContrast from '@/lib/getContrast';
import { getVideo } from '@/api/get-video';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Nav from '@/components/nav';
import { mapOptionFieldNames } from 'sequelize/types/lib/utils';

export default function ViewVideoPage({ data }) {
    console.log(data);

    if (data && data.colors) {
        return (
            <Wrap
                className="border-t-8 border-solid"
                inlineStyle={{
                    borderImageSlice: `1`,
                    borderImageSource: `linear-gradient(to left, ${
                        data.colors.split(',')[1]
                    }, ${data.colors.split(',')[2]})`
                }}
            >
                <Head>
                    <title>{data.title}</title>
                </Head>
                <Nav
                    title="View"
                    textColor={
                        data.colors
                            ? getContrast(data.colors.split(',')[0])
                            : undefined
                    }
                    className="border-b border-solid mb-8"
                    inlineStyle={{
                        borderImageSlice: `1`,
                        borderImageSource: `linear-gradient(to left, ${
                            data.colors.split(',')[1]
                        }, ${data.colors.split(',')[2]})`
                    }}
                />
                <Container className="w-full flex flex-row flex-nowrap space-x-8 z-10">
                    {data.colors && (
                        <aside
                            className="flex-none w-60 mix-blend-overlay px-2 py-4 border-2 border-solid"
                            style={{
                                borderImageSlice: `1`,
                                borderImageSource: `linear-gradient(to left, ${
                                    data.colors.split(',')[1]
                                }, ${data.colors.split(',')[2]})`
                            }}
                        >
                            <Link href={`/channel/${data.channel_id}`}>
                                <img
                                    src={`/data/${data.channel_id}/${data.channel_id}.jpg`}
                                    alt={data.channel_id}
                                    className="cursor-pointer m-4"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        display: 'block',
                                        borderRadius: '50%'
                                    }}
                                />
                            </Link>
                            <img
                                src={`/data/${data.channel_id}/${data.video_id}.jpg`}
                            />
                            <div className="flex flex-wrap">
                                {data.colors &&
                                    data.colors.split(',').map((color) => (
                                        <p
                                            key={color}
                                            className={`rounded-full h-16 w-16 px-4 m-2 flex items-center justify-center shadow text-${getContrast(
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
                                    className={`my-2 text-sm break-words text-${getContrast(
                                        data.colors.split(',')[0]
                                    )}`}
                                >
                                    <span className="font-bold text-sm">
                                        Description:
                                    </span>
                                    <br />
                                    {data.description}
                                </p>
                            )}
                        </aside>
                    )}
                    <article className="flex-grow z-10">
                        {data.video_id && (
                            <div className="w-full aspect-w-16 aspect-h-9">
                                <iframe
                                    src={`https://www.youtube.com/embed/${data.video_id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        <h1
                            className={`font-bold text-3xl my-8 text-${
                                data.colors
                                    ? getContrast(data.colors.split(',')[0])
                                    : undefined
                            }
                    `}
                        >
                            {data.title}
                        </h1>
                    </article>
                </Container>
                {data.thumbnail && (
                    <motion.div
                        layoutId="backgroundImage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-screen min-h-screen fixed overscroll-none shadow-inner filter blur-xl bg-blend-multiply"
                        style={{
                            background: `url(${`/data/${data.channel_id}/${data.video_id}.jpg`}) 50% 50% no-repeat ${
                                data.colors.split(',')[0]
                            }`,
                            backgroundSize: 'cover'
                        }}
                    ></motion.div>
                )}
            </Wrap>
        );
    } else {
        return (
            <Wrap>
                <Nav title="View" />
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
