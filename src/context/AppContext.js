import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = "https://codehelp-apis.vercel.app/api/get-blogs";

//step 1
export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [loading,setLoading] = useState(false);
    const [posts,setPosts] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(null);
    const navigate=useNavigate();

    //Fetch blog data
    async function fetchBlogPosts(page = 1,tag=null,category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url+=`&tag=${tag}`;
        }
        if(category){
            url+=`&category=${category}`;
        }
        try {
            const result = await fetch(url);
            const data = await result.json(); 
            console.log("Api Response:",data);
            setPage(data?.page);
            setPosts(data?.posts);
            setTotalPages(data?.totalPages);
        }
        catch (error) {

            console.log("Error in fetching BlogPosts",error);
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }
    function handlePageChanger(page){
        navigate({search : `?page=${page}`});
        setPage(page);//ye to sirf pagenumber update karta hai footer wale part me    
    }

    const value={    
        posts,
        setPosts,
        page,
        setPage,
        loading,
        setLoading,
        totalPages, 
        setTotalPages,
        fetchBlogPosts,
        handlePageChanger  
    }; 
 
    //step 2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}