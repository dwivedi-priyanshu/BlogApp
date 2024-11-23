import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";


function App() {
  const {fetchBlogPosts}=useContext(AppContext);
  const [searchParams]=useSearchParams();
  const location=useLocation();

  useEffect(() => {

    const page = searchParams.get('page') ?? 1;
    if(location.pathname.includes("tags")){
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(page,tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(page,null,category);
    }
    else{
      fetchBlogPosts(page)
    }
  }, [location.pathname,location.search]);
  
  return ( 
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/blog/:blogId" element={<BlogPage/>}/>
      <Route path='/tags/:tag' element={<TagPage/>}/>
      <Route path='/categories/:category' element={<CategoryPage/>}/>
    </Routes>

  );
}

export default App;
