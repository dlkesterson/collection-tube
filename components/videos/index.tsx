import Video from './video';

export default function Videos({ videos }) {
    if (videos) {
        console.log(videos);
        return (
            <div>
                {videos.map((v) => (
                    <div key={v.id} className="py-2">
                        <Video
                            id={v.id}
                            title={v.title}
                            duration={v.duration}
                            thumbnail={v.thumbnail}
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
