import { useEffect, useState } from "react";
import moment  from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function PostComment({ comment , handleLike , onEdit , onDelete }) {
    const { currentUser } = useSelector(state => state.user);
    const [ user , setUser ] = useState({});
    const [ isEditCliked ,  setIsEditCliked ] = useState(false);
    const [ editedContent , setEditedContent ] = useState('');

    useEffect(()=> {
        const getComments = async()=> {
            try{
                const response = await fetch(`/api/user/${comment.author}`);
                const data = await response.json();

                if(!response.ok) {
                    console.log(data.message);
                    return ;
                }
                setUser(data);
            }catch(err) {
                console.log(err);
            }
        }
        getComments();
    }, [comment]);


    const handleEdit = () => {
        setIsEditCliked(true);
        // Initialize editedContent with the current comment content
        setEditedContent( comment.content);
    }

    const handleSave = async()=> {
        try {
            const response = await fetch(
                `/api/comment/edit/${comment._id}`,
                {
                    method : "PUT",
                    headers : { "Content-Type" : "application/json" },
                    body : JSON.stringify({ content : editedContent })
                });
                const data = await response.json();

                if(!response.ok) {
                    console.log(data.message);
                    return ; 
                }
            setIsEditCliked(false);
            onEdit(comment , editedContent);
        } catch(err) {
            console.log(err.message);
        }
    }
    return (
        <div className="flex items-center gap-3 p-4 border-b dark:border-b-gray-600 text-sm" >
            <div className="flex flex-shrink-0 mr-3" >
                <img src={user.profilePicture} alt={user.username} className="h-10 w-10 rounded-full bg-gray-200 object-cover"/>
            </div>
            <div className="flex-1" >
                <div className="flex items-center mb-1" >
                    <span className="font-bold mr-2 text-xs truncate" >@{ user ? user.username: 'annonymous user'}</span>
                    <span className="text-xs text-gray-500" >
                        { moment(comment.createdAt).fromNow() }
                    </span>
                </div>
                {
                    isEditCliked ? (
                        <>
                        <Textarea 
                        className="mb-2"
                        value={editedContent} 
                        onChange={(e)=> setEditedContent( e.target.value) } />
                        <div className="flex justify-end items-center gap-4 mt-4 p-1" >
                            <Button gradientDuoTone={"purpleToBlue"} onClick={handleSave} size={"sm"} outline >Save</Button>
                            <Button onClick={()=> setIsEditCliked(false)} size={"sm"} color="gray" >Cancel</Button>
                        </div>
                        </>
                    ) : (
                        <>
                        <p className="text-gray-500 mb-2" >{ comment.content }</p>
                        <div className="flex items-center justify-start gap-2 pt-3 text-xs border-t dark:border-t-gray-700 max-w-fit" > 
                        <button 
                            className={`${currentUser &&  comment.likes.includes(currentUser._id)? 'text-blue-500' : 'text-gray-400' } hover:text-blue-500`} 
                            type="button" 
                            onClick={()=> handleLike(comment._id)} >
                                <FaThumbsUp  className="text-sm "/>
                        </button>
                         <p  className="text-gray-400">
                        {
                            comment.numberOfLikes > 0  && comment.numberOfLikes + ' ' + 
                            (comment.numberOfLikes === 1 ? 'Like' : 'Likes')
                        }
                        </p>
                        {
                        currentUser && (currentUser._id === comment.author || currentUser.isAdmin) && 
                        (
                            <>
                                <button type="button" className="text-gray-400 hover:text-blue-500 hover:underline" onClick={handleEdit} >
                                    Edit
                                </button>
                                <button type="button" className="text-gray-400 hover:text-red-500 hover:underline" onClick={() => onDelete(comment._id)} >Delete</button>
                            </>
                        )
                        }
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}