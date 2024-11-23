import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [relatedblog, setRelatedblog] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const { loading, setLoading } = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog);
      setRelatedblog(data.relatedBlogs);
    } 
    catch (err) {
      console.log(err);
      setBlog(null);
      setRelatedblog([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

    return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigation(-1)}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
        <div>
          {loading ? (
            <p className="text-center text-lg text-gray-600">Loading...</p>
          ) : blog ? (
            <div>
              <BlogDetails post={blog} />
              <h2 className="mt-8 text-xl font-bold text-gray-800">
                Related Blogs
              </h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedblog.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 border border-gray-300 rounded shadow-sm hover:shadow-md"
                  >
                    <BlogDetails post={post} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-red-500">No Blog Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
