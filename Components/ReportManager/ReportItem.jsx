import React from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportItem = ({ item, onDelete }) => {
  const { auth } = useSelector((store) => store);
  const [users, setUsers] = React.useState([]); // Lưu danh sách users

  const navigate = useNavigate();

  // Hàm xóa report
  const handleDeleteReport = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8080/reports/${item.reportId}`,
        config
      );

      if (response.status === 200) {
        alert(`${response.data}`);
        onDelete(item.reportId); // Gọi callback để cập nhật danh sách
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // Fetch danh sách người dùng
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/users/list`,
          config
        );

        if (response.status === 200) {
          setUsers(response.data); // Lưu danh sách users
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Tìm ảnh từ danh sách users hoặc dùng ảnh từ item
  const userImage = React.useMemo(() => {
    const foundUser = users.find((user) => user.userId === item?.user.userId);
    return foundUser?.imgUrl || item?.user.imgUrl; // Ưu tiên ảnh từ danh sách users
  }, [users, item?.user.userId]);

  return (
    <div>
      <div className="flex space-x-5 bg-lime-100 pt-2 pb-6 rounded-full">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user.userId}`)}
          alt="username"
          src={`http://localhost:8080${userImage}`}
          className="cursor-pointer mt-5 ml-2"
        />
        <div
          className="w-full mt-3 ml-2 cursor-pointer"
          onClick={() => {
            if (item?.post?.postId) {
              navigate(`/post/${item.post.postId}`); // Điều hướng đến bài đăng nếu postId tồn tại
            } else if (item?.comment?.commentId) {
              navigate(`/post/${item.post.postId}`); // Điều hướng đến bài đăng nếu commentId tồn tại
            } else if (users.length > 0) {
              navigate(`/profile/${users[0]?.userId}`); // Điều hướng đến trang cá nhân nếu postId không tồn tại
            }
          }}
        >
          <div className="flex justify-between items-center ">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user.fullName}</span>
              <span className="text-gray-600">@{item?.user.username}</span>
            </div>
          </div>

          <p>
            <i>đã báo cáo bài viết: </i>
            <span>{item?.post?.title || item?.comment?.content}</span>
          </p>
          <p>
            <i> Nội dung: </i>
            <span>{item?.reason}</span>
          </p>
        </div>
        <div className="mt-8 justify-between space-x-3">
          <Button
            onClick={handleDeleteReport}
            variant="contained"
            sx={{
              borderRadius: "20px",
              bgcolor: "#16A34A",
              marginRight: "10px",
            }}
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
