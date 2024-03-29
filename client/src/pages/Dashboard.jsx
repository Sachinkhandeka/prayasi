import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DahsPost from "../components/DashPost";
import DahsUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashComponent from "../components/DashComponent";

export default function Dashboard() {
    const location = useLocation();
    const [ tab , setTab ] = useState("");

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if(tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return(
        <div className="min-h-screen flex flex-col md:flex-row" >
            <div className="md:w-56" >
                {/* sidebar ...*/}
                <DashSidebar />
            </div>
            <div className="w-full" >
                {/* Dashboard componet ... */}
                { tab === "dashboard" ? <DashComponent /> : '' }
                {/* profile ...*/}
                { tab === "profile" ? <DashProfile/> : '' }
                {/* posts ...*/}
                { tab === "posts" ? <DahsPost /> : '' }
                {/* users ... */}
                { tab === "users" ? <DahsUsers /> : '' }
                {/* comments ... */}
                { tab === "comments" ? <DashComments /> : '' }
            </div>
        </div>
    )
}