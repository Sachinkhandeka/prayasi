import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [ comment , setComment ] = useState('');
    const [ error , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ commentData , setCommentData ] = useState({});

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
                    body : JSON.stringify( { content : comment , postId , userId : currentUser._id })
                }
            );

            const  data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ;
            }
            setComment('');
            setCommentData(data);
            setSuccess("Comment added successfully");

        } catch(err) {
            setError(err.message);
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
                            <Textarea placeholder="Add a comment" rows="3" maxLength='200' value={comment} onChange={(e)=> setComment(e.target.value)}/>
                            <div className="flex justify-between items-center mt-5" >
                                <p className={`text-green-500 text-xs ${200 - comment.length === 0 ? 'text-red-500':''} ${200 - comment.length <= 50 && 200 - comment.length> 0 ? 'text-yellow-400':''}`} >
                                    {(200 - comment.length )} characters remaining
                                </p>
                                <Button outline gradientDuoTone={"purpleToBlue"} type="submit" >Submit</Button>
                            </div>
                        </form>
                    )
                }
          </div>
        </>
    )
}