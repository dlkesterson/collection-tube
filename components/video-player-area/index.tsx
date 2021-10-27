import VideoPlayer from '@/components/video-player';

export default function VideoPlayerArea({ downloaded, channel_id, video_id }) {
    return (
        <article className="bg-gray-900 flex-grow z-10">
            <div className="aspect-w-16 aspect-h-9">
                {downloaded ? (
                    <VideoPlayer
                        options={{
                            controls: true,
                            responsive: true,
                            fluid: true,
                            sources: [
                                {
                                    src: `/data/${channel_id}/${video_id}.mp4`,
                                    type: 'video/mp4'
                                }
                            ]
                        }}
                    />
                ) : (
                    <iframe
                        src={`https://www.youtube.com/embed/${video_id}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </article>
    )
}