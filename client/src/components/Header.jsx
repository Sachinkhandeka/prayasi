import { Avatar, Button, Dropdown, Modal, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation , useNavigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun } from "react-icons/fa";
import { HiCog, HiLogout, HiOutlineSearch, HiViewGrid } from 'react-icons/hi';
import Brand from "./Brand";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();
    const { currentUser } = useSelector( state => state.user );
    const { theme } = useSelector((state)=> state.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchTerm , setSearchTerm ] = useState('');
    const [ showModal , setShowModal ] = useState(false);

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

    //handle search 
    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);

    const handleSearch = (e)=> {
        e.preventDefault();
        setShowModal(false);
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    return(
        <>
        <Navbar className="border border-b-2" >
            <Brand className={"self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"} />
            <form onSubmit={handleSearch}>
                <TextInput 
                   type="text" 
                   placeholder="Search..." 
                   value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} 
                   rightIcon={ AiOutlineSearch } 
                   className="hidden md:block" 
                />
            </form>
            <Button className="md:hidden "  color="gray" pill onClick={()=> setShowModal(true)}  >
                <AiOutlineSearch />
            </Button>
            <Modal show={showModal} size={"md"} onClose={()=> setShowModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSearch} className="flex gap-4 flex-wrap items-center">
                        <TextInput 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} 
                            className="" 
                        />
                        <Button type="submit" onClick={handleSearch} ><HiOutlineSearch /></Button>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="flex items-center gap-4 md:order-2 " >
                <Button className="w-12 h-10 md:block" color="gray" pill onClick={()=> dispatch(toggleTheme())} > 
                    { theme === "dark" ? <FaSun /> : <FaMoon /> }
                </Button>
                { currentUser ? (
                    <Dropdown arrowIcon={false} inline  label={<Avatar alt="user" img={currentUser.profilePicture}rounded/>}>
                        <Dropdown.Header>
                            <span className="block text-sm my-4" ><Brand /></span>
                            <span className="block truncate text-sm font-medium " >@{ currentUser.username }</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile" >
                            <Dropdown.Item icon={HiViewGrid} as={"div"} >Dashboard</Dropdown.Item>
                        </Link>
                        <Link to="/settings">
                            <Dropdown.Item icon={HiCog} as={"div"}>Settings</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to="/home" >
                            <Dropdown.Item icon={HiLogout} as={"div"} onClick={handleSignout} >Sign out</Dropdown.Item>
                        </Link>       
                    </Dropdown>
                ) : (
                    <Link to="/signin" >
                        <Button gradientDuoTone={"purpleToBlue"} outline  >Sign in</Button>
                    </Link>
                ) }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse >
                <Navbar.Link active={ location.pathname === "/" } as={"div"} >
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={ location.pathname === "/about" } as={"div"} >
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={ location.pathname === "/blogs" } as={"div"} >
                    <Link to="/blogs">Blogs</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}