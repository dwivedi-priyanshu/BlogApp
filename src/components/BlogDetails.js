import React from 'react';
import { NavLink } from 'react-router-dom';

function BlogDetails({ post }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      <NavLink
        to={`/blog/${post.id}`}
        className="block mb-2 text-lg font-semibold text-blue-600 hover:underline"
      >
        {post.title}
      </NavLink>
      <p className="text-sm text-gray-500">
        By <span className="font-medium text-gray-800">{post.author}</span> on{' '}
        <NavLink
          to={`/categories/${post.category.replaceAll(' ', '-')}`}
          className="text-blue-600 hover:underline"
        >
          {post.category}
        </NavLink>
      </p>
      <p className="text-xs text-gray-400">Posted on {post.date}</p>
      <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <NavLink
            key={index}
            to={`/tags/${tag.replaceAll(' ', '-')}`}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            {`#${tag}`}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default BlogDetails;
