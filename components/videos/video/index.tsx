import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';

import ButtonLink from '@/components/button-link';
import Button from '@/components/button';

export default function Video({
    id,
    title,
    thumbnail,
    duration,
    video_url,
    channel_id,
    views,
    published
}) {
    const [deleting, setDeleting] = useState(false);

    async function deleteVideo() {
        setDeleting(true);
        let res = await fetch(`/api/delete-video?id=${id}`, {
            method: 'DELETE'
        });
        let json = await res.json();
        if (!res.ok) throw Error(json.message);
        mutate('/api/get-videos');
        setDeleting(false);
    }
    return (
        <>
            <div className="relative">
                <div className="absolute bottom-0 right-2 text-white bg-black rounded p-2">
                    {duration}
                </div>
                {thumbnail && (
                    <Link href={`/video/${id}`}>
                        <img
                            src={thumbnail}
                            className="rounded"
                            title={title}
                            alt="thumb"
                        />
                    </Link>
                )}
            </div>
            <div className="flex py-4 space-x-2">
                <div className="w-2/12">
                    <img src={`/data/${channel_id}/${channel_id}.jpg`} className="rounded-full" />
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="text-xl font-bold">
                        <Link href={`/video/${id}`}>
                            <a className="font-bold py-2">{title}</a>
                        </Link>
                    </div>
                    <div className="flex flex-col float-right pb-4">
                        {views && published && (`${views} views | ${published}`)}
                    </div>
                </div>
            </div>
        </>
    );
}
