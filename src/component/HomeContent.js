import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import HomeToggleBackground from '../svg/HomeToggleBackground';
import HomeToggle from '../svg/HomeToggle';
import DescIcon from '../svg/DescIcon';
import AscIcon from '../svg/AscIcon';
import ErrorCharacter from '../image/ErrorCharacter.png';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';

const ContentLeftHeader = styled.div`
  display : flex;
  align-items: center;
  justify-content : center;
  padding : 0 1em;
`;

const ContentSubTitle = styled.p`
  color : #aaa;
  font-weight :bold;
`;

const HomeContentStyled = styled.div`
 background-color : ${(props)=>(props.mod === "light" ? "#ffffff" : "#1F1F1F")}};
 transition : 0.3s;
 color : ${(props)=>(props.mod === "light" ? "#333" : "#f5f5f5")};
 svg > path {
  transition : 0.3s;
 }
`;

const ContentSort = styled.div`
  display : flex;
  justify-content : flex-start;
  align-items : center;
  margin-left : 2em
`;

const ContentSortItem = styled.button`
  font-weight : bold;
  transition : 0.3s all;
  color : ${(props)=>(props.mod === "light" ? props.select ? "#333" : "#555" : props.select ? "#fff" : "#aaa")};
  border : none;
  background-color : rgba(0,0,0,0);
  margin : 0 1em;
  cursor : pointer;
  font-size : 1em;
  border-bottom : 3px solid ${(props)=>(props.select ? "#E8A2A8" : "rgba(0,0,0,0)" )};
`;

const ContentRightHeader = styled.div`
  display : flex;
  justify-content : flex-end;
  align-items : center;
  height : 100%;
`;

const MakeStudyBtn = styled.button`
  padding : 0.5em 2em;
  border : 1px solid ${(props)=>(props.mod === "light" ? "#cbcbcb" : "#fff")};
  border-radius : 10px;
  color : ${(props)=>(props.mod === "light" ? "#333" : "#fff")};
  font-size : 1em;
  font-weight : bold;
  background-color :rgba(0,0,0,0);
  transition : 0.3s;
  cursor : pointer;
  :hover{opacity : 0.5;}
  margin-left : 1em;
`;

const HomeFindToggle = styled.div`
 margin : 0 1em;
 display : flex;
 justify-content:center;
 align-items : center;
`;

const HomeFindToggleTitle = styled.p`
 margin-right : 0.5em;
`;

const HomeFindToggleWrap = styled.div`
 position : relative;
 display : flex;
 justify-content:center;
 align-items :center;
 > svg{cursor : pointer;}
 > svg:last-child{
   position:absolute;
   left : ${(props)=>props.accept === "on" ? "3px" : "26px"};
   top : 2.5px;
   transition : 0.3s;
 }
`;

const HomeContentSortWrap = styled.div`
 display : flex;
 justify-content : center;
 align-items : center;
 cursor : pointer;
`;

const HomeContentSortTitle = styled.p`
 margin-right : 0.5em;
`;

const ErrorTitle = styled.p`
 font-size : 1.5em;
 font-weight :bold;
 color : #aaa;
`;

const ErrorMsg = styled.div`
 display : flex;
 flex-direction : column;
 justify-content : center;
 align-items : center;
 margin : 0 auto;
 opacity : 0.5;
 height : 100%;
 width : 100%;
`;

const HomeContentItem = styled.div`
 width : 300px;
 height : 250px;
 margin : 20px 30px;
 border-radius : 20px;
 overflow : hidden;
 display : flex;
 flex-direction : column;
 border : 1px solid ${(props)=>(props.mod === "light" ? "#ddd" : "#fff")};
 cursor : pointer;
 transition : 0.3s;
 :hover{
   opacity : 0.5;
 }
`;

const ContentImgWrap = styled.div`
 width : 100%;
 height : 160px;
 overflow : hidden;
 > img{
  width : 100%;
  min-height : 100%;
}
`;

const ContentInfoWrap = styled.div`
 width : 100%;
 height : 90px;
 position : relative;
 border-top : 1px solid ${(props)=>(props.mod === "light" ? "#ddd" : "#fff")};
 background-color : ${(props)=>(props.mod === "light" ? "#fff" : "#333")};
 display : flex;
 justify-content :center;
 align-items : center;
 transition : 0.3s;
`;

const ContentCate = styled.div`
 width : 150px;
 height : 30px;
 border-radius : 20px;
 color : #fff;
 text-align : center;
 line-height:30px;
 position : absolute;
 background-color : ${(props)=>(props.cateColor)};
 top : -15px;
`;

const ContentTitle = styled.p`
 width : 100%;
 white-space : nowrap;
 overflow : hidden;
 text-overflow : ellipsis;
 padding : 0 0.5em;
 text-align : center;
 font-size : 1.2em;
 font-weight : bold;
 color : ${(props)=>(props.mod === "light" ? "#333" : "#fff")};
 transition : 0.3s;
`;

const HomeContent = (props) =>{
  const searchWord = props.searchWord;
  const searchCate = props.searchCate;
  const mod = props.mod;
  const history = useHistory();
  const [contentSection,setContentSection] = useState("??????");
  const [contentSort,setContentSort] = useState("????????????");
  const [contentSortAccept,setContentSortAccept] = useState("on");
  const [RoomList,setRoomList] = useState([]);

  const getContentSortAccept = () =>{setContentSortAccept(contentSortAccept === "on" ? "off" : "on");}
  const getContentSort = ()=>{
    setRoomList(RoomList.reverse());
    setContentSort(contentSort === "????????????" ? "????????????" : "????????????");
  }
  const getContentSection = (val)=>{
    let value = val.target.innerText;
    if(value === "?????????") RoomSort("idx");
    if(value === "?????????" || value === "??????") RoomSort("good");
    if(value === "?????????") RoomSort("hit");

    if(contentSort === "????????????") RoomList.reverse();
    setContentSection(value);
  }

  const RoomSort = (key)=>{
    RoomList.sort((a,b)=>{
      if(a[key] <= b[key]) return 1;
      else return -1;
    });
  }

  const SearchRoomList = (list)=>{
    let roomList = list;
    if(searchWord === "" && searchCate === "") return false;
    if(searchWord !== ""){
      roomList = roomList.filter((room)=>{return room['title'].indexOf(searchWord) > -1});
      setRoomList(roomList);
    }

    if(searchCate !== ""){
      roomList = roomList.filter((room)=>{return room['category'] === searchCate});
      setRoomList(roomList);
    }
  }

  const CateList = [
    {
      key : "??????",
      backgroundColor : "#59AFE8"
    },
    {
      key : "?????????",
      backgroundColor : "#F46F6F"
    },
    {
      key : "?????????",
      backgroundColor : "#81D86E"
    },
    {
      key : "??????",
      backgroundColor : "#777777"
    },
    {
      key : "??????",
      backgroundColor : "#495E81"
    },
    {
      key : "??????",
      backgroundColor : "#F49B88"
    },
    {
      key : "??????",
      backgroundColor : "#3AB014"
    },
    {
      key : "?????????",
      backgroundColor : "#EBC30D"
    },
    {
      key : "??????/??????",
      backgroundColor : "#D68EFD"
    }
  ];

  const LoadRoomList = async () =>{
    await axios.post('/api/studyListLoad')
          .then((res)=>{
            setRoomList(res.data);
            SearchRoomList(res.data);
          });
  }

  useEffect(()=>{
    LoadRoomList();
  },[searchWord,searchCate]);

  const ContentHeader = (props)=>{
    return(
      <div className="content_header">
        <ContentLeftHeader>
          <h5 className="content_title">{props.title}</h5>
          <ContentSubTitle>({props.subTitle})</ContentSubTitle>
          
          <ContentSort>
            <ContentSortItem select={contentSection === "??????"} onClick={getContentSection.bind("??????")} mod={mod}>??????</ContentSortItem>
            <ContentSortItem select={contentSection === "?????????"} onClick={getContentSection.bind("?????????")} mod={mod}>?????????</ContentSortItem>
            <ContentSortItem select={contentSection === "?????????"} onClick={getContentSection.bind("?????????")} mod={mod}>?????????</ContentSortItem>
            <ContentSortItem select={contentSection === "?????????"} onClick={getContentSection.bind("?????????")} mod={mod}>?????????</ContentSortItem>
          </ContentSort>

        </ContentLeftHeader>

        <ContentRightHeader>
          <HomeFindToggle>
            <HomeFindToggleTitle>????????? ?????? ???????????? ??????</HomeFindToggleTitle>
            <HomeFindToggleWrap accept={contentSortAccept} onClick={getContentSortAccept}>
              <HomeToggleBackground set={contentSortAccept} />
              <HomeToggle/>
            </HomeFindToggleWrap>
          </HomeFindToggle>

          <HomeContentSortWrap onClick={getContentSort}>
            <HomeContentSortTitle>{contentSort}</HomeContentSortTitle>
	      		{contentSort === "????????????" ? <DescIcon mod={mod} /> : <AscIcon mod={mod} />}
          </HomeContentSortWrap>
          
          <Link to='/5/makeRoom'><MakeStudyBtn mod={mod}>??? ?????????</MakeStudyBtn></Link>
        </ContentRightHeader>
      </div>
    );
  }

  const MakeError = (props)=>{
    return(
      <ErrorMsg>
        <img src={ErrorCharacter} alt="error" />
        <ErrorTitle>{props.title}</ErrorTitle>
      </ErrorMsg>
    );
  }

  const CateSearch = (cate) =>{
    let val = "";
    CateList.forEach(x=>{if(x.key === cate) val = x.backgroundColor;});
    return val;
  }

  const LoadRoom = async(e)=>{
    const idx = e.currentTarget.dataset.idx;
    await axios.post('/api/setStudyHit',{
      idx : idx
    })
    .then((res)=>{
      history.push(`/5/studyRoom/${idx}`);
    });
  }
  
  return(
    <HomeContentStyled id="content" mod={mod}>
      <section>
        <ContentHeader mod={mod} title="????????????" subTitle={RoomList.length} />
        <div className="content_body">
        {
          RoomList.length ? RoomList.map(room => (
              <HomeContentItem mod={mod} key={room.idx} onClick={LoadRoom} data-idx = {room.idx}>
                <ContentImgWrap>
                  {room.banner_img ? <img src={"upload/"+room.banner_img} alt="roog img" /> : "" }             
                </ContentImgWrap>
                <ContentInfoWrap mod={mod}>
                  <ContentCate cateColor={CateSearch(room.category)}>
                    {room.category}
                  </ContentCate>
                  <ContentTitle mod={mod}>
                    {room.title}
                  </ContentTitle>
                </ContentInfoWrap>
              </HomeContentItem>
          )) : <MakeError title="??????????????? ?????? ??? ????????????!"/>
        }
        </div>
      </section>
    </HomeContentStyled>
  );
}

export default HomeContent;
