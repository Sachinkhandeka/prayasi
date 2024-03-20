import { useEffect, useState } from "react"
import moment  from "moment";

export default function PostComment({ comment }) {
    const [ user , setUser ] = useState({});
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
                console.lof(err);
            }
        }
        getComments();
    }, [comment]);

    console.log(user);
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
                <p className="text-gray-500 mb-2" >{ comment.content } </p>
            </div>
        </div>
    )
}