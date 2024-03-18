import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Modal } from  "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck , FaTimes } from "react-icons/fa";

export default function DahsUsers() {
    const { currentUser } = useSelector(state => state.user);
    const [ success , setSuccess ] = useState(null);
    const [ error , setError ] = useState(null);
    const [ allUsers , setAllUsers ] = useState([]);
    const [ showMore , setShowMore ] = useState(true);
    const [ showModal , setShowModal ] = useState(false);
    const [ userToDelete , setUserToDelete ] = useState("");

    //fetch all users
    const fetchUsers = async()=> {
        try{
            setError(null);
            setSuccess(null);
            const response = await fetch("/api/user/getusers", { method : "GET" });
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return;
            }
            setAllUsers(data.users);
            if(data.users.length < 9 ) {
                setShowMore(false);
            }
        } catch(err) {
            setError(err.message);
        }
    }

    useEffect(()=> {
        if(currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    //handle show more functionality 
    const handleShowMore = async()=> {
        const startIndx  = allUsers.length ; 
        try {
            const response = await fetch(`/api/user/getusers/?startIndx=${startIndx}`);
            const data = await response.json();
            if(response.ok) {
                setUsersPosts((prev)=> [ ...prev , ...data.users]);
                if(data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch(err) {
            setError(err.message);
            return ; 
        }
    }

    //handle delete user function 
    const handleDeleteUser = async()=> {
        setShowModal(false);
        setError(null);
        setSuccess(null);
        try{
            const response = await fetch(`/api/user/deleteuser/${userToDelete}`, { method : "DELETE" });
            const  data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return; 
            } else  {
                setAllUsers((prev)=> {
                    return prev.filter((user)=> user._id !== userToDelete);
                });
                setSuccess("User deleted successfully");
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
                currentUser.isAdmin && allUsers &&  allUsers.length > 0 ? (
                    <>
                    <Table hoverable className="shadow-md" >
                        <Table.Head>
                            <Table.HeadCell>Date created</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        { allUsers.map((user)=> (
                            <Table.Body className="divide-y" key={user._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{ new Date( user.createdAt).toLocaleDateString() }</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/user/${user._id}`} >
                                            <img src={user.profilePicture} alt={user.username} className=" w-10 h-10 rounded-full object-cover bg-gray-500" />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/user/${user._id}`}  className="font-medium text-gray-900 dark:text-white" >
                                            { user.username }
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{ user.email }</Table.Cell>
                                    <Table.Cell>{ user.isAdmin  ? ( <FaCheck className="text-green-500" /> ) : ( <FaTimes className="text-red-500" /> )}</Table.Cell>
                                    <Table.Cell>
                                        <span 
                                           className="text-red-500 font-semibold hover:underline cursor-pointer"
                                           onClick={()=> {
                                            setShowModal(true);
                                            setUserToDelete(user._id);
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
                    <p>This has no users yet</p>
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
                            <Button color="failure" onClick={handleDeleteUser}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>    
        </div>
        </>
    );}