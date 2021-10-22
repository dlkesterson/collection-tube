import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';

// import ButtonLink from '@/components/button-link';
import Button from '@/components/button';
import UpdateChannelForm from '@/components/update-channel-form';
import { FiTrash2 } from 'react-icons/fi';

interface ChannelInterface {
    id: number;
    name: string;
    colorprimary: string;
    avatar: string;
    channel_url: string;
}

function Channel({
    id,
    name,
    colorprimary,
    avatar,
    channel_url
}: ChannelInterface) {
    const [deleting, setDeleting] = useState(false);
    const dotStyles = {
        width: '100px',
        height: '100px',
        display: 'block',
        margin: '2em',
        borderRadius: '50%',
        backgroundColor: colorprimary
    };

    const avatarStyles = {
        width: '100px',
        height: '100px',
        display: 'block',
        margin: '2em',
        borderRadius: '50%',
        backgroundImage: `url(${avatar}) 50% 50% no-repeat`
    };

    async function deleteChannel() {
        setDeleting(true);
        let res = await fetch(`/api/delete-channel?id=${id}`, {
            method: 'DELETE'
        });
        let json = await res.json();
        if (!res.ok) throw Error(json.message);
        mutate('/api/get-channels');
        setDeleting(false);
    }
    return name && name.length > 0 ? (
        <div className="channel shadow rounded-md p-3">
            <div className="flex items-center">
                <span style={dotStyles}></span>
                {avatar && <img src={avatar} alt={name} style={avatarStyles} />}
                <Link href={`/channel/${id}`}>
                    <a className="font-bold py-2">{name}</a>
                </Link>

                <div className="flex ml-4">
                    <Button
                        disabled={deleting}
                        onClick={deleteChannel}
                        className="h-6 py-0 mx-1"
                    >
                        {deleting ? 'Deleting ...' : <FiTrash2 className="text-red-300 inline" />}
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <div className="channel shadow rounded-md p-3">
            <div className="flex items-center">{channel_url}</div>
            <UpdateChannelForm id={id} />
        </div>
    );
}

export default Channel;
