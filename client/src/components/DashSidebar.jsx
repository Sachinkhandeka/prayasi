import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiAnnotation, HiArrowSmRight, HiBookmark, HiChartBar, HiChartPie, HiInbox, HiOutlineBookOpen, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
    const { currentUser } = useSelector(state => state.user);
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
           <Sidebar.ItemGroup className="flex flex-col gap-2">
                <Link to="/dashboard?tab=profile">
                    <Sidebar.Item active={tab === "profile"} icon={HiUser} label={currentUser.isAdmin ? "Admin": "User"} labelColor={"dark"} as={"div"}>Profile</Sidebar.Item>
                </Link>
                {
                    currentUser.isAdmin && (
                        <Link to="/dashboard?tab=posts">
                            <Sidebar.Item active={tab === "posts"}  icon={HiOutlineBookOpen} as={"div"} >Blogs</Sidebar.Item>
                        </Link>
                         
                    )
                }
                {
                    currentUser.isAdmin && (
                        <>
                        <Link to="/dashboard?tab=users">
                            <Sidebar.Item active={tab === "users"} icon={HiOutlineUserGroup} as={"div"} >Users</Sidebar.Item>
                        </Link>
                        <Link to="/dashboard?tab=comments">
                            <Sidebar.Item active={tab === "comments"} icon={HiAnnotation} as={"div"}>Comments</Sidebar.Item>
                        </Link>
                        </>
                    )
                }
                <Sidebar.Item href="#" icon={HiInbox} label={"12"} labelColor={"dark"} >Inbox</Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={handleSignout} >Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    )
}