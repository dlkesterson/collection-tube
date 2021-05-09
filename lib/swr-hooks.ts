import useSWR from 'swr'

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

export function useChannels() {
    const { data, error } = useSWR(`/api/get-channels`, fetcher)

    return {
        channels: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export function useChannel(id: string) {
    return useSWR(`/api/get-channel?id=${id}`, fetcher)
}

export function useVideos() {
    const { data, error } = useSWR(`/api/get-videos`, fetcher)

    return {
        videos: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export function useVideo(id: string) {
    return useSWR(`/api/get-video?id=${id}`, fetcher)
}
