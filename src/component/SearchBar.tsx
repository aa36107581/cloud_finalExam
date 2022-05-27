/*=====================================
    SearchBar

    Author: Jhang
    CreateTime: 2022 / 05 / 25
=====================================*/

import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import getData from "../service/youtube_data";
import { RootDispatch } from "../redux/configureStore";

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 5px 25px;
    width: 500px;
    height: 50px;
    border: solid 2px #666;
    border-radius: 30px;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    border-width: 0;
    outline: none;
    font-size: 20px;
`;

const SearchBar = () => {
    const dispatch: RootDispatch = useDispatch();
    const [keyword, setKeyword] = useState<string>("");

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.code === "Enter") {
            dispatch(getData.getPlayListItem({ id: keyword }));
            dispatch(getData.getTitle({ id: keyword }));
        }
    };

    return (
        <Wrapper>
            <Input
                placeholder="播放清單id"
                value={keyword}
                onChange={onInput}
                onKeyDown={handleKeydown}
            />
        </Wrapper>
    );
};

export default SearchBar;
