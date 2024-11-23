import React from "react";
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";
import { useNavigate,useLocation } from "react-router-dom";

function TagPage() {
    const navigation=useNavigate();
    const location=useLocation();
    const tag=location.pathname.split('/').at(-1);

  return (
    <div>
        <Header/>
        <div>
            <div>
                <button onClick={()=>navigation (-1)}>Back</button>
            </div>
            <h2>Blog Tagged <span>#{tag}</span></h2>
        </div>
        <Blogs/>
        <Pagination/>
    </div>
  )
}

export default TagPage
