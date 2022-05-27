import Thumbnails from "./Thumbnails.interface";

interface Video {
    snippet: {
        publishedAt: string;
        title: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        tags: string[];
    };
    statistics: {
        viewCount: number;
        likeCount: number;
        commentCount: number;
    };
}

interface Videos {
    items: Video[];
}

export default Videos;

export type { Video };
