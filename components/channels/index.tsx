import Channel from './channel';

export default function Channels({ channels }) {
    if (channels && channels.length > 0) {
        console.log(channels);
        return (
            <div>
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
        return <p>No channels were found</p>;
    }
}
