/*=====================================
    Youtube Data API

    Author: Jhang
    CreateTime: 2022 / 05 / 19
=====================================*/

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Playlist from "../types/Playlist.interface";
import PlaylistItems from "../types/PlaylistItem.interface";
import Channels from "../types/Channel.interface";
import Videos from "../types/Video.interface";

const ROOT: string = "https://www.googleapis.com/youtube/v3";
const API_Key: string = "AIzaSyA-9bXOswotzBPc8xAWIXA_CM_raRE2pho";

const getTitle = createAsyncThunk(
    "playlist",
    async (
        arg: {
            id: string;
        },
        thunkAPI
    ) => {
        const { id } = arg;
        let url = `${ROOT}/playlists?part=snippet&id=${id}&key=${API_Key}`;

        return new Promise<Playlist>((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
);

const getPlayListItem = createAsyncThunk(
    "playlistItem",
    async (
        arg: {
            id: string;
            pageToken?: string | undefined;
        },
        thunkAPI
    ) => {
        const { id, pageToken } = arg;
        let url = `${ROOT}/playlistItems?part=snippet,contentDetails&playlistId=${id}&key=${API_Key}&maxResults=50`;
        if (pageToken !== undefined) {
            url += `&pageToken=${pageToken}`;
        }

        return new Promise<PlaylistItems>((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
);

const getChannel = createAsyncThunk(
    "channel",
    async (
        arg: {
            id: string;
        },
        thunkAPI
    ) => {
        const { id } = arg;
        let url = `${ROOT}/channels?part=snippet,statistics&id=${id}&key=${API_Key}`;

        return new Promise<Channels>((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
);

const getVideo = createAsyncThunk(
    "video",
    async (
        arg: {
            idList: string[];
        },
        thunkAPI
    ) => {
        const { idList } = arg;
        const url = `${ROOT}/videos?part=snippet,statistics&id=${idList.join(
            ","
        )}&key=${API_Key}&maxResults=50`;

        return new Promise<Videos>((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
);

const getData = {
    getTitle,
    getPlayListItem,
    getChannel,
    getVideo,
};

export default getData;
