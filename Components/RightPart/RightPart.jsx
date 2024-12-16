import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";
import MemberRightPart from "../NewMember/MemberRightPart";

const RightPart = () => {
  const [openSubscriptionModal, setOpenSubscriptionModal] =
    React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);
  const handleChangeTheme = () => {
    // console.log("handle change theme");
  };
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/users/newest`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user newest:", response.data); // In ra dữ liệu trả về
          setUsers(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts/posts");
        setPosts(response.data);
        // console.log("response: ", response.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching posts!");
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUsers();
    // gọi hàm các bài đăng
    fetchAllPosts();
  }, []);
  return (
    <div className="py-5 px-5 sticky top-0 h-screen overflow-x-hidden">
      <div className="relative flex items-center">
        <input
          type="text"
          className="py-3 rounded-full text-gray-500 w-full pl-12"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>

      <section className="my-2 py-5">
        <h1 className="text-xl font-bold">Xác thực</h1>
        <h1 className="font-bold my-2">Xác thực để có nhiều quyền lợi hơn</h1>
        <Button
          variant="contained"
          sx={{
            padding: "10px",
            padđingX: "20px",
            borderRadius: "25px",
            bgcolor: "#16A34A",
          }}
          onClick={handleOpenSubscriptionModal}
        >
          Xác thực
        </Button>
      </section>

      <section className="mt-2 my-4">
        <h1
          className="font-bold text-xl py-1 cursor-pointer"
          onClick={() => navigate(`/new_member`)}
        >
          Thành viên mới
        </h1>
        <div className="space-y-1">
          {users.length > 0 ? (
            users
              .slice(0, 3)
              .map((user) => <MemberRightPart key={user.id} item={user} />)
          ) : (
            <div></div>
          )}
        </div>
      </section>
      <div className="mt-4 space-y-2">
        <h1 className="font-bold text-xl py-1">Tổng quan diễn đàn</h1>
        <h1 className="my-2">Số lượng thành viên: {users.length} </h1>
        <h1 className="my-2">Số lượng bài viết: {posts.length} </h1>
        <h1 className="my-2">Số lượng chủ đề: 2 </h1>
      </div>
      <section>
        <SubscriptionModal
          open={openSubscriptionModal}
          handleClose={handleCloseSubscriptionModal}
        />
      </section>
    </div>
  );
};

export default RightPart;
