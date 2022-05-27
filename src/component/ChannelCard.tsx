/*=====================================
    ChannelCard

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import styled, { css } from "styled-components";
import { Channel } from "../types/Channel.interface";
import { RootState } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { PlaylistItem } from "../types/PlaylistItem.interface";

const Flex = styled.div<{ align?: string; justify?: string }>`
    display: flex;

    ${(props) => {
        return css`
            align-items: ${props.align ? props.align : "flex-start"};
            justify-content: ${props.justify ? props.justify : "flex-start"};
        `;
    }}
`;

const List = styled(Flex)<{ width?: string }>`
    flex-direction: column;

    ${(props) => {
        if (props.width !== undefined) {
            return css`
                width: ${props.width};
            `;
        }
    }}
`;

const Digit = styled.div`
    font-size: 18px;
`;

const DivisionSign = styled.div`
    width: 120%;
    height: 1px;
    border: solid 0.5px #000;
    border-radius: 1px;
    background-color: #000;
`;

const EqualSign = styled.div`
    margin: 0 15px;
    font-size: 20px;
`;

const PercentSign = styled.div`
    margin: 0 0 0 5px;
    font-size: 20px;
`;

type FormulaType = {
    molecular: number;
    denominator: number;
};

const Formula = (props: FormulaType) => {
    const { molecular, denominator } = props;
    const result = (molecular / denominator).toFixed(5);

    return (
        <Flex align="center">
            <List align="center">
                <Digit>{molecular}</Digit>
                <DivisionSign />
                <Digit>{denominator}</Digit>
            </List>
            <EqualSign>=</EqualSign>
            <Digit>{result}</Digit>
            <PercentSign>%</PercentSign>
        </Flex>
    );
};

const Wrapper = styled(Flex)`
    max-width: 800px;
    margin: 30px 0 0 0;
    padding: 30px 90px 30px 30px;
    background-color: #fff;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.16);
`;

const Cover = styled.div<{ img: string }>`
    margin: 0 30px 0 0;
    position: relative;
    width: 320px;
    height: 180px;

    ${(props) => {
        return css`
            background-image: url(${props.img});
            background-repeat: no-repeat;
            background-size: cover;
        `;
    }}
`;

const VideoCount = styled(Flex)`
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
    color: #fff;
    font-size: 18px;
    text-align: center;
`;

const Title = styled.div`
    max-width: 450px;
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: bold;
`;

const Picture = styled.div<{ img: string }>`
    width: 30px;
    height: 30px;
    border-radius: 15px;

    ${(props) => {
        return css`
            background-image: url(${props.img});
            background-repeat: no-repeat;
            background-size: contain;
        `;
    }}
`;

const ChannelTitle = styled.div`
    margin: 0 10px;
    font-size: 16px;
    color: #333;
    margin: 0 10px;
`;

const SubscribeCount = styled.div`
    font-size: 14px;
    color: #666;
`;

const FormulaBlock = styled.div``;

const Content = styled.div`
    margin: 0 20px 0 0;
    font-size: 20px;
`;

type ChannelCardType = {
    id: string;
    channel: Channel;
    playListItem: PlaylistItem;
};

const ChannelCard = (props: ChannelCardType) => {
    const { id, channel, playListItem } = props;

    const { snippet, statistics } = channel;
    const picSrc = snippet.thumbnails["default"].url;
    const subscriberCount = statistics.subscriberCount;

    const coverSrc = playListItem.snippet.thumbnails["medium"].url,
        channelTitle = playListItem.snippet.channelTitle;

    const reduxState = useSelector((state: RootState) => ({
        title: state.app.list[id],
        total: state.app.total[id],
    }));
    const { title, total } = reduxState;
    const { videoCount, viewCount, likeCount, commentCount } = total;

    return (
        <Wrapper>
            <Cover img={coverSrc}>
                <VideoCount align="center" justify="center">
                    {videoCount}
                    <br />
                    部影片
                </VideoCount>
            </Cover>
            <List>
                <Title>{title}</Title>
                <Flex align="center">
                    <Picture img={picSrc} />
                    <ChannelTitle>{channelTitle}</ChannelTitle>
                </Flex>
                <SubscribeCount>{subscriberCount}位訂閱者</SubscribeCount>
                <FormulaBlock>
                    <Flex align="center" style={{ marginTop: "10px" }}>
                        <Content>喜歡比例:</Content>
                        <Formula molecular={likeCount} denominator={viewCount} />
                    </Flex>
                    <Flex align="center" style={{ marginTop: "10px" }}>
                        <Content>評論比例:</Content>
                        <Formula molecular={commentCount} denominator={viewCount} />
                    </Flex>
                </FormulaBlock>
            </List>
        </Wrapper>
    );
};

export default ChannelCard;
