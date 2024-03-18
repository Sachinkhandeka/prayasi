import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Table, TableCell, Modal, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function DahsPost() {
    const { currentUser } = useSelector(state => state.user);
    const [ userPosts , setUsersPosts ] = useState([]);
    const [ error , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ showMore , setShowMore ] = useState(true);
    const [ showModal , setShowModal ] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

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
            if(data.posts.length < 9) {
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

    // show more functionality handler function 
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

    //delete post function 
    const handleDeletePost = async()=> {
        setShowModal(false);
        setError(null);
        try {
            const  response = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method : "DELETE",
                }
            );
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ;
            }else {
                setUsersPosts((prev)=> {
                    return prev.filter((post)=> post._id !== postIdToDelete);
                });
                setSuccess("Post Deleted Successfully");
            }
        } catch(err) {
            setError(err.message);
            return ; 
        }
    }
    return (
        <div 
          className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500" >
            { error && ( <Alert color={"failure"} onDismiss={()=> setError(null)} className="mx-auto mb-4" >{ error }</Alert> ) }
            { success && ( <Alert color={"success"} onDismiss={()=> setSuccess(null)} className="mx-auto mb-4" >{ success }</Alert> ) }
            { currentUser.isAdmin && userPosts && userPosts.length > 0 ? (
                <>
                <Table hoverable className="shadow-md" >
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>Edit</Table.HeadCell>
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
                                    <span 
                                       className="font-semibold text-red-500 hover:underline cursor-pointer" 
                                       onClick={()=> { setShowModal(true); setPostIdToDelete(post._id) }} 
                                    >
                                        Delete
                                    </span>
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
                    <button className="w-full  text-teal-500 self-center text-sm py-7" onClick={handleShowMore} >Show more</button>
                ) }
                </>
            ) : (<p>"You have not create Posts yet"</p> 
            )}
             <Modal show={showModal} onClose={()=> setShowModal(false)} popup size={"md"}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this post?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeletePost}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>    
        </div>
    );
}