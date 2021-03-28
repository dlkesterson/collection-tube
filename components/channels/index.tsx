import Channel from './channel'

function Channels({ channels }) {
  if (channels) {
    return (
      <div>
        {channels.map((c) => (
          <div key={c.id} className="py-2">
            <Channel id={c.id} name={c.name} description={c.description} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Channels
