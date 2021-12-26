import Video from './video';
// import getContrast from '@/lib/getContrast';

export default function Videos({ videos, contrastColor = 'black', hideSubscriptionAvatar = false }) {
    if (videos) {
        console.log('videos count: ' + videos.length);
        if (videos.length > 0) {
            return (
                <div className="grid grid-cols-4 gap-4">
                    {videos.map((v) => (
                        <Video
                            key={v.id}
                            id={v.id}
                            title={v.title}
                            duration={v.duration}
                            published={v.published}
                            downloaded={v.downloaded}
                            // layoutId={v.video_id}
                            videoId={v.video_id}
                            contrastColor={contrastColor}
                            hideSubscriptionAvatar={hideSubscriptionAvatar}
                            fileSize={v.file_size}
                            fileName={v.file_name}
                            filePath={v.file_path}
                            // colors={v.colors}
                            thumbnail={`/data/${v.subscription_id}/${v.video_id}.jpg`}
                            views={v.views}
                            // video_url={v.video_url}
                            subscription_id={v.subscription_id}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-4 gap-4">
                    No videos detected/downloaded yet.
                </div>
            );
        }
    } else {
        return null;
    }
}
