/*=====================================
    Root

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import styled from "styled-components";
import SearchBar from "../component/SearchBar";
import ChannelCard from "../component/ChannelCard";
import VideoCard from "../component/VideoCard";
import usePlayListItem from "../hook/usePlayListItem";

const MessageBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    height: 200px;
    font-size: 20px;
`;

const Flex = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 30px;
`;

const Root = () => {
    const { id, channel, videoList, playListItem, isLoading, isEmpty } = usePlayListItem();

    return (
        <Flex>
            <Wrapper>
                <SearchBar />
                {isLoading && <MessageBlock>Loading...</MessageBlock>}
                {isEmpty && <MessageBlock>This list is empty</MessageBlock>}
                {isLoading === false && (
                    <div>
                        <ChannelCard id={id} channel={channel} playListItem={playListItem[0]} />
                        {videoList.map((item, index) => {
                            if (!item) return <div key={index} />;
                            return <VideoCard key={index} src={item} />;
                        })}
                    </div>
                )}
            </Wrapper>
        </Flex>
    );
};

export default Root;
