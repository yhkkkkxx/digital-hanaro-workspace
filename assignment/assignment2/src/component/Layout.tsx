import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, getLocalStorageItem } from "./AuthContext";
import { StateType } from "../type/CommonType";
import hanaLogo from '../images/hana.png'
import '../styles/LayoutStyles.css'

function Layout() {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    let user:StateType = getLocalStorageItem("authState");

    //클릭 이벤트
    let handleLogoutClick = () => {
        dispatch({type:"LOGOUT", value:{userid:"", username:"", isLogin:false}});
        navigate('/', {state: {login:false, warningBox:false}});
    }
    

    return ( 
        <div className="layout-div">
            <nav className="layout-navbar">
            <div className="layout-navcontent">
                <h1 className="layout-left">디지털하나로 album</h1>
                {user.isLogin && <img className="layout-logo" src={hanaLogo}/>}
                <div className="layout-right" style={{"visibility":user.isLogin?"visible":"hidden"}}>
                    <p className="layout-user">user{user.userid} &nbsp; {user.username}님 &nbsp;&nbsp;&nbsp; </p>
                    <button className="layout-logout-btn" type="button" onClick={handleLogoutClick}>Logout</button>
                </div>
            </div>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Layout;
