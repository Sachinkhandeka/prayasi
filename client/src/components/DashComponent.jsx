import { Alert, Button, Table, TableCell } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashComponent() {
    const { currentUser } = useSelector(state => state.user);
    const [ users , setUsers ] = useState([]);
    const [ totalUsers , setTotalUsers ] = useState(0);
    const [ lastMonthUsers , setLastMonthUsers ] = useState(0);
    const [ blogPost , setBlogPost ] = useState([]);
    const [ totlaBlogPost , setTotalBlogPost ] = useState(0);
    const [ lastMonthBlogPosts , setLastMonthBlogPosts ] = useState(0);
    const [ comments , setComments ] = useState([]);
    const [ totalComments , setTotalComments ] = useState(0);
    const [ lastMonthComments , setLastMonthComments ] = useState(0);
    const [ error , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);

    //get user data
    const fetchUser = async()=> {
        try {
            setError(null);
            const response = await fetch( "/api/user/getusers?limit=5");
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return;
            }
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setLastMonthUsers(data.lastMonthsUsers);
        } catch(err) {
            setError(err.message);
        }
    }

    //fetch all blog post data 
    const fetchBlogPost = async()=> {
        try {
            setError(null);
            const response = await fetch("/api/post/getposts?limit=5");
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ;
            }
            setBlogPost(data.posts);
            setTotalBlogPost(data.totalPost);
            setLastMonthBlogPosts(data.lastMonthPost);
        } catch(err) {
            setError(err.message);
        }
    }

    //fetch all comments data 
    const fetchComments = async()=> {
        try {
            setError(null);
            const response = await fetch("/api/comment/getcomment?limit=5");
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return ; 
            }

            setComments(data.comments);
            setTotalComments(data.totalComments);
            setLastMonthComments(data.lastMonthComments);
        } catch(err) {
            setError(err.message);
        }
    }

    useEffect(()=> {
        if(currentUser.isAdmin) {
            try{
               fetchUser();
               fetchBlogPost();
               fetchComments();
               setSuccess(`Welcome ${currentUser.username}. We have fetched all data for you!`);
            } catch(err) {
                setError(err.message);
            }
        }
    },[currentUser]);

    return (
        <>
        <div className="my-4 w-full md:w-[70%] md:mx-auto" >
            { error && ( <Alert color={"failure"} onDismiss={ ()=> setError(null) } >{ error }</Alert> ) }
            { success && ( <Alert color={"success"} onDismiss={ ()=> setSuccess(null) } >{ success }</Alert> ) }
        </div>
        <div className="p-3 md:mx-auto" >
            <div className="flex flex-wrap gap-5 justify-center md: w-full" >
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 lg:w-72 w-full rounded-md border border-slate-100 shadow-lg" >
                    <div className="flex justify-between" >
                        <div className="" >
                            <h3 className="text-gray-500 text-md uppercase" >Total Users</h3>
                            <p className="text-2xl" >{ totalUsers }</p>
                        </div>
                        <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg"  />      
                    </div>
                    <div className="flex gap-2 text-sm" >
                        <span className={`${ lastMonthUsers === 0 ? 'text-black' : 'text-green-500' } flex items-center`} >
                            { lastMonthUsers === 0 ? '' : <HiArrowNarrowUp /> }
                            { lastMonthUsers }
                        </span>
                        <div className="text-gray-500 " >Last month</div>
                    </div>
                </div>
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 lg:w-72 w-full rounded-md border border-slate-100 shadow-lg" >
                    <div className="flex justify-between" >
                        <div className="" >
                            <h3 className="text-gray-500 text-md uppercase" >Total Posts</h3>
                            <p className="text-2xl" >{ totlaBlogPost }</p>
                        </div>
                        <HiAnnotation className="bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg"  />      
                    </div>
                    <div className="flex gap-2 text-sm" >
                        <span className={`${lastMonthBlogPosts === 0 ? 'text-black': 'text-green-500'} flex items-center`} >
                            { lastMonthBlogPosts === 0 ? '': <HiArrowNarrowUp /> }
                            { lastMonthBlogPosts }
                        </span>
                        <div className="text-gray-500 " >Last month</div>
                    </div>
                </div>
                <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 lg:w-72 w-full rounded-md border border-slate-100 shadow-lg" >
                    <div className="flex justify-between" >
                        <div className="" >
                            <h3 className="text-gray-500 text-md uppercase" >Total Comments</h3>
                            <p className="text-2xl" >{ totalComments }</p>
                        </div>
                        <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg"  />      
                    </div>
                    <div className="flex gap-2 text-sm" >
                        <span className={`${ lastMonthComments === 0 ? 'text-gray': 'text-green-500' } flex items-center`} >
                            { lastMonthComments === 0 ? '': <HiArrowNarrowUp /> }
                            { lastMonthComments }
                        </span>
                        <div className="text-gray-500 " >Last month</div>
                    </div>
                </div>
            
            </div>  
            <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center" >
                <div className="flex flex-col w-full md:w-auto border border-slate-100 shadow-md rounded-md p-2 dark:bg-gray-800" >
                <div className="flex justify-between p-3 text-sm font-semibold" >
                    <h1 className="text-center p-2" >Recent users</h1>
                    <Button gradientDuoTone={"purpleToPink"} outline >
                        <Link to="/dashboard?tab=users" >Sell All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User Image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {
                        users && users.map((user)=> (
                            <Table.Body key={user._id} className="devide-y" >
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                    <Table.Cell>
                                        <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full bg-gray-500" />
                                    </Table.Cell>
                                    <Table.Cell>{ user.username }</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                    }
                </Table>
                </div>
                <div className="flex flex-col w-full md:w-auto border border-slate-100 shadow-md rounded-md p-2 dark:bg-gray-800" >
                <div className="flex justify-between p-3 text-sm font-semibold" >
                    <h1 className="text-center p-2" >Recent Comments</h1>
                    <Button gradientDuoTone={"purpleToPink"} outline >
                        <Link to="/dashboard?tab=users" >Sell All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comment content</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>
                    {
                        comments && comments.map((comment)=> (
                            <Table.Body key={comment._id} className="devide-y" >
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                    <Table.Cell className="w-96" >
                                         <p className="line-clamp-2" >{ comment.content }</p>
                                    </Table.Cell>
                                    <Table.Cell>{ comment.numberOfLikes }</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                    }
                </Table>
                </div>
                <div className="flex flex-col w-full md:w-auto border border-slate-100 shadow-md rounded-md p-2 dark:bg-gray-800" >
                <div className="flex justify-between p-3 text-sm font-semibold" >
                    <h1 className="text-center p-2" >Recent Posts</h1>
                    <Button gradientDuoTone={"purpleToPink"} outline >
                        <Link to="/dashboard?tab=users" >Sell All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                    </Table.Head>
                    {
                        blogPost && blogPost.map((post)=> (
                            <Table.Body key={post._id} className="devide-y" >
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                    <Table.Cell>
                                        <img src={post.image} alt={post.title} className="w-16 h-10 rounded-md bg-gray-500" />
                                    </Table.Cell>
                                    <Table.Cell className="w-96" >{ post.title }</Table.Cell>
                                    <Table.Cell className="w-5" >{ post.category }</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                    }
                </Table>
                </div>
            </div>
        </div>  
                  
        </>   
    )
}