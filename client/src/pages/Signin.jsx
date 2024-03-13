import { Button, Label, TextInput , Spinner } from "flowbite-react";
import { Alert } from "flowbite-react";
import Brand from "../components/Brand";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

export default function Signin() {
    const [formData , setFormData] = useState([]);
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

        if(!formData.email || !formData.password ) {
            setLoading(false);
            return  setErrMsg("Please fill out all fields.");
        }
        try{
            setErrMsg(null);

            const response = await fetch(
            "/api/auth/signin", 
            {
                method: "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify( { user : formData} )
            },
        );
        if(response.ok) {
            navigate("/home");
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