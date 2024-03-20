import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
    const { postSlug } = useParams();
    const [ loading , setLoading ] = useState(true);
    const [ post , setPost ] = useState(null);
    const [  recentPost , setRecentPost ] = useState(null);

    const fetchPost = async()=> {
        try{
            setLoading(true);
            const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
            const data = await response.json();

            if(!response.ok) {
                setLoading(false);
                return ; 
            }
            if(response.ok) {
                setPost(data.posts[0]);
                setLoading(false);
                return ;
            }
        } catch(err) {
            setLoading(false);
            return ;
        }
    }

    //fetch recent posts function
    const fetchRecentPost = async()=> {
        try {
            setLoading(true);
            const response = await fetch("/api/post/getposts?limit=3");
            const data = await response.json();

            if(response.ok) {
                setRecentPost(data.posts);
            } else {
                setLoading(false);
            }
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(()=> {
        if(postSlug) {
            fetchPost();
            fetchRecentPost();
        }
    },[postSlug]);

    if(loading) return(
        <div className="flex justify-center items-center min-h-screen gap-4" >
            <Spinner size={"xl"} />
            <div>Loading ...</div>
        </div>
     );
    return(
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen" >
            <h1 className="text-3xl mt-10 p-3 text-center font-serif font-semibold max-w-2xl mx-auto lg:text-4xl leading-relaxed" >
                { post && post.title }
            </h1>
            <Link to={`/search?categor=${post.category}`} className="self-center mt-5">
               <Button gradientMonochrome={"lime"} pill className="text-bold font-mono leading-6 text-3xl dark:text-black">
                   {
                    post && post.category
                   }
               </Button>
            </Link>
            <img src={ post && post.image } alt={ post ? post.title : 'blog_post_img' } className="mt-10 p-3 max-h-[600px]  w-full object-cover" />
            <div className="flex justify-between items-center p-3 border-b border-slate-500 w-full max-w-4xl mx-auto text-xs" >
                <span className="text-slate-500" >{ post && new Date(post.createdAt).toLocaleDateString() }</span>
                <span className="text-slate-500 italic" >{ post && (post.content.length / 1000 ).toFixed(0) } mins to read</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: post && post.content}} className="p-3 w-full max-w-4xl mx-auto leading-9 post-content" ></div>
            <div className="max-w-4xl mx-auto w-full" >
                <CallToAction />
            </div>
            <CommentSection postId={post._id} />
            <div className="flex flex-col justify-center items-center mb-5" >
                <h1 className="text-xl mt-5" >Recent articles</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center" >
                    {
                        recentPost && (
                            recentPost.map((post)=> (
                                <PostCard key={post._id} post={post} />
                            ))
                        )
                    }
                </div>
            </div>
        </main>
    )
}