import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun } from "react-icons/fa";
import { HiCog, HiLogout, HiViewGrid } from 'react-icons/hi';
import Brand from "./Brand";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";


export default function Header() {
    const location = useLocation();
    const { currentUser } = useSelector( state => state.user );
    const { theme } = useSelector((state)=> state.theme);
    const dispatch = useDispatch();

    console.log(currentUser);
    return(
        <>
        <Navbar className="border border-b-2" >
            <Brand className={"self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"} />
            <form>
                <TextInput type="text" placeholder="Search..." rightIcon={ AiOutlineSearch } className="hidden md:block" />
            </form>
            <Button className="md:hidden " color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex items-center gap-4 md:order-2 " >
                <Button className="w-12 h-10 hidden md:block" color="gray" pill onClick={()=> dispatch(toggleTheme())} > 
                    { theme === "dark" ? <FaSun /> : <FaMoon /> }
                </Button>
                { currentUser ? (
                    <Dropdown arrowIcon={false} inline  label={<Avatar alt="user" img={currentUser.profilePicture}rounded/>}>
                        <Dropdown.Header>
                            <span className="block text-sm ml-8 my-4" ><Brand /></span>
                            <span className="block truncate text-sm font-medium " >@{ currentUser.username }</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tob=profile" >
                            <Dropdown.Item icon={HiViewGrid} >Dashboard</Dropdown.Item>
                        </Link>
                        <Link to="/settings">
                            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to="signout">
                            <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
                        </Link>       
                    </Dropdown>
                ) : (
                    <Link to="/signin" >
                        <Button gradientDuoTone={"purpleToBlue"} outline>Sign in</Button>
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
                <Navbar.Link active={ location.pathname === "/projects" } as={"div"} >
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}