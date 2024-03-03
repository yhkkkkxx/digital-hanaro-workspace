import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PhotoType } from "../type/CommonType";
import axios from "axios";
import '../styles/PhotoListStyles.css'

function PhotoList() {
    const navigate = useNavigate();
    const location = useLocation();

    let [photoList, setPhotoList] = useState<PhotoType[]>([]);
    const { userId, id: albumId, title } = location.state;

    //클릭 이벤트 - back 버튼
    let handleBackClick = () => {navigate('/album/list', {state:{userId:userId}})}
    

    //해당 앨범 사진 가져오기
    useEffect(() => {
        const controller = new AbortController();
        
        let url = 'https://jsonplaceholder.typicode.com/photos?albumId='+albumId;

        axios.get(url, {signal:controller.signal})
        .then(res => {
            setPhotoList(res.data);
        })
        .catch(err => console.log(err));

        return () => controller.abort();
    },[albumId]);


    return (  
        <div className="photolist-div">
            <h1  className='photolist-user'>{albumId}번 앨범</h1>
            <h2  className='photolist-album'> 📸&nbsp; {title} </h2>
            <button className='photolist-back-btn' type="button"
                    onClick={handleBackClick}>back</button> <br />
            <hr className="photlist-hr"/>
            <div className="photolist-list">
                {
                    photoList.map((photo:PhotoType) => {
                        return (
                                <img className="photolist-photo" src={photo.thumbnailUrl} key={photo.id}/>
                        )
                    })
                }
            </div>
        </div>
    );

}

export default PhotoList;