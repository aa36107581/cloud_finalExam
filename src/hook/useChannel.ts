/*=====================================
    useChannel

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootDispatch, RootState } from "../redux/configureStore";
import getData from "../service/youtube_data";

const useChannel = () => {
    const dispatch: RootDispatch = useDispatch();
    const reduxState = useSelector((state: RootState) => ({
        id: state.app.channelId,
        channels: state.app.channels,
        channelObj: state.app.channelObj,
    }));
    const { id, channels, channelObj } = reduxState;
    const { isLoading } = channelObj[id] || {};
    const channel = channels[id];

    const loadNextList = () => {
        if (isLoading) {
            return;
        }

        if (channels[id] || !id) {
            return;
        }

        dispatch(
            getData.getChannel({
                id: id,
            })
        );
    };

    useEffect(() => {
        if (id !== "") {
            loadNextList();
        }
    }, [id]);

    return {
        channel,
        isLoading,
    };
};

export default useChannel;
