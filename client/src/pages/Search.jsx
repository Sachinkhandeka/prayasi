import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const [ sidebarData , setSidebarData ] = useState({
        searchTerm : '',
        sort : 'desc',
        category : 'uncategorized',
    });
    const [ posts , setPosts ] = useState([]);
    const [ loading , setLoading ] = useState(false);
    const [ shoowMore , setShowMore ] = useState(false);

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categorFromUrl = urlParams.get('category');

        if(searchTermFromUrl || sortFromUrl || categorFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm : searchTermFromUrl,
                sort : sortFromUrl,
                category : categorFromUrl,
            });
        }

        //fetch all posts based on sidebarData
        const fetchPosts = async()=> {
            try{
                setLoading(true);
                const searchQuery = urlParams.toString();
                const response  = await fetch(`/api/post/getposts?${searchQuery}`);
                const data = await response.json();

                if(!response.ok) {
                    setLoading(false);
                    console.log(data.message);
                    return;
                }
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length > 9) {
                    setShowMore(true);
                }else {
                    setShowMore(false);
                }
            } catch(err) {
                setLoading(false);
                console.log(err.message);
            }
        }

        fetchPosts();
    },[location.search]);
    console.log(sidebarData);

    //handle textinput data
    const handleChange = (e)=> {
        if(e.target.id === 'searchTerm') {
            setSidebarData({
                ...sidebarData,
                searchTerm : e.target.value,
            });
        }
        if(e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({
                ...sidebarData,
                sort : order,
            });
        }
        if(e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({
                ...sidebarData,
                category: category,
            });
        }
    }
    //handle submit on changing input value
    const handleSubmit = (e)=> {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category' , sidebarData.category);
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        navigate(`/search?${searchQuery}`);
            
    }

    //handle show more if posts is more than 9
    const handleShowMore = async()=> {
        try{
            setLoading(true);
            const numberOfPosts = posts.length ; 
            const startIndx = numberOfPosts ; 
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startIndx' , startIndx);
            const searchQuery = urlParams.toString();

            const response = await fetch(`/api/post/getposts?${searchQuery}`);
            const data = await response.json();

            if(!response.ok) {
                setLoading(false);
                console.log(data.message);
                return;
            }

            setPosts({
                ...posts,
                ...data.posts
            });
            setLoading(false);
            if(data.posts.length > 9) {
                setShowMore(true);
            }else {
                setShowMore(false);
            }
        }catch(err){
            setLoading(false);
            console.log(err.message);
        }
    }
    return (
        <div className="flex flex-col md:flex-row" >
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500" >
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <label className="whitespace-nowrap font-semibold" >Search Term</label>
                        <TextInput 
                            placeholder="Search..." 
                            id="searchTerm"
                            type="text" 
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-3" >
                        <label className="font-semibold" >Sort</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id="sort">
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3" >
                        <label className="font-semibold" >Category</label>
                        <Select onChange={handleChange} value={sidebarData.category} id="category">
                            <option value="uncategorized">Select a category</option>
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
                    <Button type="submit" outline gradientDuoTone={"purpleToPink"} >Apply filters</Button>
                </form>
            </div>
            <div className="w-full" >
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 text-gray-500 p-3 mt-5" >Posts Result :</h1>
                <div className="p-7 flex-wrap gap-4" >
                    {
                        !loading && posts.length === 0 && (
                            <p className="text-xl text-gray-500" >No Blog Post found with this filters.</p>
                        )
                    }
                    {
                        loading && (
                            <div className="flex justify-center items-center min-h-screen gap-4" >
                                <Spinner size={"xl"} />
                                <div>Loading ...</div>
                            </div> 
                        )
                    }
                    {
                        !loading && posts && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                            { posts.map((post)=>(
                                <PostCard key={post._id} post={post} />
                            )) }
                        </div>
                        )
                    }
                    {
                        shoowMore && (
                            <button className="text-teal-500 text-lg outline-0 border-none hover:underline p-7 w-full mx-auto" onClick={handleShowMore} >Show More</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}