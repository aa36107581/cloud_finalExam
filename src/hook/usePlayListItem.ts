/*=====================================
    usePlayListItem

    Author: Jhang
    CreateTime: 2022 / 05 / 25
=====================================*/

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootDispatch, RootState } from "../redux/configureStore";
import getData from "../service/youtube_data";
import useChannel from "./useChannel";
import useVideo from "./useVideo";

const usePlayListItem = () => {
    const dispatch: RootDispatch = useDispatch();
    const reduxState = useSelector((state: RootState) => ({
        id: state.app.playListId,
        playListItems: state.app.playListItems,
        playListItemObj: state.app.playListItemObj,
        nextPageToken: state.app.nextPageToken,
    }));

    const { id, playListItems, playListItemObj, nextPageToken } = reduxState;
    const { isLoading, isEmpty, isError, isNoMore } =
        playListItemObj[`${id}_${nextPageToken}`] || {};

    const loadNextList = () => {
        if (isLoading) {
            return;
        }

        if (!!playListItemObj[`${id}_${nextPageToken}`]) {
            return;
        }

        dispatch(
            getData.getPlayListItem({
                id: id,
                pageToken: nextPageToken,
            })
        );
    };

    const { channel, isLoading: channelLoading } = useChannel();
    const { videoList, isLoading: videoLoading } = useVideo(id);
    const loading = isLoading || channelLoading || videoLoading;

    if (loading === false && nextPageToken !== undefined) {
        loadNextList();
    }

    return {
        id,
        channel,
        playListItem: playListItems[id],
        videoList,
        isLoading: loading,
        isEmpty,
        isError,
        isNoMore,
    };
};

export default usePlayListItem;
