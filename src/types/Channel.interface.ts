import Thumbnails from "./Thumbnails.interface";

interface Channel {
    snippet: {
        title: string;
        thumbnails: Thumbnails;
    };
    statistics: {
        subscriberCount: string;
    };
}

interface Channels {
    items: Channel[];
}

export default Channels;

export type { Channel };
