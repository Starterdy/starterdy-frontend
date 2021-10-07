import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import CameraIcon from '../svg/CameraIcon';

const StudyJoinContent = styled.div`
    width : 100%;
    padding : 2em 1em;
    display : flex;
    justify-content: space-between;
    align-items:flex-start;
`;

const StudyJoinButtonBox = styled.div`
    display : flex;
    justify-content : flex-end;
    align-items: center;
    width : 100%;
    margin-top : 2em;
    position : absolute;
    bottom : 6em;
    right : 4em;
`;

const StudyJoinButton = styled.button`
    width : 120px;
    height : 50px;
    border-radius : 10px;
    background-color : ${(props)=>(props.type === "prev" ? "rgba(0,0,0,0)" : props.check === "ok" ? "#E8A2A8" : "#ddd")};
    color : ${(props)=>(props.type==="prev" ? "#555" : "#fff")};
    font-size : 1.1em;
    border : ${(props)=>(props.type === "prev" ? "1px solid #ddd" : "none")};
    cursor : pointer;
    transition : 0.3s;
    margin-left : 1em;
    pointer-events : ${(props)=>(props.type === "next" && props.check === "notOk" ? "none" : "all")};
    :hover{
        opacity : 0.5;
    }
`;

const StudyJoinProfileWrap = styled.div`
    width : 60%;
`;

const StudyJoinProfileItem = styled.div`
    width : 100%;
    height : 150px;
    margin-bottom : 2em;
`;

const StudyJoinProfileLabel = styled.p`
    font-size : 1.3em;
    font-weight : bold;
    margin-bottom : 1em;
`;

const StudyJoinProfileInput = styled.input`
    width : ${(props)=>(props.width === "name" ? "35%" : "80%")};
    font-size : 1.1em;
    padding : 1em;
    border : 2px solid #ddd;
    border-radius : 10px;
    transition : 0.3s;
    :focus {
        border-color : #E8A2A8;
    }
`;

const StudyJoinProfileImgWrap = styled.div`
    width : 35%;
`;

const StudyJoinProfileMsg = styled.p`
    margin-top : 0.5em;
    font-size : 0.9em;
    color : #aaa;
`;

const StudyJoinProfileInputWrap = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-between;
    align-items : flex-start;
`;

const StudyJoinProfileAddBox = styled.div`
    position : relative;
    overflow : hidden;
    width : 250px;
    height : 250px;
    border : 1px solid #ddd;
    border-radius : 10px;
    display : flex;
    justify-content : center;
    align-items : center;
    > svg {
        width : 50px;
        height : 50px;
    }
`;

const StudyJoinProfilePreviewBox = styled.div`
    margin : 0 1em;
    width : 250px;
    height : 250px;
    background-color : #ddd;
    border-radius : 10px;
    overflow : hidden;
    > img {
        width : 100%;
        height : 100%;
    }
`;

const StudyJoinProfileInputs = styled.input`
    position : absolute;
    top : 0;
    left : 0;
    opacity : 0;
    width : 100%;
    height : 100%;
    cursor : pointer;
`;

const StudyJoinProfile = (props)=>{
    // const info = props.info;
    const user = JSON.parse(localStorage.getItem("user"));
    const mod = props.mod;

    const setJoinPath = (value)=>{props.setJoinPath(value);}
    const PrevComponent=()=>{setJoinPath("2");}
    const NextComponent=()=>{setJoinPath("4");}

    const profileImg = useRef(null);
    const profileName = useRef(null);
    const profileIntro = useRef(null);

    const [userName,setUserName] = useState(user.user_name);
    const [userIntro,setUserIntro] = useState(user.profile);
    const [userImg,setUserImg] = useState("../"+user.profile_img);

    const getUserName = ()=>{
        const val = profileName.current.value;
        setUserName(val);
    }

    const getUserIntro = ()=>{
        const val = profileName.current.value;
        setUserIntro(val);
    }

    const StudyProfileChange = ()=>{
        const file = profileImg.current.files[0];
        const fileExpReg = /^.+\.(png||jpg||jpeg||PNG||JPG||JPEG)$/g;
        const fileExp = fileExpReg.test(file.name);
        if(!fileExp) return alert("jpg, jpeg, png 형식의 파일만 업로드 가능합니다.");

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = ()=>{
            setUserImg(reader.result);
        }
    }

    return(
        <>
            <StudyJoinContent mod={mod}>
                <StudyJoinProfileWrap>
                    <StudyJoinProfileItem>
                        <StudyJoinProfileLabel>프로필 이름</StudyJoinProfileLabel>
                        <StudyJoinProfileInput width="name" ref={profileName} type="text" value={userName} onChange={getUserName} />
                        <StudyJoinProfileMsg>* 비속어나 타인에게 불쾌감을 유발할 수 있는 이름은 사용하실 수 없습니다.</StudyJoinProfileMsg>
                    </StudyJoinProfileItem>
                    <StudyJoinProfileItem>
                        <StudyJoinProfileLabel>프로필 소개</StudyJoinProfileLabel>
                        <StudyJoinProfileInput type="text" ref={profileIntro} value={userIntro} onChange={getUserIntro} />
                        <StudyJoinProfileMsg>* 한 줄 소개를 입력하지 않은 경우 '한 줄 소개가 없습니다'라고 표시됩니다.</StudyJoinProfileMsg>
                    </StudyJoinProfileItem>
                </StudyJoinProfileWrap>
                <StudyJoinProfileImgWrap>
                    <StudyJoinProfileLabel>이미지 설정</StudyJoinProfileLabel>
                    <StudyJoinProfileInputWrap>
                        <StudyJoinProfileAddBox>
                            <StudyJoinProfileInputs type="file" ref={profileImg} onChange={StudyProfileChange} />
                            <CameraIcon/>
                        </StudyJoinProfileAddBox>
                        <StudyJoinProfilePreviewBox>
                            <img src={userImg} alt="user img" />
                        </StudyJoinProfilePreviewBox>
                    </StudyJoinProfileInputWrap>
                </StudyJoinProfileImgWrap>
            </StudyJoinContent>
            <StudyJoinButtonBox>
                <StudyJoinButton type="prev" onClick={PrevComponent}>이전</StudyJoinButton>
                <StudyJoinButton check="notOk" type="next" onClick={NextComponent}>등록</StudyJoinButton>
            </StudyJoinButtonBox>
        </>
    );
}

export default StudyJoinProfile;