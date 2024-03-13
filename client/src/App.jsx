import React from "react"
import { Suspense } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom"

// pages import
const Home = React.lazy(()=> import("./pages/Home"));
const About = React.lazy(()=> import("./pages/About"));
const Signin = React.lazy(()=> import("./pages/Signin"));
const Signup = React.lazy(()=> import("./pages/Signup"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Projects = React.lazy(()=> import("./pages/Projects"));

//components import 
import Header from "./components/Header";
import FooterComponent from "./components/Footer";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element={ <Suspense fallback={<div>Loading ...</div>}><Home /></Suspense> }/>
        <Route path="/about" element={ <Suspense fallback={<div>Loading ...</div>}> <About /> </Suspense> }/>
        <Route path="/signup" element={ <Suspense fallback={<div>Loading ...</div>} ><Signup /></Suspense> }/>
        <Route path="/signin" element={ <Suspense fallback={<div>Loading ...</div>} ><Signin /></Suspense> }/>
        <Route path="/dashboard" element={ <Suspense fallback={<div>Loading ...</div>} ><Dashboard /></Suspense> }/>
        <Route path="/projects" element={ <Suspense fallback={<div>Loading ...</div>}><Projects /></Suspense> }/>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}