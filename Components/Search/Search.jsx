import React, { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import UserResult from "./UserResult";
import TweetCard from "../HomeSection/TweetCard";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const [formDataUser, setFormDataUser] = useState({ content: "" });
  const [formDataPost, setFormDataPost] = useState({ content: "" });

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataPost({ ...formDataPost, [name]: value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault(); // Chặn reload trang
    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu tìm kiếm user
      const response = await axios.get(
        `http://localhost:8080/users/search?username=${formDataUser.content}`,
        config
      );

      if (response.status === 200) {
        setUsers(response.data); // Cập nhật danh sách người dùng
      } else {
        setUsers([]); // Đảm bảo mảng users rỗng khi không có kết quả
      }
    } catch (error) {
      console.error("Error:", error);
      setUsers([]); // Xử lý lỗi bằng cách đặt users thành mảng rỗng
    }
  };

  const handleSearchPost = async (e) => {
    e.preventDefault(); // Chặn reload trang
    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu tìm kiếm bài đăng
      const response = await axios.get(
        `http://localhost:8080/posts/search?title=${formDataPost.content}`,
        config
      );

      if (response.status === 200) {
        setPosts(response.data); // Cập nhật danh sách bài đăng
      } else {
        setPosts([]); // Đảm bảo mảng posts rỗng khi không có kết quả
      }
    } catch (error) {
      console.error("Error:", error);
      setPosts([]); // Xử lý lỗi bằng cách đặt posts thành mảng rỗng
    }
  };

  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tìm kiếm</h1>
      </section>
      <hr className="mt-5" />
      <div className="py-5 px-5 sticky top-0">
        <form
          onSubmit={handleUserSubmit}
          className="flex relative items-center"
        >
          <p className="mt-2">
            <strong>Search User</strong>
          </p>
          <input
            type="text"
            placeholder="nhập username"
            name="content"
            value={formDataUser.content}
            onChange={handleUserInputChange}
            className="py-3 rounded-full text-gray-500 w-full pl-12 mr-6 mt-3 ml-3 border border-emerald-600"
          />
          <div className="absolute top-0 left-0 pl-[80px] pt-6">
            <SearchIcon className="text-gray-500" />
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "50px",
              bgcolor: "#16A34A",
              marginTop: "12px",
              width: "150px",
              paddingY: "12px",
            }}
          >
            Tìm kiếm
          </Button>
        </form>
        <form
          onSubmit={handleSearchPost}
          className="flex relative items-center"
        >
          <p className="mt-2">
            <strong>Search Post</strong>
          </p>
          <input
            type="text"
            placeholder="nhập tiêu đề bài đăng"
            name="content"
            value={formDataPost.content}
            onChange={handlePostInputChange}
            className="py-3 rounded-full text-gray-500 w-full pl-12 mr-6 mt-3 ml-3  border border-emerald-600"
          />
          <div className="absolute top-0 left-0 pl-[80px] pt-6">
            <SearchIcon className="text-gray-500" />
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              borderRadius: "50px",
              bgcolor: "#16A34A",
              marginTop: "12px",
              width: "150px",
              paddingY: "12px",
            }}
          >
            Tìm kiếm
          </Button>
        </form>
        <hr className="mt-5" />

        <div className="space-y-5">
          <section>
            {users.length > 0 ? (
              users.map((user) => <UserResult key={user.id} item={user} />)
            ) : (
              <div></div>
            )}
          </section>
          <section>
            {posts.length > 0 ? (
              posts.map((post) => <TweetCard key={post.id} item={post} />)
            ) : (
              <div></div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Search;
