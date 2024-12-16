import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReportCmtModal from "../Report/ReportCmtModal";
import UpdateCommentModal from "./UpdateCommentModal";

const Comment = ({ item, onDelete, onUpdate }) => {
  // console.log("loging: ", item);

  const [comment, setComment] = React.useState([]);
  const { auth } = useSelector((store) => store);
  const [avatar, setAvatar] = React.useState([]);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [formData, setFormData] = React.useState({ reason: "" });
  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // mở modal báo cáo
  const [openReportModal, setOpenReportModal] = React.useState(false);
  const handleOpenReportModal = () => {
    setOpenReportModal(true);
  };
  const handleCloseReportModal = () => {
    setOpenReportModal(false);
  };

  // mở modal chỉnh sửa bình luận
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDeleteComment = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi request GET đến API để lấy danh sách bài đăng của user
      const response = await axios.delete(
        `http://localhost:8080/comments/${item.commentId}`,
        config
      );

      if (response.status === 200) {
        alert(`${response.data}`);
        // Gọi callback từ parent component để cập nhật lại danh sách users
        onDelete(item.commentId);
      } else {
        console.error("Error fetching comment");
      }
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  // fetchUserById
  React.useEffect(() => {
    const fetchUserById = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/users/${item.user.userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user:", response.data); // In ra dữ liệu trả về
          setAvatar(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserById();
  }, [item.user.userId]);

  const refreshCommentData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/comments/${item.commentId}`,
        config
      );

      if (response.status === 200) {
        setComment(response.data); // Cập nhật thông tin bình luận
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  return (
    <div className="flex space-x-5 border-t">
      <Avatar
        onClick={() => navigate(`/profile/${item?.user.userId}`)}
        alt="username"
        src={`http://localhost:8080${avatar.imgUrl}`}
        className="cursor-pointer mt-2 ml-2"
      />
      <div className="w-full mt-2 ml-2">
        <div className="flex justify-between items-center ">
          <div className="flex cursor-pointer items-center space-x-2">
            <span className="font-semibold">{item?.user?.fullName}</span>
            <span className="text-gray-600">@{item?.user?.username}</span>
            <img className="ml-2 w-5 h-5" src="/img/image.png" alt="" />
            <span className="text-gray-600">{item?.createdAt}</span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon className=" ml-10" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* Kiểm tra nếu user hiện tại là chủ bài viết */}
              {auth.user.userId === item.user.userId ? (
                <>
                  <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
                  <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                </>
              ) : null}
              {/* Luôn hiển thị menu "Report" */}
              <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="mt-2">
          <div className="cursor-pointer">
            <p className="mb-3">{item?.content}</p>
          </div>
        </div>
      </div>
      <section>
        <ReportCmtModal
          item={item}
          open={openReportModal}
          handleClose={handleCloseReportModal}
        />
      </section>
      <section>
        <UpdateCommentModal
          item={item}
          open={openEditModal}
          handleClose={handleCloseEditModal}
          refreshCommentData={refreshCommentData} // Truyền callback
          onUpdate={onUpdate}
        />
      </section>
    </div>
  );
};

export default Comment;
