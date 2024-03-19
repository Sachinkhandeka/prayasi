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
        <div>
            <div>
                <img src={user.profilePicture} alt={user.username} className="h-10 w-10 rounded-full bg-gray-200 object-cover"/>
            </div>
            <div>
                <div>
                    <span className="font-bold mr-2 text-xs truncate" >@{ user ? user.username: 'annonymous user'}</span>
                    <span>
                        { moment(comment.createdAt).fromNow() }
                    </span>
                </div>
            </div>
        </div>
    )
}