import { Alert, Button, Textarea , Modal} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostComment from "./PostComment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [ content , setContent ] = useState('');
    const [ error , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ commentData , setCommentData ] = useState([]);
    const navigate = useNavigate();
    const [ commentToDeleteId , setCommentToDeleteId ] = useState(null);
    const [ showModal , setShowModal ] = useState(false);

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const response =  await fetch(
                "/api/comment/create",
                {
                    method : "POST",
                    headers : { "Content-Type" : "application/json" },
                    body : JSON.stringify( { content, postId , userId : currentUser._id })
                }
            );

            const  data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ;
            }
            setContent('');
            setSuccess("Comment added successfully");
            setCommentData([data, ...commentData]); 

        } catch(err) {
            setError(err.message);
        }
    }
    useEffect(()=>{
        const getComments = async()=> {
            setError(null);
            setSuccess(null);
            try{
                const response = await fetch(`/api/comment/getcomment/${postId}`);
                const data = await response.json();

                if(!response.ok) {
                    setError(data.message);
                    return;
                }
                setCommentData(data);
            } catch(err)  {
                setError(err.message);
            }
        }
        getComments();
    },[postId]);

    // handle like function 
    const handleLike = async(commentId)=> {
        try {
            setError(null);
            setSuccess(null);

            if(!currentUser) {
                navigate("/signin");
                return;
            }
            const response = await fetch(`/api/comment/like/${commentId}` , { method : "PUT" });
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ; 
            }
            setCommentData(commentData.map(comment => 
                comment._id === commentId ? {
                    ...comment,
                    likes : data.likes,
                    numberOfLikes : data.numberOfLikes,
                } : comment 
            ));

        } catch(err) {
            setError(err.message);
        }
    }

    //edit comment function 
    const handleEdit = async( comment, editedContent) => {
        try { 
            setCommentData(commentData.map(c => 
                    c._id === comment._id ? {
                        ...comment,
                        content : editedContent,
                    } : c       
            ));
        } catch(err) {
            console.log(err);
        }
    }
     //delete comment function 
     const handleDelete = async(commentId)=> {
        try{
            setShowModal(false);
            const response = await fetch(
                `/api/comment/delete/${commentId}`,
                {
                    method : "DELETE",
                }
            );
            const data = response.json();
            if(response.ok) {
                setCommentData(commentData.filter( c => c._id !== commentId ));
            } else {
                console.log(data.message);
            }
        } catch(err){
            console.log(err);
        } 
    }
    return(
        <>
        <div className="max-w-4xl w-full mx-auto p-3" >
            {
                currentUser ? (
                    <div className="flex items-center mx-auto justify-start gap-1 my-5 text-slate-500 dark:text-white text-sm" >
                        <p>Signed in as : </p>
                        <img src={ currentUser.profilePicture } alt={currentUser.username} className="h-8 w-8 rounded-full object-cover" />
                        <Link to={"/dashboard?tab=profile"} className="text-xs text-cyan-600 hover:underline" >
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : 
                (
                    <div className="text-sm text-teal-500 my-5 flex gap-2" >
                        Please signup/login first to add comment.
                        <Link to={"/signin"} className="text-blue-500 hover:underline" >
                            Sign in
                        </Link>
                    </div>
                )}
                { error && ( <Alert color={"failure"} onDismiss={ ()=> setError(null) } className="my-4" > { error } </Alert> ) }
                { success && ( <Alert color={"success"} onDismiss={ ()=> setSuccess(null) } className="my-4" >{ success } </Alert> ) }
                {
                    currentUser && (
                        <form className="border border-teal-500 rounded--md p-3" onSubmit={handleSubmit} >
                            <Textarea placeholder="Add a comment" rows="3" maxLength='200' value={content} onChange={(e)=> setContent(e.target.value)}/>
                            <div className="flex justify-between items-center mt-5" >
                                <p className={`text-green-500 text-xs ${200 - content.length === 0 ? 'text-red-500':''} ${200 - content.length <= 50 && 200 - content.length> 0 ? 'text-yellow-400':''}`} >
                                    {(200 - content.length )} characters remaining
                                </p>
                                <Button outline gradientDuoTone={"purpleToBlue"} type="submit" >Submit</Button>
                            </div>
                        </form>
                    )
                }
                { commentData.length === 0 ? (
                    <p className="text-sm my-5" >No comments yet!</p>
                ): (
                <>
                    <div className="flex justify-start items-center gap-2 p-3 mt-5" >
                        <p>Comments</p>
                        <div className="border border-slate-500 py-1 px-3 rounded-sm" >
                            <p>{ commentData.length }</p>
                        </div>
                    </div>
                    { commentData.map((comment)=> (
                        <PostComment 
                            key={comment._id} 
                            comment={comment} 
                            handleLike={handleLike} 
                            onEdit={handleEdit} 
                            onDelete={(commentId)=>{
                                setShowModal(true) ;
                                setCommentToDeleteId(commentId);
                            }} 
                        />
                    )) }
                </>
            ) }
            <Modal show={showModal} onClose={()=> setShowModal(false)} popup size={"md"}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={()=> handleDelete(commentToDeleteId)}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> 
        </div>
        </>
    )
}