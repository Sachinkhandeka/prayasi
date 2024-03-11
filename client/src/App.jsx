import React from "react"
import { Suspense } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom"
const Home = React.lazy(()=> import("./pages/Home"));
const About = React.lazy(()=> import("./pages/About"));
const Signin = React.lazy(()=> import("./pages/Signin"));
const Signup = React.lazy(()=> import("./pages/Signup"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Projects = React.lazy(()=> import("./pages/Projects"));

export default function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={ <Suspense fallback={<div>Loading ...</div>}><Home /></Suspense> }/>
        <Route path="/about" element={ <Suspense fallback={<div>Loading ...</div>}> <About /> </Suspense> }/>
        <Route path="/signup" element={ <Suspense fallback={<div>Loading ...</div>} ><Signup /></Suspense> }/>
        <Route path="/signin" element={ <Suspense fallback={<div>Loading ...</div>} ><Signin /></Suspense> }/>
        <Route path="/dashboard" element={ <Suspense fallback={<div>Loading ...</div>} ><Dashboard /></Suspense> }/>
        <Route path="/projects" element={ <Suspense fallback={<div>Loading ...</div>}><Projects /></Suspense> }/>
       </Routes>
    </BrowserRouter>
    </>
  )
}