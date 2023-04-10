import { Outlet } from "react-router-dom";
import HeaderLayout from "./header";
import FooterLayout from "./footer";
import { useContext } from "react";
import BaseContext from "../../contexts/base";
import AuthContext from "../../contexts/auth";

function MainLayout() {
    const { links, app } = useContext(BaseContext);
    const { logout } = useContext(AuthContext);

    document.title = app.name;

    return (
        <>
        <HeaderLayout links={links} app={app} logout={logout} />
            <Outlet />
        <FooterLayout links={links} app={app} />
        </>
    )
}

export default MainLayout;