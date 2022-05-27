/*=====================================
    ShowMoreCard

    Author: Jhang
    CreateTime: 2022 / 05 / 26
=====================================*/

import styled from "styled-components";

const Wrapper = styled.div`
    margin: 20px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 16px;
    color: blue;
    background-color: #fff;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.16);
    cursor: pointer;
`;

const ShowMoreCard = (props: { onClick: () => void }) => {
    return <Wrapper onClick={props.onClick}>顯示更多影片...</Wrapper>;
};

export default ShowMoreCard;
