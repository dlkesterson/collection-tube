import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';

import ButtonLink from '@/components/button-link';
import Button from '@/components/button';

export default function Video({ id, title, thumbnail, duration, video_url }) {
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
        <div className="video shadow rounded-md p-3">
            <div className="flex items-center">
                {thumbnail && <img src={thumbnail} alt="thumb" />}
                <Link href={`/video/${id}`}>
                    <a className="font-bold py-2">{title}</a>
                </Link>

                <div className="flex ml-4">
                    <ButtonLink
                        href={`/video/edit/${id}`}
                        className="h-5 py-0 mx-1"
                    >
                        Edit
                    </ButtonLink>
                    <Button
                        disabled={deleting}
                        onClick={deleteVideo}
                        className="h-5 py-0 mx-1"
                    >
                        {deleting ? 'Deleting ...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
