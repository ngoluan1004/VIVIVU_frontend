import React from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UserManager = ({ item, onDelete }) => {
  const { auth } = useSelector((store) => store);

  const [isActive, setIsActive] = React.useState(false);

  const navigate = useNavigate();

  const handleBanUser = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `http://localhost:8080/users/ban/${item.userId}`,
        config
      );

      if (response.status === 200) {
        alert(`${response.data}`);
        setIsActive((prevState) => !prevState); // Đảo ngược trạng thái
      }
    } catch (error) {
      console.error("Error fetching reposted status:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8080/users/${item.userId}`,
        config
      );

      if (response.status === 200) {
        alert(`${response.data}`);
        // Gọi callback từ parent component để cập nhật lại danh sách users
        onDelete(item.userId);
      }
    } catch (error) {
      console.error("Error fetching reposted status:", error);
    }
  };

  // Fetch trạng thái active từ backend
  React.useEffect(() => {
    const fetchActiveStatus = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/users/${item.userId}/is-active`,
          config
        );

        if (response.status === 200) {
          setIsActive(response.data.isActive); // Lấy trạng thái isActive từ backend
          // console.log("isActive :", response.data.isActive);
        }
      } catch (error) {
        console.error("Error fetching reposted status:", error);
      }
    };

    fetchActiveStatus();
  }, [item.userId]);

  return (
    <div>
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.userId}`)}
          alt="username"
          src={`http://localhost:8080${item?.imgUrl}`}
          className="cursor-pointer mt-5 ml-2"
        />
        <div className="w-full mt-5 ml-2">
          <div className="flex justify-between items-center ">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.fullName}</span>
              <span className="text-gray-600">@{item?.username}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-between space-x-3">
          {item?.userId == auth.user.userId ? (
            <div></div>
          ) : (
            <Button
              onClick={handleBanUser}
              variant="contained"
              sx={{
                borderRadius: "20px",
                bgcolor: "#16A34A",
                width: "120px",
              }}
            >
              {isActive ? "Khóa" : "Kích hoạt"}{" "}
              {/* Kiểm tra trạng thái theo dõi */}
            </Button>
          )}
          {item?.userId == auth.user.userId ? (
            <div></div>
          ) : (
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              sx={{
                borderRadius: "20px",
                bgcolor: "#16A34A",
              }}
            >
              Xóa
              {/* Kiểm tra trạng thái theo dõi */}
            </Button>
          )}
        </div>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default UserManager;
