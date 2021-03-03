import React from "react";
import "./Posts.css";
import { Post } from "../../Components";
import { useSelector } from "react-redux";
const Posts = () => {
  const posts = useSelector((state) => state.posts);
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
