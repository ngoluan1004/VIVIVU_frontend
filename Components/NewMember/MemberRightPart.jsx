import React from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const MemberRightPart = ({ item, handleClose }) => {
  const { auth } = useSelector((store) => store);

  const [isFollow, setIsFollow] = React.useState(false);

  const navigate = useNavigate();

  const handleFollowUser = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi request POST đến API để Follow hoặc Unfollow
      const response = await axios.post(
        `http://localhost:8080/follows/follow/${item.userId}`,
        {}, // Dữ liệu gửi lên (trường hợp này có thể để trống)
        config
      );

      // Kiểm tra nếu Follow/Unfollow thành công
      if (response.status === 200) {
        // Đổi trạng thái Follow
        setIsFollow(!isFollow);
      } else {
        console.error("Error following user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch trạng thái follow từ backend
  React.useEffect(() => {
    const fetchFollowedStatus = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/follows/status/${item.userId}`,
          config
        );

        if (response.status === 200) {
          setIsFollow(response.data.followed); // Lấy trạng thái followed từ backend
        }
      } catch (error) {
        console.error("Error fetching reposted status:", error);
      }
    };

    fetchFollowedStatus();
  }, [item.userId]);
  return (
    <div className="flex space-x-1">
      <Avatar
        onClick={() => navigate(`/profile/${item?.userId}`)}
        alt="username"
        src={`http://localhost:8080${item?.imgUrl}`}
        className="cursor-pointer mt-5 ml-2"
      />
      <div
        className="w-full mt-5 ml-2"
        onClick={() => navigate(`/profile/${item?.userId}`)}
      >
        <div className="flex justify-between items-center ">
          <div className="flex cursor-pointer items-center space-x-2">
            <span className="font-semibold">{item?.fullName}</span>
            <span className="text-gray-600">@{item?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberRightPart;
