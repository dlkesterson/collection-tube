import Channel from './channel';

function Channels({ channels }) {
    if (channels) {
        console.log(channels);
        return (
            <div>
                {channels.map((c) => (
                    <div key={c.short_id} className="py-2">
                        <Channel
                            shortid={c.short_id}
                            name={c.name}
                            avatar={c.avatar}
                            colorprimary={c.color_primary}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}

export default Channels;
