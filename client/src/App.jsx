import React from "react"
import { Suspense } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom"
import { Spinner } from "flowbite-react";

// pages import
const Home = React.lazy(()=> import("./pages/Home"));
const About = React.lazy(()=> import("./pages/About"));
const Signin = React.lazy(()=> import("./pages/Signin"));
const Signup = React.lazy(()=> import("./pages/Signup"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Blogs = React.lazy(()=> import("./pages/Blogs"));
const UpdatePost = React.lazy(()=> import("./pages/UpdatePost"));
const PostPage = React.lazy(()=> import("./pages/PostPage"));
const Search = React.lazy(()=> import("./pages/Search"));
const Privacy = React.lazy(()=> import("./pages/Privacy"));
const CreatePost = React.lazy(()=> import("./components/CreatePost"));


//components import 
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";


export default function App() {
  
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
      <Header /> 
      <Routes>
        <Route path="/" element={ 
            <Suspense 
               fallback={
                  <div className="flex justify-center items-center min-h-screen gap-4" >
                    <Spinner size={"xl"} />
                    <div>Loading ...</div>
                  </div>
                }>
                  <Home />
            </Suspense> }/>
        <Route path="/about" element={ 
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
                }>
                  <About /> 
            </Suspense> }/>
        <Route path="/signup" element={ 
          <Suspense 
            fallback={
              <div className="flex justify-center items-center min-h-screen gap-4" >
                <Spinner size={"xl"} />
                <div>Loading ...</div>
              </div>
              }>
                <Signup />
          </Suspense> }/>
        <Route path="/signin" element={ 
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
              }>
                <Signin />
            </Suspense> }/>
        <Route element={ <PrivateRoute /> }>
          <Route path="/dashboard" element={ 
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
              }>
                <Dashboard />
            </Suspense> }/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />} >
          <Route path="/create-post" element={
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
              } >
                <CreatePost/>
          </Suspense>} />
          <Route path="/update-post/:postId" element={
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
              }>
                <UpdatePost />
            </Suspense>} />
        </Route>
        <Route path="/blogs" element={
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div>
              }>
                <Blogs />
            </Suspense> }/>
        <Route path="/post/:postSlug" element={ 
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div> 
              }>
                <PostPage />
            </Suspense> } />
        <Route path="/search" element={
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div> 
              }
            >
              <Search />
            </Suspense>
        } />
      <Route path="/privacy" element={
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen gap-4" >
                  <Spinner size={"xl"} />
                  <div>Loading ...</div>
                </div> 
              }
            >
              <Privacy />
            </Suspense>
        } />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}