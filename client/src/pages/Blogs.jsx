import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { HiArrowCircleRight } from "react-icons/hi";

export default function Blogs() {
    const [ posts , setPosts ] = useState([]);
    const [ techPosts , setTechPosts ] = useState([]);
    const [ healthPosts , setHealthPosts ] = useState([]);
    const [ educationPosts , setEducationPosts ] = useState([]);
    const [ environmentPosts , setEnvironmentPosts ] = useState([]);

    //recent posts posts
    const fetchPosts = async()=> {
        try {
            const response = await fetch("/api/post/getposts?limit=3");
            const data = await response.json();

            if(!response.ok) {
                console.log(data.messge);
                return;
            }
            setPosts(data.posts);
        } catch(err) {
            console.log(err.message);
        }
    }

    //recent techposts posts
    const fetchTechPosts = async()=> {
        try {
            const response = await fetch("/api/post/getposts?category=technology&limit=3");
            const data = await response.json();

            if(!response.ok) {
                console.log(data.messge);
                return;
            }
            setTechPosts(data.posts);
        } catch(err) {
            console.log(err.message);
        }
    }

    //recent education posts
    const handleEducationPosts = async()=> {
        try {
            const response = await fetch("/api/post/getposts?category=education&limit=3");
            const data = await response.json();

            if(!response.ok) {
                console.log(data.message);
                return;
            }
            setEducationPosts(data.posts);
        } catch(err) {
            console.log(err.message);

        }
    }

    //recent health posts
    const handleHealthPosts = async()=> {
        try {
            const response = await fetch("/api/post/getposts?category=health&limit=3");
            const data = await response.json();

            if(!response.ok)  {
                console.log(data.message);
                return;
            }
            setHealthPosts(data.posts);
        }catch(err) {
            console.log(err.message);
        }
    }

    //recent environment posts
    const handleEnvironmentPosts = async()=> {
        try {
            const response =  await fetch("/api/post/getposts?category=environment&limit=3");
            const data = await response.json();

            if(!response.ok) {
                console.log(data.message);
                return;
            }
            setEnvironmentPosts(data.posts);
        }catch(err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchPosts();
        fetchTechPosts();
        handleEducationPosts();
        handleHealthPosts();
        handleEnvironmentPosts();
     },[]);
    return(
        <>
        <div className="bg-gradient-to-b from-green-400 to-green-50 min-h-screen dark:from-gray-500 dark:to-gray-900">
            <h1 className="font-bold text-2xl font-mono uppercase text-center m-t4 p-3 dark:text-white" >Prayasi blogs</h1>
            <div className="w-[90%] bg-white mx-auto mt-20 p-4 dark:bg-gray-800 rounded-lg rounded-br-none rounded-bl-none">
                {
                    posts && posts.length > 0 && (
                        <div className="flex flex-col gap-6" >
                            <h2  className="text-2xl font-semibold text-center" >Recent posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                                { posts.map((post)=>(
                                    <PostCard key={post._id} post={post} />
                                )) }
                            </div>
                            <Link to={"/search"} className="text-lg text-teal-500 hover:underline text-center" >
                            View All Posts</Link>
                        </div>
                    )
                }
                <div className="w-[90%] mx-auto mt-20 p-4" >
                    <h1 className="text-3xl font-mono leading-6 font-bold whitespace-nowrap mb-8" >Blog Categories</h1>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4" >
                    <Link to="/search?category=technology" >
                        <div className="bg-red-300 hover:bg-red-400 text-center p-4 text-white font-semibold rounded-md" >Technology</div>
                    </Link>
                    <Link to="/search?category=travel" >
                        <div className="bg-indigo-300 hover:bg-indigo-400 text-center p-4 text-white font-semibold rounded-md" >Travel</div>
                    </Link>
                    <Link to="/search?category=health" >
                        <div className="bg-lime-300 hover:bg-lime-400 text-center p-4 text-white font-semibold rounded-md" >Health</div>
                    </Link>
                    <Link to="/search?category=food" >
                        <div className="bg-teal-300 hover:bg-teal-400 text-center p-4 text-white font-semibold rounded-md" >Food</div>
                    </Link>
                    <Link to="/search?category=fashion" >
                        <div className="bg-green-300 hover:bg-green-400 text-center p-4 text-white font-semibold rounded-md" >Fashion</div>
                    </Link>
                    <Link to="/search?category=art" >
                        <div className="bg-yellow-300 hover:bg-yellow-400 text-center p-4 text-white font-semibold rounded-md" >Arts</div>
                    </Link>
                    <Link to="/search?category=education" >
                        <div className="bg-orange-300 hover:bg-orange-400 text-center p-4 text-white font-semibold rounded-md" >Education</div>
                    </Link>
                    <Link  to="/search?category=environment" >
                        <div className="bg-blue-300 hover:bg-blue-400 text-center p-4 text-white font-semibold rounded-md" >Environment</div>
                    </Link>
                        </div>
                </div>
                <div className="w-[90%] mx-auto mt-20 p-4" >
                    <h1 className="text-3xl font-mono leading-6 font-bold whitespace-nowrap mb-8" >Tech Blogs</h1>
                    <Link to={"/search"} className="text-lg text-teal-500 hover:underline mb-4 text-end flex gap-2 items-center" >
                       View All Posts
                       <HiArrowCircleRight />
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                        { techPosts.map((techPost)=>(
                            <PostCard key={techPost._id} post={techPost} />
                        )) }
                    </div>    
                </div>
                <div className="w-[90%] mx-auto mt-20 p-4" >
                    <h1 className="text-3xl font-mono leading-6 font-bold whitespace-nowrap mb-8" >Education Blogs</h1>
                    <Link to={"/search"} className="text-lg text-teal-500 hover:underline mb-4 text-end flex gap-2 items-center" >
                       View All Posts
                       <HiArrowCircleRight />
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                        { educationPosts.map((educationPost)=>(
                            <PostCard key={educationPost._id} post={educationPost} />
                        )) }
                    </div>    
                </div>
                <div className="w-[90%] mx-auto mt-20 p-4" >
                    <h1 className="text-3xl font-mono leading-6 font-bold whitespace-nowrap mb-8" >Health Blogs</h1>
                    <Link to={"/search"} className="text-lg text-teal-500 hover:underline mb-4 text-end flex gap-2 items-center" >
                       View All Posts
                       <HiArrowCircleRight />
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                        { healthPosts.map((healthPost)=>(
                            <PostCard key={healthPost._id} post={healthPost} />
                        )) }
                    </div>    
                </div>
                <div className="w-[90%] mx-auto mt-20 p-4" >
                    <h1 className="text-3xl font-mono leading-6 font-bold whitespace-nowrap mb-8" >Environment Blogs</h1>
                    <Link to={"/search"} className="text-lg text-teal-500 hover:underline mb-4 text-end flex gap-2 items-center" >
                       View All Posts
                       <HiArrowCircleRight />
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                        { environmentPosts.map((environmentPost)=>(
                            <PostCard key={environmentPost._id} post={environmentPost} />
                        )) }
                    </div>    
                </div>    
            </div>  
        </div>
        </>
    )
}