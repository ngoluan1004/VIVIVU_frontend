import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";

const NotificationItem = ({ item }) => {
  const [users, setUsers] = React.useState([]);

  const navigate = useNavigate();

  const content = item.content;
  const firstWord = content.split(" ")[0];

  // fetch user by name
  React.useEffect(() => {
    const fetchUserByName = async () => {
      if (!firstWord) return; // Không gọi API nếu `firstWord` rỗng

      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API
        const response = await axios.get(
          `http://localhost:8080/users/search?username=${firstWord}`,
          config
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          // console.log("Fetched users:", response.data); // Danh sách người dùng
          setUsers(response.data); // Lưu danh sách người dùng vào state
        } else {
          console.error("No users found");
          setUsers([]); // Nếu không có kết quả, đặt danh sách là rỗng
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Đặt danh sách là rỗng trong trường hợp lỗi
      }
    };

    fetchUserByName();
  }, [firstWord]);

  return (
    <div>
      <div className="flex space-x-5 bg-lime-100 pt-2 pb-6 rounded-full">
        <Avatar
          onClick={
            () => users.length > 0 && navigate(`/profile/${users[0]?.userId}`) // Điều hướng đến thông tin người dùng đầu tiên
          }
          alt={users.length > 0 ? users[0]?.username : "Default User"} // Fallback nếu danh sách trống
          src={
            users.length > 0 && users[0]?.imgUrl
              ? `http://localhost:8080${users[0].imgUrl}`
              : "/default-avatar.png" // Fallback image
          }
          className="cursor-pointer mt-5 ml-2"
        />
        <div
          className="w-full mt-5 ml-2 cursor-pointer"
          onClick={() => {
            if (item?.relatedPost?.postId) {
              navigate(`/post/${item.relatedPost.postId}`); // Điều hướng đến bài đăng nếu postId tồn tại
            } else if (users.length > 0) {
              navigate(`/profile/${users[0]?.userId}`); // Điều hướng đến trang cá nhân nếu postId không tồn tại
            }
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">
                {users.length > 0 ? users[0]?.fullName : "Unknown User"}
              </span>
              <span className="text-gray-600">
                @{users.length > 0 ? users[0]?.username : "unknown"}
              </span>
              <img className="ml-2 w-5 h-5" src="/img/image.png" alt="" />
              <span className="text-gray-600">{item?.createdAt}</span>
            </div>
          </div>
          <p>{item?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
