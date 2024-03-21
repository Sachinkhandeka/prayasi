import { Link } from "react-router-dom";

export default  function PostCard ({post})  {
    return (
        <>
        <div className="group relative w-full border border-teal-500 hover:border-2 transition-all h-[400px] overflow-hidden rounded-lg p-4 object-contain" >
            <Link to={`/post/${post.slug}`} >
                <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
            </Link>
            <div className="flex flex-col gap-4" >
                <p className="text-xl font-semibold line-clamp-2" >{ post.title }</p>
                <span className="text-sm italic" >{  post.category }</span>
                <Link to={`/post/${post.slug}`} className=" w-[95%] z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 r-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-3" >
                     Read article
                </Link>
            </div>
        </div>
        </>
    )
}