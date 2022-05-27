/*=====================================
    VideoCard

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import styled, { css } from "styled-components";
import { Video } from "../types/Video.interface";

const Flex = styled.div`
    display: flex;
`;

const List = styled(Flex)`
    flex-direction: column;
    margin: 0 0 0 10px;
`;

const Wrapper = styled.div`
    margin: 20px 0 0 0;
    width: 100%;
    padding: 30px 90px 30px 30px;
    background-color: #fff;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.16);
`;

const Cover = styled.img`
    width: auto;
    height: 120px;
`;

const Title = styled.div`
    max-width: 450px;
    margin: 0 10px 0 0;
    font-size: 16px;
    font-weight: bold;
`;

const ChannelTitle = styled.div`
    margin: 15px 0;
    font-size: 14px;
    font-weight: bold;
    color: #333;
`;

const Content = styled.div`
    font-size: 12px;

    &:nth-child(2) {
        margin: 0 20px;
    }
`;

const VideoCard = (props: { src: Video }) => {
    const { snippet, statistics } = props.src;
    const { title, thumbnails, channelTitle } = snippet;
    const { viewCount, likeCount, commentCount } = statistics;
    const coverSrc = thumbnails["default"].url;

    return (
        <Wrapper>
            <Flex>
                <Cover src={coverSrc} />
                <List>
                    <Title>{title}</Title>
                    <ChannelTitle>{channelTitle}</ChannelTitle>
                    <Flex>
                        <Content>觀看數: {viewCount || "隱藏"}</Content>
                        <Content>喜歡數: {likeCount || "隱藏"}</Content>
                        <Content>評論數: {commentCount || "隱藏"}</Content>
                    </Flex>
                </List>
            </Flex>
        </Wrapper>
    );
};

export default VideoCard;
