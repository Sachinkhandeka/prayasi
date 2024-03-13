import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Alert } from "flowbite-react";
import Brand from "../components/Brand";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

export  default function Signup() {
    const [ formData , setFormData ] = useState([]);
    const [ errMsg , setErrMsg ] = useState(null);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=> {
        setFormData({
            ...formData , 
            [e.target.id] : e.target.value.trim(),
        });
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        setLoading(true);

        if(!formData.username || !formData.email || !formData.password) {
            setLoading(false);
            return  setErrMsg("Please fill out all fields.");
        }
        try{
            setErrMsg(null);

            const response = await fetch(
            "/api/auth/signup", 
            {
                method: "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify( {user : formData} )
            },
        );
        if(response.ok) {
            navigate("/signin");
        }
        const data = await response.json();
        if(data.success === false) {
            setLoading(false);
            return setErrMsg(data.message);
        }
        setLoading(false);

        } catch(err){
            setErrMsg(err.message);
            setLoading(false);
        }
    }
    return(
        <>
        <div className="min-h-screen mt-4 flex flex-col md:flex-row justify-around items-center px-4 md:px-10">
            <div className="px-4 py-2 max-w-xl " >
                <h1 className=" text-4xl md:text-[4rem] font-bold underline whitespace-nowrap mb-[2rem]" >Welcome to</h1>
                <Brand className={"font-bold dark:text-white text-xl md:text-4xl"} />
                <p className=" mt-4 md:mt-[2.5rem] text-gray-500 leading-8 text-lg" >Where your words find a home and your stories come to life. Start your journey of expression and connection today!</p>
            </div>
            <div className="border border-gray-200 px-6 py-4 rounded-lg shadow-lg w-full mx-10" >
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
                            placeholder="passowrd"
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