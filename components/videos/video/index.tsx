import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

// import ButtonLink from '@/components/button-link';
// import Button from '@/components/button';

export default function Video({
    id,
    title,
    thumbnail,
    duration,
    // video_url,
    channel_id,
    views,
    videoId,
    fileSize,
    fileName,
    filePath,
    // colors,
    published,
    downloaded,
    // layoutId,
    contrastColor,
    hideChannelAvatar
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
        <motion.div className="flex flex-col flex-nowrap h-full">
            <div className="relative flex-none shadow hover:shadow-md">
                {downloaded === 1 && (
                    <div className="absolute top-0 right-0 bg-black bg-opacity-75 p-2">
                        <FiX className="text-white" />
                    </div>
                )}
                <div className="absolute bottom-0 right-0 text-white rounded-sm bg-black p-1 text-xs">
                    {duration}
                </div>
                {thumbnail && (
                    <Link href={`/video/${id}`}>
                        <img
                            src={`/data/${channel_id}/${videoId}.jpg`}
                            className="w-full rounded-sm cursor-pointer"
                            title={title}
                            alt={title}
                        />
                    </Link>
                )}
            </div>
            <div className="flex-grow p-2 flex flex-col flex-nowrap">
                <div className="flex flex-row flex-nowrap">
                    {hideChannelAvatar ? (
                    <div className="text-lg">
                        <Link href={`/video/${id}`}>
                            <a className={`py-2 text-${contrastColor}`}>
                                {title}
                            </a>
                        </Link>
                    </div>
                    ) : (<>
                        <div className="flex-none w-7 mr-2">
                            <Link href={`/video/${id}`}>
                                <img
                                    src={`/data/${channel_id}/${channel_id}.jpg`}
                                    className="rounded-full"
                                />
                            </Link>
                        </div>
                        <div className="text-lg">
                            <Link href={`/video/${id}`}>
                                <a className={`py-2 text-${contrastColor}`}>
                                    {title}
                                </a>
                            </Link>
                        </div>
                    </>)}
                </div>
                <div className="flex flex-col space-y-1 pb-4">
                    <div className="flex flex-col float-right">
                        {views && published && `${views} views | ${published}`}
                    </div>
                    {filePath && (
                        <div className="text-xs rounded-md bg-gray-400 p-2 text-gray-50 font-mono break-all">
                            {filePath}
                        </div>
                    )}
                    {fileName && (
                        <div className="text-gray-500">
                            {fileName}
                        </div>
                    )}
                    {fileSize && (
                        <div className="text-sm font-bold">
                            {fileSize}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
