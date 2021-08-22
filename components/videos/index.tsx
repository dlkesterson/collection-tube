import Video from './video';
// import getContrast from '@/lib/getContrast';

export default function Videos({ videos, contrastColor = 'black', hideChannelAvatar = false }) {
    if (videos) {
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
                        hideChannelAvatar={hideChannelAvatar}
                        // colors={v.colors}
                        thumbnail={`/data/${v.channel_id}/${v.video_id}.jpg`}
                        views={v.views}
                        // video_url={v.video_url}
                        channel_id={v.channel_id}
                    />
                ))}
            </div>
        );
    } else {
        return null;
    }
}
