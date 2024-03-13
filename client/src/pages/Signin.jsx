import { Button, Label, TextInput , Spinner } from "flowbite-react";
import { Alert } from "flowbite-react";
import Brand from "../components/Brand";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStarts , signInSuccess , signInFailure } from "../redux/user/userSlice";

export default function Signin() {
    const [formData , setFormData] = useState([]);
    const {loading , error : errMsg} = useSelector( state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e)=> {
        setFormData({
            ...formData , 
            [e.target.id] : e.target.value.trim(),
        });
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        dispatch(signInStarts());

        if(!formData.email || !formData.password ) {    
            return  dispatch(signInFailure("Please fill out all fields."));
        }
        try{
            const response = await fetch(
            "/api/auth/signin", 
            {
                method: "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify( { user : formData} )
            },
        );
        const data = await response.json();
        if(data.success === false) {
            return dispatch(signInFailure(data.message));
        }
        
        if(response.ok) {
            dispatch(signInSuccess(data));
            navigate("/");
        }
        } catch(err){
            dispatch(signInFailure(err.message));     
        }
    }
    return(
        <>
        <div className="min-h-screen mt-4 flex flex-col lg:flex-row justify-around items-center px-4 lg:px-10" >
            <div className="px-4 py-2 max-w-xl">
                <h1 className="text-4xl md:text-[4rem] font-bold underline whitespace-nowrap mb-[2rem]">Welcome to</h1>
                <Brand className={"font-bold dark:text-white text-xl md:text-4xl"} />
                <p className=" mt-4 md:mt-[2.5rem] text-gray-500 leading-8 text-lg" >Where your words find a home and your stories come to life. Start your journey of expression and connection today!</p>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-lg shadow-lg w-full mx-10 max-w-xl" >
                { errMsg && (
                   <Alert className="mt-5 max-w-lg mx-auto" color="failure"> { errMsg }</Alert>
                )}
                <form onSubmit={handleSubmit} className="px-10">
                    <div className="mt-6" >
                        <Label value="email" />
                        <TextInput 
                          type="text"
                          placeholder="name@gmail.com"
                          id="email"
                          onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <Label value="password" />
                        <TextInput
                          type="password"
                          placeholder="****************"
                          id="password"
                          onChange={handleChange}
                        />
                    </div>
                    <Button 
                       gradientDuoTone="purpleToPink" 
                       type="submit" className="w-full mt-6" 
                       disabled={loading} 
                    >
                        { loading ? (<><Spinner size="sm" /><span className="pl-3" >Loading ...</span></>) : 'Sign in' }
                    </Button>
                </form>
                <div className="flex gap-4 mt-5 text-sm">
                    <span>Don't have an Account?</span>
                    <Link to="/signup" className="text-blue-500">Sign up</Link>
                </div>
            </div>
        </div>
        </>
    )
}