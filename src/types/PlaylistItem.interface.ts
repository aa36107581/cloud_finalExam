import Thumbnails from "./Thumbnails.interface";

interface PlaylistItem {
    id: string;
    snippet: {
        title: string;
        publishedAt: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        channelId: string;
        videoOwnerChannelTitle: string;
    };
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
}

interface PlaylistItems {
    nextPageToken?: string | undefined;
    items: PlaylistItem[];
    pageInfo: {
        totalResults: number;
    };
}

export default PlaylistItems;

export type { PlaylistItem };
