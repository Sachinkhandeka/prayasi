import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser } from 'react-icons/hi';

export default function DashSidebar() {
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
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
           <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile" >
                    <Sidebar.Item href="#" active={tab === "profile"} icon={HiUser} label={"User"} labelColor={"dark"} as={"div"}>Profile</Sidebar.Item>
                </Link>
                <Sidebar.Item href="#" icon={HiChartPie}>Blogs</Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox} label={"12"} labelColor={"dark"} >Inbox</Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    )
}