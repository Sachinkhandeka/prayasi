import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    return(
        <div className="max-w-lg mx-auto w-full border border-gray-200 shadow-lg rounded-lg p-4 my-10">
            <h1 className="text-3xl text-center font-bold my-7" >Profile</h1>
            <form className="flex flex-col gap-5" >
                <div className="w-32 h-32 self-center cursor-pointer shadow-lg rounded-full" >
                    <img 
                       src={ currentUser.profilePicture } 
                       alt="profile_picture" 
                       className="rounded-full w-full h-full border-8 border-[lightgray] object-cover overflow-hidden" 
                    /> 
                </div>
                <TextInput type="text" placeholder={ currentUser.username } id="username" defaultValue={currentUser.username} />
                <TextInput type="text" placeholder={ currentUser.email } id="email" defaultValue={currentUser.email} />
                <TextInput type="password" placeholder="********" id="password" defaultValue="**********" />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline className="uppercase font-semibold" >Update</Button>
            </form>
            <div className="text-red-500 flex justify-between items-center my-10 px-4">
                <span className="cursor-pointer hover:underline" >Delete Account</span>
                <span className="cursor-pointer hover:underline" >Sign Out</span>
            </div>
            
        </div>
    )
}