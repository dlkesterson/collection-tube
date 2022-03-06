import useSWR from 'swr';

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json());
}

export function useSubscriptions() {
    const { data, error } = useSWR(`/api/get-subscriptions`, fetcher);

    return {
        subscriptions: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useCollections() {
    const { data, error } = useSWR(`/api/get-collections`, fetcher);

    return {
        collections: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useSubscription(id: string) {
    return useSWR(`/api/get-subscription?id=${id}`, fetcher);
}

export function useCollection(id: string) {
    return useSWR(`/api/get-collection?id=${id}`, fetcher);
}

export function useVideos() {
    const { data, error } = useSWR(`/api/get-videos`, fetcher);

    return {
        videos: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useVideo(id: string) {
    return useSWR(`/api/get-video?id=${id}`, fetcher);
}

export function useDownloads() {
    const { data, error } = useSWR(`/api/get-downloads`, fetcher);

    return {
        videos: data && data.videos ? data.videos : [],
        isLoading: !error && !data,
        isError: error
    };
}
