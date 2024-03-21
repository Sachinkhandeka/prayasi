import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Modal, Alert } from  "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck , FaTimes } from "react-icons/fa";

export default function DashComments() {
    const { currentUser } = useSelector(state => state.user);
    const [ success , setSuccess ] = useState(null);
    const [ error , setError ] = useState(null);
    const [ allComments , setAllComments ] = useState([]);
    const [ showMore , setShowMore ] = useState(true);
    const [ showModal , setShowModal ] = useState(false);
    const [ commentIdToDelete , setCommentIdToDelete ] = useState("");

    //fetch all users
    const fetchComments = async()=> {
        try{
            setError(null);
            setSuccess(null);
            const response = await fetch("/api/comment/getcomment", { method : "GET" });
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return;
            }
            setAllComments(data.comments);
            if(data.comments.length < 9 ) {
                setShowMore(false);
            }
        } catch(err) {
            setError(err.message);
        }
    }

    useEffect(()=> {
        if(currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    //handle show more functionality 
    const handleShowMore = async()=> {
        const startIndx  = allComments.length ; 
        try {
            const response = await fetch(`/api/comment/getcomment/?startIndx=${startIndx}`);
            const data = await response.json();
            if(response.ok) {
                setAllComments((prev)=> [ ...prev , ...data.comments]);
                if(data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch(err) {
            setError(err.message);
            return ; 
        }
    }
    //handle delete user function 
    const handleDeleteComment = async()=> {
        setShowModal(false);
        setError(null);
        setSuccess(null);
        try{
            const response = await fetch(`/api/comment/delete/${commentIdToDelete}`, { method : "DELETE" });
            const  data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return; 
            } else  {
                setAllComments((prev)=> {
                    return prev.filter((comment)=> comment._id !== commentIdToDelete);
                });
                setSuccess("Comment deleted successfully");
            }
        }
        catch(err){
            setError(err.message);
            return ;
        }

    }
    
    return  (
        <>
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 h-full" > 
            { error && ( <Alert color={"failure"} onDismiss={()=> setError(null)} className="mx-auto mb-4" >{ error }</Alert> ) }
            { success && ( <Alert color={"success"} onDismiss={()=> setSuccess(null)} className="mx-auto mb-4" >{ success }</Alert> ) }
            {
                currentUser.isAdmin && allComments &&  allComments.length > 0 ? (
                    <>
                    <Table hoverable className="shadow-md" >
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Number of likes</Table.HeadCell>
                            <Table.HeadCell>postId</Table.HeadCell>
                            <Table.HeadCell>userId</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        { allComments.map((comment)=> (
                            <Table.Body className="divide-y" key={comment._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{ new Date( comment.updatedAt).toLocaleDateString() }</Table.Cell>
                                    <Table.Cell>
                                        {comment.content}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.numberOfLikes}
                                    </Table.Cell>
                                    <Table.Cell>{ comment.postId }</Table.Cell>
                                    <Table.Cell>{comment.author}</Table.Cell>
                                    <Table.Cell>
                                        <span 
                                           className="text-red-500 font-semibold hover:underline cursor-pointer"
                                           onClick={()=> {
                                            setShowModal(true);
                                            setCommentIdToDelete(comment._id);
                                           }}
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        )) }
                    </Table>
                    { showMore && (
                        <button className="w-full  text-teal-500 self-center text-sm py-7" onClick={handleShowMore} >Show more</button>
                    )}
                    </>
                ) : (
                    <p>You have no comments yet</p>
                )}
                <Modal show={showModal} onClose={()=> setShowModal(false)} popup size={"md"}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteComment}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>    
        </div>
        </>
    );}