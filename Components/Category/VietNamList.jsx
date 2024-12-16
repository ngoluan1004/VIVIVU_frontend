import React, { useEffect, useState } from "react";
import axios from "axios";
import TweetCard from "../HomeSection/TweetCard";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const VietNamList = () => {
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
      const response = await axios.get(
        "http://localhost:8080/posts/VietNamcategory"
      );
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
          Các bài viết chủ đề Việt Nam
        </h1>
      </section>
      <section>
        <div style={{ padding: "20px" }}>
          {/* Display all posts */}
          <div style={{ marginTop: "20px" }}>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index}>
                  <TweetCard item={post} />
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

export default VietNamList;
