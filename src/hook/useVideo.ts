/*=====================================
    useVideo

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../redux/configureStore";
import { useEffect } from "react";
import getData from "../service/youtube_data";
import { Video } from "../types/Video.interface";

const useVideo = (id: string) => {
    const dispatch: RootDispatch = useDispatch();
    const reduxState = useSelector((state: RootState) => ({
        incomingList: state.app.incomingList,
        playListItems: state.app.playListItems[id],
        videos: state.app.videos,
        videoObj: state.app.videoObj,
    }));

    const { incomingList, playListItems, videos, videoObj } = reduxState;
    const { isLoading, isNoMore, isEmpty, isError } = videoObj[id] || {};

    const getTotalId = () => {
        if (!playListItems) {
            return [];
        }
        let result: string[] = [];
        for (const item of playListItems) {
            result.push(item.contentDetails.videoId);
        }
        return result;
    };

    const getVideoList = () => {
        const list = getTotalId();
        let videoList: Video[] = [];

        for (const item of list) {
            videoList.push(videos[item]);
        }
        return videoList;
    };

    const videoList = getVideoList();

    const getIdList = () => {
        if (incomingList.length === 0) {
            return [];
        }
        let result: string[] = [];

        for (const item of incomingList) {
            result.push(item.contentDetails.videoId);
        }

        return result;
    };

    const loadNextList = (idList: string[]) => {
        if (isLoading || isNoMore || isEmpty || isError) {
            return;
        }

        dispatch(getData.getVideo({ idList }));
    };

    useEffect(() => {
        const idList = getIdList();
        if (idList.length !== 0) {
            loadNextList(idList);
        }
    }, [incomingList]);

    return {
        videoList,
        isLoading,
        isNoMore,
        isError,
        isEmpty,
    };
};

export default useVideo;
