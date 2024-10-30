import { Outlet, Navigate } from "react-router-dom";
import SideNav from "../SideNav";

export default function Layout() {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            {<SideNav />}
            <main className="absolute overflow-auto  p-6 top-4 right-4 rounded-lg h-[95vh] w-[80vw] bg-white" >
                <Outlet />
            </main>
        </div>
    );
}
