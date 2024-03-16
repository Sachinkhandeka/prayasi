import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser } from 'react-icons/hi';
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ tab , setTab ] = useState("");

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if(tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

     //handle signout 
     const handleSignout = async()=> {
        try {
            const response = await fetch(
                "api/user/signout",
                {
                    method : "POST",
                }
            );
            const data = await response.json();
            if(!response.ok) {
                console.log(data.message);
            }else {
                dispatch(signoutSuccess());
                navigate("/");
            }
        } catch(err) {
            console.log(err);
        }
    }
    return(
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
           <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile" >
                    <Sidebar.Item href="#" active={tab === "profile"} icon={HiUser} label={"User"} labelColor={"dark"} as={"div"}>Profile</Sidebar.Item>
                </Link>
                <Sidebar.Item href="#" icon={HiChartPie}>Blogs</Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox} label={"12"} labelColor={"dark"} >Inbox</Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={handleSignout} >Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    )
}