import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import Channel from './channel';

export default function Channels({ channels }) {
    if (channels && channels.length > 0) {
        return (
            <div className="w-full">
                {channels.map((c) => (
                    <div key={c.id} className="py-2">
                        <Channel
                            id={c.id}
                            name={c.name}
                            avatar={c.avatar}
                            colorprimary={c.color_primary}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <p>
                No channels have been added yet.{' '}
                    <Link href="/channel/add">
                        <a
                            className={`underline`}
                        >
                            <FiPlus className="text-white text-xl inline mr-2"/>Add a Channel
                        </a>
                    </Link>
            </p>
        );
    }
}
