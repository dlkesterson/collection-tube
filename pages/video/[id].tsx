import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getVideo } from '@/api/get-video';
import Container from '@/components/container';
import Wrap from '@/components/wrap';
import Nav from '@/components/nav';
import { mapOptionFieldNames } from 'sequelize/types/lib/utils';

/*! https://codepen.io/cferdinandi/pen/Yomroj
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
function getContrast(hexcolor) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
        hexcolor = hexcolor
            .split('')
            .map(function (hex) {
                return hex + hex;
            })
            .join('');
    }

    // Convert to RGB value
    let r = parseInt(hexcolor.substr(0, 2), 16);
    let g = parseInt(hexcolor.substr(2, 2), 16);
    let b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
}

export default function ViewVideoPage({ data }) {
    console.log(data);

    if (data) {
        return (
            <Wrap>
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
                />
                <Container className="w-full flex flex-row flex-nowrap space-x-8 z-10">
                    <aside
                        className="flex-none w-60 mix-blend-overlay px-2 py-4 border-2 border-dotted"
                        style={{
                            borderImageSlice: `1`,
                            borderImageSource: `linear-gradient(to left, ${
                                data.colors.split(',')[1]
                            }, ${data.colors.split(',')[2]})`
                        }}
                    >
                        <Link href={`/channel/${data.channel_id}`}>
                            <motion.img
                                layoutId="channelAvatar"
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
                        <motion.img
                            src={`/data/${data.channel_id}/${data.video_id}.jpg`}
                            layoutId={data.video_id}
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
                    </aside>
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
                    <div
                        className="w-screen min-h-screen fixed overscroll-none shadow-inner filter blur-xl bg-blend-multiply"
                        style={{
                            background: `url(${`/data/${data.channel_id}/${data.video_id}.jpg`}) 50% 50% no-repeat ${
                                data.colors.split(',')[0]
                            }`,
                            backgroundSize: 'cover'
                        }}
                    ></div>
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
