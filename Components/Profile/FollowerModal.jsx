import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FollowItem from "./FollowItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

const FollowerModal = ({ handleClose, open, userId }) => {
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/follows/${userId}/followers`,
          config
        );

        if (response.status === 200) {
          setFollowers(response.data); // Cập nhật state với danh sách bài đăng
          // console.log("Fetched follower user:", response.data); // In ra dữ liệu trả về
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchFollowingUsers();
  }, [userId]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="space-y-1">
            <p>
              {" "}
              số người theo dõi:{" "}
              <span className="font-bold">{followers.length}</span>
            </p>
            {followers.length > 0 ? (
              followers.map((user) => (
                <FollowItem
                  key={user.id}
                  item={user}
                  handleClose={handleClose}
                />
              ))
            ) : (
              <div>Chưa có ai theo dõi</div>
            )}
          </section>
        </Box>
      </Modal>
    </div>
  );
};

export default FollowerModal;
