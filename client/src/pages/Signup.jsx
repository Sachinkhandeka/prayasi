import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Alert } from "flowbite-react";
import Brand from "../components/Brand";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
import { signInStarts , signInFailure , signInSuccess } from "../redux/user/userSlice";
import { useSelector , useDispatch } from "react-redux";

export  default function Signup() {
    const [ formData , setFormData ] = useState([]);
    const {loading , error : errMsg} = useSelector( state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e)=> {
        setFormData({
            ...formData , 
            [e.target.id] : e.target.value.trim(),
        });
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        dispatch(signInStarts());

        if(!formData.username || !formData.email || !formData.password) {
            return  dispatch(signInFailure("Please fill out all fields."));
        }
        try{
            const response = await fetch(
            "/api/auth/signup", 
            {
                method: "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify( {user : formData} )
            },
        );
        const data = await response.json();
        if(response.ok) {
            dispatch(signInSuccess(data));
            navigate("/");
        }
        if(data.success === false) {
            return dispatch(signInFailure(data.message));
        }

        } catch(err){
            dispatch(signInFailure(err.message)); 
        }
    }
    return(
        <>
        <div className="min-h-screen pt-4 flex flex-col lg:flex-row justify-around items-center px-4 lg:px-10">
            <div className="px-4 py-2 max-w-xl " >
                <h1 className="text-4xl md:text-[4rem] font-bold underline whitespace-nowrap mb-[2rem]" >Welcome to</h1>
                <Brand className={"font-bold dark:text-white text-xl md:text-4xl"} />
                <p className=" mt-4 md:mt-[2.5rem] text-gray-500 leading-8 text-lg" >Where your words find a home and your stories come to life. Start your journey of expression and connection today!</p>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-lg shadow-lg w-full max-w-xl mx-10" >
                { errMsg && (
                   <Alert className="mt-5 max-w-lg mx-auto" color="failure"> { errMsg }</Alert>
                )
                }
                <form onSubmit={handleSubmit} className="px-10" >
                    <div className="mt-6" >
                       <Label value="Your username" />
                       <TextInput 
                         type="text"
                         placeholder="name_002"
                         id="username" 
                         onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6" >
                        <Label value="Your email" />
                        <TextInput 
                            type="email"
                            placeholder="name@gmail.com"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6">
                        <Label value="Your password" />
                        <TextInput 
                            type="password"
                            placeholder="*****************"
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <Button 
                       gradientDuoTone="purpleToPink" 
                       type="submit" className="w-full mt-6" 
                       disabled={loading} 
                    >
                        { loading ? (<><Spinner size="sm" /><span className="pl-3" >Loading ...</span></>) : 'Sign up' }
                    </Button>
                    <OAuth />
                </form>
                <div className="flex gap-2 mt-5 text-sm" >
                    <span>Have an Account?</span>
                    <Link to="/signin" className="text-blue-500"> Sign in </Link>
                </div>
            </div>
        </div>
        </>
    )
}