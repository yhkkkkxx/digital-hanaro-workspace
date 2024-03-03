import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import hanaLogo from '../images/hana.png'
import '../styles/LoginStyles.css';

function Login() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    let [userId, setUserId] = useState<string>("");
    let [msg, setMsg] = useState<string>("");

    //체인지 이벤트 - 아이디 입력창
    let handleUserIdChange = (e:any) => setUserId(e.target.value);

    //클릭 이벤트 - 로그인 버튼
    let handleLoginClick = () => {
        let useridNum = strictParseInt(userId);

        if(useridNum && useridNum >= 1 && useridNum <= 10) {
            setMsg("로그인 성공 🔑\n로그인 중입니다..");
            setTimeout(() => {navigate('/album/list', {state:{userId:userId}})}, 1000);
        }
        else if(userId == "") {
            setMsg("* ID를 입력해주세요.")
        }
        else {
            setMsg("* User ID는\n1~10 사이의 숫자만 가능합니다.");
            dispatch({type:"LOGOUT", value:{userid:"", username:"", isLogin:false}});
        }
    }
    //아이디가 숫자인지 확인
    let strictParseInt = (str:string) => {
        if (/^\d+$/.test(str)) return parseInt(str);
        else return NaN;
    }

    

    return ( 
        <div className="login-div">
            <img className="login-logo" src={hanaLogo}/>
            <h2 className="login-title">Welcome !</h2>
            <input className="login-input" type="text" placeholder="User ID" onChange={handleUserIdChange} value={userId}/> &nbsp;
            <button className="login-btn" type="button" onClick={handleLoginClick}>Login</button> <br/>
            <div className="login-msg">{msg}</div>
        </div>
        
    );
}

export default Login;