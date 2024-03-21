import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import CarouselCom from "../components/CarouselCom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
    const [ posts , setPosts ] = useState([]);

    const fetchPosts = async()=> {
        try {
            const response = await fetch("/api/post/getposts");
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
    useEffect(()=>{
        fetchPosts();
     },[]);
    return(
        <>
        <div className="h-full" >
            <CarouselCom />
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto" >
                <h1 className="text-3xl font-bold lg:text-6xl mt-10" >Welcome to <Brand /></h1>
                <p className="text-teal-500 font-mono leading-5 text-lg" >Where Every Story Finds Its Voice ...</p>
                <p className="font-mono leading-8 text-lg font-bold" >
                Discover the power of storytelling. 
                Dive into a world of narratives, insights, and inspirations. 
                Prayasi Blog is your canvas to express, explore, and engage 
                with a community passionate about the art of blogging. 
                Unleash your creativity, share your experiences, and connect 
                with like-minded souls. Join us on this journey of words, where 
                every story is a journey, and every voice is heard.
                </p>
                <Link to="/search" className="md:text-lg text-md  text-indigo-500 font-bold hover:underline" >View all blogs</Link>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700" >
                <CallToAction />
            </div>
            <div  className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7" >
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
            </div>
        </div>
        </>
    )
}