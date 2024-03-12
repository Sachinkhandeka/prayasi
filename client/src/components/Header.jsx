import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import Brand from "./Brand";

export default function Header() {
    const location = useLocation();
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
                <Button className="w-12 h-10 hidden md:block" color="gray" pill > 
                    <FaMoon />
                </Button>
                <Link to="/signin" >
                    <Button gradientDuoTone={"purpleToBlue"} outline>Sign in</Button>
                </Link>
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