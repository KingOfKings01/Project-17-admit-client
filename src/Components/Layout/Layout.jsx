import { Outlet } from "react-router-dom";
import SideNav from "../SideNav";
// import Navbar from "../Navbar";

export default function Layout() {
    // const token = localStorage.getItem("token");
    return (
        <div className="">
            {<SideNav />}
            <main className="absolute top-4 right-4 rounded-lg h-[95vh] w-[80vw] bg-white" >
                <Outlet />
            </main>
        </div>
    );
}
