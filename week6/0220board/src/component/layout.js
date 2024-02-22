import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    return ( 
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Home</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/board/posts">posts</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/board/todos">todos</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/board/users">users</NavLink>
                        </li>
                </ul>
                </div>
            </div>
            </nav>
            <Outlet/>
            <footer>@yhkkkkxx</footer>
        </div>
     );
}

export default Layout;