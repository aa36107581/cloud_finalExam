/*=====================================
    youtube data api reducer

    Author: Jhang
    CreateTime: 2022 / 05 / 19
=====================================*/

import { createSlice } from "@reduxjs/toolkit";
import youtube_data from "../../service/youtube_data";
import { PlaylistItem } from "../../types/PlaylistItem.interface";
import { Channel } from "../../types/Channel.interface";
import { Video } from "../../types/Video.interface";
import { range } from "lodash";

interface AppState {
    list: { [id: string]: string };
    listObj: {
        [id: string]: {
            isLoading: boolean;
            isEmpty: boolean;
            isError: boolean;
            isNoMore: boolean;
        };
    };

    playListId: string;
    playListItems: { [id: string]: PlaylistItem[] };
    playListItemObj: {
        [id: string]: {
            isLoading: boolean;
            isEmpty: boolean;
            isError: boolean;
            isNoMore: boolean;
        };
    };
    incomingList: PlaylistItem[];
    nextPageToken?: string | undefined;

    channelId: string;
    channels: { [id: string]: Channel };
    channelObj: {
        [id: string]: {
            isLoading: boolean;
            isEmpty: boolean;
            isError: boolean;
            isNoMore: boolean;
        };
    };

    videos: { [id: string]: Video };
    videoObj: {
        [id: string]: {
            isLoading: boolean;
            isEmpty: boolean;
            isError: boolean;
            isNoMore: boolean;
        };
    };

    total: {
        [id: string]: {
            viewCount: number;
            likeCount: number;
            commentCount: number;
            videoCount: number;
        };
    };
}

const initialState = {
    list: {},
    listObj: {},
    playListId: "",
    playListItems: {},
    playListItemObj: {},
    incomingList: [],
    nextPageToken: undefined,
    channelId: "",
    channels: {},
    channelObj: {},
    videos: {},
    videoObj: {},
    total: {},
} as AppState;

const generateListObj = () => {
    return {
        isLoading: false,
        isNoMore: false,
        isEmpty: false,
        isError: false,
    };
};

const generateTotal = () => {
    return {
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        videoCount: 0,
    };
};

const appSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         * [處理中] title
         */
        builder.addCase(youtube_data.getTitle.pending, (state, { meta, payload }) => {
            const { id } = meta.arg;

            if (!state.listObj[id]) {
                state.listObj[id] = generateListObj();
            }

            const listObj = state.listObj[id];
            listObj.isLoading = true;
            listObj.isEmpty = false;
            listObj.isError = false;
            listObj.isNoMore = false;
        });

        /**
         * [成功] title
         */
        builder.addCase(youtube_data.getTitle.fulfilled, (state, { meta, payload }) => {
            const { id } = meta.arg;
            let isEmpty = true;

            if (payload) {
                const { snippet } = payload.items[0];

                isEmpty = false;
                state.list[id] = snippet.title;
            }

            if (!state.listObj[id]) {
                state.listObj[id] = generateListObj();
            }

            const listObj = state.listObj[id];
            listObj.isLoading = false;
            listObj.isEmpty = isEmpty;
            listObj.isError = false;
            listObj.isNoMore = true;
        });

        /**
         * [失敗] title
         */
        builder.addCase(youtube_data.getTitle.rejected, (state, { meta, payload }) => {
            const { id } = meta.arg;

            if (!state.listObj[id]) {
                state.listObj[id] = generateListObj();
            }

            const listObj = state.listObj[id];
            listObj.isLoading = false;
            listObj.isEmpty = true;
            listObj.isError = true;
            listObj.isNoMore = true;
        });

        /**
         * [處理中] 播放清單
         */
        builder.addCase(youtube_data.getPlayListItem.pending, (state, { meta, payload }) => {
            const { id, pageToken } = meta.arg;
            const listkey = `${id}_${pageToken}`;

            if (!state.playListItemObj[listkey]) {
                state.playListItemObj[listkey] = generateListObj();
            }

            const playListItemObj = state.playListItemObj[listkey];
            playListItemObj.isLoading = true;
            playListItemObj.isError = false;
            playListItemObj.isEmpty = false;
            playListItemObj.isNoMore = false;
        });

        /**
         * [成功] 播放清單
         */
        builder.addCase(youtube_data.getPlayListItem.fulfilled, (state, { meta, payload }) => {
            const { id, pageToken } = meta.arg;
            let isEmpty = true,
                isNoMore = true;
            const listkey = `${id}_${pageToken}`;

            if (payload) {
                const { nextPageToken, items } = payload;

                if (!state.playListItemObj[listkey]) {
                    state.playListItemObj[listkey] = generateListObj();
                }
                isEmpty = items.length === 0;
                isNoMore = items.length < 50;

                if (state.playListItems[id] === undefined) {
                    state.playListItems[id] = [];
                }

                state.incomingList = items;
                state.playListItems[id].push(...items);
                state.playListId = id;
                state.nextPageToken = nextPageToken;
                state.channelId = payload.items[0].snippet.channelId;

                if (!state.total[id]) {
                    state.total[id] = generateTotal();
                    state.total[id].videoCount = payload.pageInfo.totalResults;
                }
            }

            const playListItemObj = state.playListItemObj[listkey];
            playListItemObj.isLoading = false;
            playListItemObj.isError = false;
            playListItemObj.isEmpty = isEmpty;
            playListItemObj.isNoMore = isNoMore;
        });

        /**
         * [失敗] 播放清單
         */
        builder.addCase(youtube_data.getPlayListItem.rejected, (state, { meta, payload }) => {
            const { id, pageToken } = meta.arg;
            const listkey = `${id}_${pageToken}`;

            if (!state.playListItemObj[listkey]) {
                state.playListItemObj[listkey] = generateListObj();
            }

            const playListItemObj = state.playListItemObj[listkey];
            playListItemObj.isLoading = false;
            playListItemObj.isError = true;
            playListItemObj.isEmpty = true;
            playListItemObj.isNoMore = true;
        });

        /**
         * [處理中] 頻道
         */
        builder.addCase(youtube_data.getChannel.pending, (state, { meta, payload }) => {
            const { id } = meta.arg;

            if (!state.channelObj[id]) {
                state.channelObj[id] = generateListObj();
            }

            const channelObj = state.channelObj[id];
            channelObj.isLoading = true;
            channelObj.isEmpty = false;
            channelObj.isError = false;
            channelObj.isNoMore = false;
        });

        /**
         * [成功] 頻道
         */
        builder.addCase(youtube_data.getChannel.fulfilled, (state, { meta, payload }) => {
            const { id } = meta.arg;
            const { items } = payload;
            let isEmpty = true;

            if (payload) {
                if (!state.channelObj[id]) {
                    state.channelObj[id] = generateListObj();
                }

                if (items.length !== 0) {
                    isEmpty = false;
                    state.channels[id] = items[0];
                }
            }

            const channelObj = state.channelObj[id];
            channelObj.isLoading = false;
            channelObj.isEmpty = isEmpty;
            channelObj.isError = false;
            channelObj.isNoMore = true;
        });
        /**
         * [失敗] 頻道
         */
        builder.addCase(youtube_data.getChannel.rejected, (state, { meta, payload }) => {
            const { id } = meta.arg;

            if (!state.channelObj[id]) {
                state.channelObj[id] = generateListObj();
            }

            const channelObj = state.channelObj[id];
            channelObj.isLoading = false;
            channelObj.isEmpty = true;
            channelObj.isError = true;
            channelObj.isNoMore = true;
        });

        /**
         * [處理中] 影片
         */
        builder.addCase(youtube_data.getVideo.pending, (state, { meta, payload }) => {
            const { playListId } = state;

            if (!state.videoObj[playListId]) {
                state.videoObj[playListId] = generateListObj();
            }

            const videoObj = state.videoObj[playListId];
            videoObj.isLoading = true;
            videoObj.isEmpty = false;
            videoObj.isError = false;
            videoObj.isNoMore = false;
        });

        /**
         * [成功] 影片
         */
        builder.addCase(youtube_data.getVideo.fulfilled, (state, { meta, payload }) => {
            const { idList } = meta.arg;
            const { items } = payload;
            const { playListId } = state;
            let isEmpty = true,
                isNoMore = true;

            if (!state.videoObj[playListId]) {
                state.videoObj[playListId] = generateListObj();
            }

            if (payload) {
                isEmpty = idList.length === 0;
                isNoMore = idList.length < 50;

                for (const i of range(items.length)) {
                    const id = idList[i],
                        video = items[i];

                    state.videos[id] = video;
                    if (video.statistics.viewCount !== undefined) {
                        state.total[playListId].viewCount =
                            Number(state.total[playListId].viewCount) +
                            Number(video.statistics.viewCount);
                    }
                    if (video.statistics.likeCount !== undefined) {
                        state.total[playListId].likeCount =
                            Number(state.total[playListId].likeCount) +
                            Number(video.statistics.likeCount);
                    }
                    if (video.statistics.commentCount !== undefined) {
                        state.total[playListId].commentCount =
                            Number(state.total[playListId].commentCount) +
                            Number(video.statistics.commentCount);
                    }
                }
            }

            const videoObj = state.videoObj[playListId];
            videoObj.isLoading = false;
            videoObj.isEmpty = isEmpty;
            videoObj.isError = false;
            videoObj.isNoMore = isNoMore;
        });

        /**
         * [失敗] 影片
         */
        builder.addCase(youtube_data.getVideo.rejected, (state, { meta, payload }) => {
            const { playListId } = state;

            if (!state.videoObj[playListId]) {
                state.videoObj[playListId] = generateListObj();
            }

            const videoObj = state.videoObj[playListId];
            videoObj.isLoading = false;
            videoObj.isEmpty = true;
            videoObj.isError = true;
            videoObj.isNoMore = true;
        });
    },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
