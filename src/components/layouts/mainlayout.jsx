import { useContext } from "react";
import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import BaseContext from "../../contexts/BaseContext";
import Alert from "../alerts/Alert";

function MainLayout() {
    const { links, app } = useContext(BaseContext);

    document.title = app.name;

    return (
        <>
        <Alert />
        <HeaderLayout links={links} app={app} />
            <Outlet />
        <FooterLayout links={links} app={app} />
        </>
    )
}

export default MainLayout;