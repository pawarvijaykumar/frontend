// src/pages/Post.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPost, deletePost, getFilePreview } from "../appwrite/config.js";
import Button from "../components/Button";
import Container from "../components/Container/Container";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug]);

  const deletePostHandler = () => {
    deletePost(post.$id).then((status) => {
      if (status) {
        deleteFile(post.featureImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={getFilePreview(post.featureImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Button bgColor="bg-green-500" className="mr-3" onClick={() => navigate(`/edit-post/${post.$id}`)}>
                Edit
              </Button>
              <Button bgColor="bg-red-500" onClick={deletePostHandler}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css" dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </div>
  ) : null;
}

export default Post;