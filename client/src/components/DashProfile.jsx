import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [ imageFile , setImageFile ] = useState(null);
    const [ imageFileUrl , setImageFileUrl ] = useState(null);
    const [ uploadingProgressBar , setUploadingProgressBar ] = useState(null);
    const [ uploadError , setUploadError ] = useState(null);
    const filePickerRef = useRef();

    const uploadImg = async()=> {
        setUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name ;
        const storageRef = ref(storage , fileName);
        const uploadTask = uploadBytesResumable(storageRef , imageFile);

        uploadTask.on(
            "state_changed",
            (snapShot)=> {
                const progress = (snapShot.bytesTransferred / snapShot.totalBytes * 100);
                setUploadingProgressBar(progress.toFixed(0));
            }, 
            (err)=> {
                setUploadError("Could not upload image(File must be less than 2Mb");
                setUploadingProgressBar(null);
                setImageFileUrl(null);
                setImageFile(null);
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                    setImageFileUrl(downloadURL);
                });
            }
        )
    }

    const handleChange = (e)=> {
        const  file = e.target.files[0];

        if(file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(()=> {
        if(imageFile) {
            uploadImg();
        }
    }, [imageFile]);
    return(
        <div className="max-w-lg mx-auto w-full md:border md:border-gray-200 md:shadow-lg md:rounded-lg md:p-4 my-10">
            { uploadError &&  <Alert color="failure">{ uploadError }</Alert> }
            <h1 className="text-3xl text-center font-bold my-7" >Profile</h1>
            <form className="flex flex-col gap-5" >
                <input type="file" id="profilePicture" accept="image/*" onChange={handleChange}  ref={filePickerRef} hidden/>
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-lg rounded-full" onClick={()=> filePickerRef.current.click()} >
                    { uploadingProgressBar && (
                        <CircularProgressbar value={uploadingProgressBar || 0} text={`${ uploadingProgressBar }%`} strokeWidth={5} styles={{ root : { width : '100%', height: '100%', position: 'absolute', top: 0, left : 0 }, path : { stroke : `rgba(62, 152, 199, ${uploadingProgressBar / 100})` }, }} />
                    ) }
                    <img 
                       src={ imageFileUrl || currentUser.profilePicture } 
                       alt="profile_picture" 
                       className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover overflow-hidden ${uploadingProgressBar && uploadingProgressBar < 100 && 'opacity-60'}`}
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