import { Button, Label, TextInput } from "flowbite-react";
import Brand from "../components/Brand";
import { Link } from "react-router-dom";

export  default function Signup() {
    return(
        <>
        <div className="min-h-screen mt-4 flex flex-col lg:flex-row justify-around items-center px-4 lg:px-10">
            <div className="px-4 py-2 max-w-xl " >
                <h1 className=" text-4xl md:text-[4rem] font-bold underline whitespace-nowrap mb-[2rem]" >Welcome to</h1>
                <Brand className={"font-bold dark:text-white text-xl md:text-4xl"} />
                <p className=" mt-4 md:mt-[2.5rem] text-gray-500 leading-8 text-lg" >Where your words find a home and your stories come to life. Start your journey of expression and connection today!</p>
            </div>
            <div className="w-full lg:w-auto px-4 py-2 max-w-xl" >
                <div className="border border-gray-200 px-8 py-4 rounded-sm shadow-lg w-full" >
                <form>
                    <div className="mt-6" >
                       <Label value="Your username" />
                       <TextInput 
                         type="text"
                         placeholder="name_002"
                         id="username"
                        />
                    </div>
                    <div className="md:flex md:gap-4 mt-6">
                        <div>
                            <Label value="Your firstName" />
                            <TextInput 
                              type="text"
                              placeholder="Rohit"
                              id="firstName"
                            />
                        </div>
                        <div className="mt-6 md:mt-0" >
                            <Label value="Your lastName" />
                            <TextInput 
                               type="text"
                               placeholder="Sharma"
                               id="lastName"
                            />
                        </div>
                    </div>
                    <div className="mt-6" >
                        <Label value="Your email" />
                        <TextInput 
                            type="email"
                            placeholder="name@gmail.com"
                            id="email"
                        />
                    </div>
                    <div className="mt-6">
                        <Label value="Your password" />
                        <TextInput 
                            type="password"
                            placeholder="passowrd"
                            id="password"
                        />
                    </div>
                    <Button gradientDuoTone="purpleToPink" type="submit" className="w-full mt-6" >Sign up</Button>
                </form>
                <div className="flex gap-2 mt-5 text-sm" >
                    <span>Have an Account?</span>
                    <Link to="/signin" className="text-blue-500"> Sign in </Link>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}