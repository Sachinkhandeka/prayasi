import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from  "flowbite-react";

export default function DahsUsers() {
    const { currentUser } = useSelector(state => state.user);
    const [ success , setSuccess ] = useState(null);
    const [ error , setError ] = useState(null);
    const [ allUsers , setAllUsers ] = useState([]);
    const [ showMore , setShowMore ] = useState(true);

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
        fetchUsers();
    }, [currentUser._id]);
    console.log(allUsers);
    
    return  (
        <>
        <div>
            {
                currentUser.isAdmin && allUsers &&  allUsers.length > 0 ? (
                    <>
                    <Table hoverable className="shadow-md" >
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>User name</Table.HeadCell>
                            <Table.HeadCell>User emaail</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>Edit</Table.HeadCell>
                        </Table.Head>
                    </Table>
                    </>
                ) : (
                    <p>No Users Found</p>
                )
            }
        </div>
        </>
    )
}