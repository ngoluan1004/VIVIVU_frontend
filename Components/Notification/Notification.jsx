import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  // const { auth } = useSelector((store) => store);

  const [notifications, setNotifications] = React.useState([]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  // fetchUserFavoritePosts
  React.useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/notifications`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user favorited posts:", response.data); // In ra dữ liệu trả về
          setNotifications(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserNotifications();
  }, []);
  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Thông báo</h1>
      </section>
      <hr className="mt-5 mb-1" />
      <section className="space-y-1">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} item={notification} />
          ))
        ) : (
          <div className="flex justify-center">
            <h1 className="py-2 text-lg">Chưa có thông báo nào</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Notification;
