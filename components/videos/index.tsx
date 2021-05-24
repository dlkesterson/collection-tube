import Video from './video';

export default function Videos({ videos }) {
    if (videos) {
        console.log(videos);
        return (
            <div className="flex flex-wrap h-full p-4">
                {videos.map((v) => (
                    <div key={v.id} className="w-4/12 px-4">
                        <Video
                            id={v.id}
                            title={v.title}
                            duration={v.duration}
                            published={v.published}
                            thumbnail={`/data/${v.channel_id}/${v.video_id}.jpg`}
                            views={v.views}
                            video_url={v.video_url}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
}
