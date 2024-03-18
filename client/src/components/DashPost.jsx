import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Table, TableCell } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DahsPost() {
    const { currentUser } = useSelector(state => state.user);
    const [ userPosts , setUsersPosts ] = useState([]);
    const [ error , setError ] = useState(null);
    const [ showMore , setShowMore ] = useState(true);

    //fetch posts/blogs data from server
    const fetchPosts = async()=> {
        try{
            setError(null);
            const response = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ; 
            }
            setUsersPosts(data.posts);
            if(data.length < 9) {
                setShowMore(false);
            }

        }
        catch(err) {
            setError(err.message);
            return ;
        }
    }
    useEffect(()=> {
        if(currentUser.isAdmin) {
            fetchPosts();
        }
    },[currentUser._id]);

    const handleShowMore = async()=> {
        const startIndx = userPosts.length;
        try {
            const response = await fetch(`/api/post/getposts/?userId=${currentUser._id}&startIndx=${startIndx}`);
            const data = await response.json();
            if(response.ok) {
                setUsersPosts((prev)=> [ ...prev , ...data.posts]);
                if(data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch(err) {
            setError(err.message);
            return ; 
        }
    }
    return (
        <div 
          className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500" >
            { currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                <Table hoverable className="shadow-md" >
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Delete</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    { userPosts.map((post)=> (
                        <Table.Body className="divide-y" key={post.slug} >
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                <Table.Cell>{ new Date(post.updatedAt).toLocaleDateString() }</Table.Cell>
                                <Table.Cell>
                                    <Link to={`post/${post.slug}`}>
                                        <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                    </Link>
                                </Table.Cell>
                                <TableCell>
                                    <Link to={`/post/${post.slug}`} className="font-medium text-gray-900 dark:text-white" >{ post.title }</Link>
                                </TableCell>
                                <TableCell>{ post.category }</TableCell>
                                <TableCell>
                                    <span className="font-semibold text-red-500 hover:underline cursor-pointer" >Delete</span>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/update-post/${post._id}`} className="text-teal-500 font-semibold hover:underline " >
                                        <span>Edit</span>
                                    </Link>
                                </TableCell>
                            </Table.Row>
                        </Table.Body>
                    )) } 
                </Table>
                { showMore && (
                    <button className="w-full  text-teal-500 self-center text-sm py-7 hover:underline" onClick={handleShowMore} >Show more</button>
                ) }
                </>
            ) : (<p>"You have not create Posts yet"</p>) }
        </div>
    )
}