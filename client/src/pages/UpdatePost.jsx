import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage , getDownloadURL, ref , uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdatePost() {
    const { currentUser } = useSelector(state => state.user);
    const [ file ,setFile ] = useState(null);
    const [ imageUploadProgress , setImageUploadProgress ] = useState(null);
    const [ imageUploadError , setImageUploadError ] = useState(null);
    const [ formData , setFormData ] = useState({});
    const [ submitError , setSubmitError ] = useState(null);
    const [ submitSuccess , setSubmitSuccess ] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();

    //file upload functionality
    const handleUploadImg = async()=> {
        try{
            if(!file) {
                setImageUploadError("Please select an image");
                return ; 
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage , fileName);
            const uploadTask = uploadBytesResumable(storageRef, file );
            uploadTask.on(
                'state_changed',
                (snapshot)=> {
                    const progress = ( snapshot.bytesTransferred / snapshot.totalBytes * 100) ;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (err) => {
                    setImageUploadError(err.message);
                    setImageUploadProgress(null);
                },
                ()=> {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({
                            ...formData,
                            image : downloadURL,
                        });
                    });
                },
            );
        }catch(err) {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
        }
    }

    //get the data of post
    useEffect(()=> {
        try {
            setSubmitError(null);
            setSubmitSuccess(null);
            const fetchPost = async()=> {
                const response = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await response.json();
    
                if(!response.ok) {
                    setSubmitError(data.posts.message);
                        return;
                    }
                if(response.ok) {
                    setFormData(data.posts[0]);
                }
            }
            fetchPost();
         } catch(err) {
            setSubmitError(err.message);
            return;
        }

    },[postId]);

    //handle form submit 
    const handleSubmit = async(e)=> {
        e.preventDefault();
        try{
            setSubmitError(null);
            setSubmitSuccess(null);
            if(!currentUser) {
                setSubmitError("Can't update post without user");
                return ;
            }

            if(!currentUser.isAdmin) {
                setSubmitError("You are not allowed to update this blog post");
                return ;
            }
            setFormData({ ...formData , author : currentUser._id });
            const blog = formData ; 
            if(!blog) {
                setSubmitError("Please provide all required field data.");
                return ; 
            }
            const response = await fetch(
                `/api/post/updatepost/${formData._id}/${currentUser._id}`,
                {
                    method : "PUT",
                    headers : { "Content-Type" : "application/json" },
                    body : JSON.stringify(blog)
                }
            );
            const data = await response.json();
            if(!response.ok) {
                setSubmitError(data.message);
                return ;
            }
            setSubmitSuccess("Blog Post updated Successfully");
            navigate(`/post/${data.slug}`);
        } catch(err) {
            setSubmitError(err.message);
            return ;
        }
    }
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen" >
            <p className="text-center leading-5 mt-7 font-mono text-gray-500 dark:text-teal-500">"Writing is the painting of the voice."</p>
            <h1 className="text-center text-3xl my-7 font-semibold underline" >Update a Post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" value={formData.title} id="title" className="flex-1" onChange={(e)=> setFormData({...formData , title : e.target.value})} required />
                    <Select onChange={(e)=> setFormData({...formData , category : e.target.value})} value={formData.category} >
                        <option value="technology">Technology</option>
                        <option value="travel">Travel</option>
                        <option value="health">Health and Wellness</option>
                        <option value="food">Food and Recipes</option>
                        <option value="fashion">Fashion and Beauty</option>
                        <option value="finance">Finance and Money Managment</option>
                        <option value="art">Arts and Culture</option>
                        <option value="education">Education and Learning</option>
                        <option value="environment">Environment and Sustainability</option>
                    </Select>
                </div>
                {
                    imageUploadError && ( <Alert color="failure" onDismiss={()=> setImageUploadError(null)}>{ imageUploadError }</Alert> )
                }
                {
                    formData.image && (
                        <img src={formData.image} alt="blog-post-image" className="w-full h-72 object-cover"/>
                    )
                }
                <div className="flex items-center gap-4 justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>
                    <Button 
                       type="button" 
                       gradientDuoTone={"tealToLime"} 
                       size={"sm"} 
                       outline 
                       onClick={handleUploadImg}
                       disabled={imageUploadProgress}
                    >
                        {
                            imageUploadProgress ?
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div> : 
                            'Upload image'
                        }
                    </Button>
                </div>
                <ReactQuill 
                   theme="snow" 
                   placeholder="Write something here" 
                   className="h-72 mb-12" 
                   required 
                   onChange={(value)=> setFormData({ ...formData , content : value })} 
                   value={formData.content}
                />
                <Button type="submit" gradientDuoTone={"pinkToOrange"} outline >Update post</Button>
                {
                    submitError && (
                    <Alert color={"failure"} onDismiss={()=> setSubmitError(null)} >{ submitError }</Alert>
                    )
                }
                {
                    submitSuccess && (
                    <Alert color={"success"} onDismiss={()=> setSubmitSuccess(null)} >{ submitSuccess }</Alert>
                    )
                }
            </form>    
        </div>
    )
}