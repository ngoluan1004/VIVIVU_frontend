import React, { useEffect, useState } from "react";
import axios from "axios";
import TweetCard from "./TweetCard";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Top10Post = () => {
  const [posts, setPosts] = useState([]); // All posts data

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const fetch10Posts = async () => {
    const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get("http://localhost:8080/posts/newest");
      setPosts(response.data);
      // console.log("response: ", response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching posts!");
    }
  };

  useEffect(() => {
    fetch10Posts(); // Hàm sẽ tự động gọi khi component render lần đầu tiên
  }, []); // Empty dependency array, tức là chỉ gọi khi component load lần đầu

  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Top 10 bài viết mới nhất
        </h1>
      </section>
      <section>
        <div style={{ padding: "20px" }}>
          {/* Form lấy bài viết */}
          {/* <div style={{ marginBottom: "20px" }}>
        <label>Enter Post ID:</label>
        <input
          type="text"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <button onClick={fetchPostById}>Get Post</button>
      </div> */}

          {/* Hiển thị bài viết */}
          {/* {post && (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            <strong>Category:</strong> {post.category}
          </p>
          <p>
            <strong>Address:</strong> {post.address}
          </p>
          {post.image && (
            <img
              src={`http://localhost:8080${post.image}`}
              alt="Post"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      )} */}

          {/* Button to fetch and display all posts */}
          {/* <button onClick={fetchAllPosts} style={{ marginTop: "20px" }}>
        Get All Posts
      </button> */}

          {/* Display all posts */}
          <div style={{ marginTop: "20px" }}>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  // style={{
                  //   border: "1px solid #ccc",
                  //   padding: "10px",
                  //   marginBottom: "10px",
                  // }}
                >
                  <TweetCard item={post} />
                  {/* <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>
                <strong>Category:</strong> {post.category}
              </p>
              <p>
                <strong>Address:</strong> {post.address}
              </p>
              {post.image && (
                <img
                  src={`http://localhost:8080${post.image}`}
                  alt="Post"
                  style={{ maxWidth: "100%" }}
                />
              )} */}
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Top10Post;
