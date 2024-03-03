import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AlbumType } from "../type/CommonType";
import '../styles/AlbumListStyles.css'
import { AuthContext, getLocalStorageItem, setLocalStorageItem } from "./AuthContext";

function AlbumList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useContext(AuthContext);

    let [albumList, setAlbumList] = useState<AlbumType[]>([]);
    let [selectedItem, setSelectedItem] = useState<AlbumType>({"userId":"","id":"","title":"앨범을 선택하세요."})
    let [isSelectedItem, setIsSelectedItem] = useState<boolean>(false);

    let { username, isLogin } = getLocalStorageItem("authState");
    
    //로그인 완료 후 사용자 이름 가져오기
    useEffect(() => {
        const controller = new AbortController();
        let url = "https://jsonplaceholder.typicode.com/users?id="+location.state.userId;

        axios.get(url, { signal: controller.signal }) 
        .then(res => {
            username = res.data[0].username;
            setLocalStorageItem("authState", {userid:location.state.userId, username:username, isLogin:isLogin})
            dispatch({type:"LOGIN", value:{userid:location.state.userId, username:username, isLogin:true}});
        })
        .catch(err => console.log(err));

        return () => controller.abort();
    }, [location.state.userId]);


    //해당 사용자의 앨범 리스트 가져오기
    useEffect(() => {
        const controller = new AbortController();
        let url = 'https://jsonplaceholder.typicode.com/albums?userId='+location.state.userId;

        axios.get(url, {signal:controller.signal})
        .then(res => {  
            setAlbumList(res.data);
        })
        .catch(err => console.log(err));

        return () => controller.abort();
    }, [location.state.userId]);

    
    //클릭 이벤트 - 앨범 클릭
    let handleItemChange = (album:AlbumType) => { 
        setSelectedItem(album); 
        setIsSelectedItem(true);
    }

    //클릭 이벤트 - view 버튼 클릭
    let handleViewClick = () => { navigate('/album/detail', {state: selectedItem}); }


    return (  
        <div className='albumlist-div'>
            <h1  className='albumlist-user'>user{location.state.userId}의 album list</h1>
            <button className='albumlist-view-btn' type="button"
                    onClick={handleViewClick} disabled={!isSelectedItem}>view</button> <br />
            <div className="albumlist-alert">{selectedItem.title}</div>
            <div className="albumlist-list">
                <hr className="albumlist-hr"/>
                <ul className="albumlist-ul">
                    {
                        albumList.map((album:AlbumType) => {
                            return (
                            <li className={`albumlist-li ${selectedItem && selectedItem.id === album.id ? 'albumlist-selected' : ''}`}
                                key={album.id}
                                onClick={() => {handleItemChange(album)}}>{album.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default AlbumList;