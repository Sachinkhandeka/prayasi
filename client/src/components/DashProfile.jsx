import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateStart,updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashProfile() {
    const { currentUser , error } = useSelector(state => state.user);
    const [ imageFile , setImageFile ] = useState(null);
    const [ imageFileUrl , setImageFileUrl ] = useState(null);
    const [ isImageUploading , setIsImageUploading ] = useState(false);
    const [ uploadingProgressBar , setUploadingProgressBar ] = useState(null);
    const [ uploadError , setUploadError ] = useState(null);
    const [ updateUserSuccess , setUpdateUserSuccess ] = useState(null);
    const [ updateUserError , setUpdateUserError ] = useState(null);
    const [ showModel , setShowModel ] = useState(false);
    const filePickerRef = useRef();
    const [ formData , setFormData ] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const uploadImg = async()=> {
        setIsImageUploading(true);
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
                setUploadError("Could not upload image(File must be less than 2Mb)");
                setUploadingProgressBar(null);
                setImageFileUrl(null);
                setImageFile(null);
                setIsImageUploading(false);
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, profilePicture :downloadURL});
                    setIsImageUploading(false);
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

    const handleFormData = (e)=> {
         setFormData({
            ...formData ,
            [e.target.id] : e.target.value ,
         });
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setUpdateUserSuccess(null);
        setUploadError(null);

        if(Object.keys(formData).length === 0) {
            setUpdateUserError("No changes detected for update user");
            return ;
        }
        if(isImageUploading) {
            setUpdateUserError("Please wait while image is uploading");
            return ; 
        }

        try {
            dispatch(updateStart);
            const response = await fetch( 
                `/api/user/update/${currentUser._id}`,
                {
                    method : "PUT",
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify(formData),
                }          
            );

            const data = await response.json();

            if(!response.ok) {
                dispatch(updateFailure(data.message));
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
            }

        } catch(err){
            dispatch(updateFailure(err.message));
        }
    }

    //delete functionality 
    const handleDeleteFunx = async()=> {
        setShowModel(false);
        try{
            dispatch(deleteStart);

            const response = await fetch(
                `/api/user/delete/${currentUser._id}`,
                {
                    method : "DELETE",
                }
            );

            const data = await response.json();

            if(!response.ok) {
                dispatch(deleteFailure(data.message));
            } else {
                dispatch(deleteSuccess(data));
                navigate("/");
            }
        }catch(err){
            dispatch(deleteFailure(err.message));
        }
    }
    return(
        <div className="max-w-lg mx-auto w-full md:border md:border-gray-200 md:shadow-lg md:rounded-lg p-4 my-10">
            { uploadError &&  <Alert color="failure" onDismiss={()=> setUploadError(null)}>{ uploadError }</Alert> }
            { updateUserSuccess && <Alert color={"success"} onDismiss={() => setUpdateUserSuccess(null) } >{ updateUserSuccess }</Alert> }
            { updateUserError && <Alert color={"failure"} onDismiss={()=> setUpdateUserError(null)} >{ updateUserError }</Alert> }
            { error && <Alert color={"failure"}> { error } </Alert> }
            <h1 className="text-3xl text-center font-bold my-7" >Profile</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} >
                <input type="file" id="profilePicture" accept="image/*" onChange={handleChange}  ref={filePickerRef} hidden/>
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-lg rounded-full" onClick={()=> filePickerRef.current.click()} >
                    { uploadingProgressBar && (
                        <CircularProgressbar 
                           value={uploadingProgressBar || 0} 
                           text={`${ uploadingProgressBar }%`} 
                           strokeWidth={5} 
                           styles={{ root : { width : '100%', height: '100%', position: 'absolute', top: 0, left : 0 }, path : { stroke : `rgba(62, 152, 199, ${uploadingProgressBar / 100})` }, }} 
                        />
                    ) }
                    <img 
                       src={ imageFileUrl || currentUser.profilePicture } 
                       alt="profile_picture" 
                       className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover overflow-hidden ${uploadingProgressBar && uploadingProgressBar < 100 && 'opacity-60'}`}
                    /> 
                </div>
                <TextInput type="text" placeholder={ currentUser.username } id="username" defaultValue={currentUser.username} onChange={handleFormData} />
                <TextInput type="text" placeholder={ currentUser.email } id="email" defaultValue={currentUser.email} onChange={handleFormData} />
                <TextInput type="password" placeholder="********" id="password" onChange={handleFormData} />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline className="uppercase font-semibold" >Update</Button>
            </form>
            <div className="text-red-500 flex justify-between items-center my-10 px-4">
                <span className="cursor-pointer hover:underline" onClick={()=> setShowModel(true)} >Delete Account</span>
                <span className="cursor-pointer hover:underline" >Sign Out</span>
            </div>
            <Modal show={showModel} onClose={()=> setShowModel(false)} popup size={"md"}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete your account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteFunx}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModel(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>    
        </div>
    )
}