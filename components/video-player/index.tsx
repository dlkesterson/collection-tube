import { useEffect, useRef } from 'react';
import videojs from 'video.js';

export const VideoPlayer = ({
    options
}: {
    options: {
        controls: boolean;
        responsive: boolean;
        fluid: boolean;
        sources: [{ src: string; type: string }];
    };
}) => {
    const videoRef = useRef(null);

    // This seperate functional component fixes the removal of the videoelement
    // from the DOM when calling the dispose() method on a player
    const VideoHtml = () => (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );

    useEffect(() => {
        const videoElement = videoRef.current;
        let player: any;
        if (videoElement) {
            player = videojs(videoElement, options, () => {
                console.log('player is ready');
            });
        }
        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [options]);

    return <VideoHtml />;
};
export default VideoPlayer;
