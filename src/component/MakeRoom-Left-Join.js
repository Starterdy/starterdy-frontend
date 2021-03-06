import React, { useState , useEffect} from 'react';
import styled from 'styled-components';

const LeftJoinWrap = styled.div`
    width : 90%;
    height : 90%;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items: flex-start
`;

const LeftJoinTitle = styled.h3`
    font-size : 1.5em;
    font-weight :bold;
    transition : 0.3s;
    margin: 1em 0;
    color : ${(props)=>(props.mod === "light" ? "#333" : "#fff")};
`;

const LeftJoinPreviewWrap = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items: flex-start;
    * {
        color : ${(props)=>(props.mod === "light" ? "#333" : "#fff")};
        transition : 0.3s;
    }
`;

const RoomCate = styled.p`
    width : 100%;
    text-align : right;
    font-size : 1.1em;
    ${(props)=>(props.data === "yes" ? "color : #aaa !important;" : "" )}
`;

const RoomName = styled.h3`
    font-size : 1.4em;
    font-weight : bold;
    margin : 1em 0;
    ${(props)=>(props.data === "yes" ? "color : #aaa !important;" : "" )}
`;

const RoomIntro = styled.textarea`
    background-color : rgba(0,0,0,0);
    border : none;
    width : 100%;
    height : 250px;
    overflow : auto;
    font-size : 1.1em;
    margin-bottom : 1em;
    pointer-events : normal;
    resize : none;
    ${(props)=>(props.data === "yes" ? "color : #aaa !important;" : "" )}
`;

const RoomCondition = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
    justify-content : flex-start;
    align-items : flex-start;
    margin-top : 1em;
`;

const RoomConditionTitle = styled.p`
    font-size : 1.2em;
    font-weight : bold;
    margin-bottom : 1em;
`;

const RoomConditionItem = styled.div`
    margin : 0.7em 0;
    display : flex;
    flex-direction : ${(props)=>(props.type === "other" ? "column" : "rows")};
    justify-content : flex-start;
`;

const RoomConditionLabel = styled.p`
    font-size : 1em;
    font-weight : bold;
    color : #aaa !important;
    margin-right : 1em;
    ${(props)=>(props.type === "other" ? "margin-bottom : 0.5em;" : "" )}
`;

const RoomConditionValue = styled.p`
    font-size : 1em;
    ${(props)=>(props.data === "yes" ? "color : #aaa !important;" : "" )}
    ${(props)=>(props.type === "other" ? "margin : 0.5em 0;" : "")}
`;

const LeftJoin = (props) =>{
    const mod = props.mod;
    const [makeRoomSetting] = useState(props.makeRoomSetting);
    const [birth2] = useState(makeRoomSetting.room_condition.room_birth[1]);
    const [birth1] = useState(makeRoomSetting.room_condition.room_birth[0]);
    const [cate] = useState(makeRoomSetting.room_cate);
    const [name] = useState(makeRoomSetting.room_name);
    const [join_intro] = useState(makeRoomSetting.room_join_intro);
    const [gender] = useState(makeRoomSetting.room_condition.room_gender);

    useEffect(()=>{
    },[makeRoomSetting]);

    return(
        <LeftJoinWrap>
            <LeftJoinTitle mod={mod}>????????????</LeftJoinTitle>
            <LeftJoinPreviewWrap mod={mod}>
                <RoomCate  data={cate === "" ? "yes" : "no"}>#{cate === "" ? "????????????" : cate}</RoomCate>
                <RoomName  data={name === "" ? "yes" : "no"}>{name ==="" ? "???????????? ??????" : name}</RoomName>
                <RoomIntro onChange={()=>{}} disabled data={join_intro === "" ? "yes" : "no"}  value={join_intro === "" ? "?????? ??????????????????." : join_intro}></RoomIntro>
                <RoomCondition>
                    <RoomConditionTitle>?????? ??????</RoomConditionTitle>
                    <RoomConditionItem>
                        <RoomConditionLabel>??????</RoomConditionLabel>
                        <RoomConditionValue key={birth1} data={birth1 === "" && birth2 === "" ? "yes" : "no"}>{birth1 === "" && birth2 === "" ? "?????? ??????????????????." : birth1 === "" ? `${birth2}??? ??????` : birth2 === "" ? `${birth1}??? ??????` : birth1 === birth2 ? `${birth1}???` :`${birth1}??? ~ ${birth2}???`}</RoomConditionValue>
                    </RoomConditionItem>
                    <RoomConditionItem>
                        <RoomConditionLabel>??????</RoomConditionLabel>
                        <RoomConditionValue key={gender} data={gender === "" ? "yes" : "no"}>{gender === "" ? "?????? ??????????????????." : gender}</RoomConditionValue>
                    </RoomConditionItem>
                </RoomCondition>
            </LeftJoinPreviewWrap>
        </LeftJoinWrap>
    );
}

export default LeftJoin;
