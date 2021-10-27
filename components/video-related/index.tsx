

export default function VideoRelated({ related, colorContrast }) {
    return (
        <div className="w-full">
            {related.map((v) => (
                <div key={v.id} className="py-2">
                    <img src={v.richThumbnails.length ? v.richThumbnails[0].url : v.thumbnails[0].url} title={v.title} />
                    <p className={`my-2 text-sm break-words ${colorContrast}`}>{v.title}</p>
                </div>
            ))}
        </div>
    )
}
