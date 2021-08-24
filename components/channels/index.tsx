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
                            channel_url={c.channel_url}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <p className="py-2 my-8 text-center">
                No channels have been added yet.
            </p>
        );
    }
}
