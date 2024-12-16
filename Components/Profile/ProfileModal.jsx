import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

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

export default function ProfileModal({
  open,
  handleClose,
  user,
  refreshUserData,
}) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = React.useState([]);
  const { auth } = useSelector((store) => store);

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    location: "",
    bio: "",
    backgroundImage: null,
    imgUrl: null,
    status: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUploading(true);
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn gửi form mặc định

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("birthDate", formData.birthDate);
    form.append("location", formData.location);
    form.append("bio", formData.bio);
    form.append("backgroundImage", formData.backgroundImage);
    form.append("imgUrl", formData.imgUrl);
    form.append("status", formData.status);
    form.append("role", formData.role);

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:8080/users/${user.userId}`,
        form,
        config
      );
      alert("Cập nhật trang cá nhân thành công!");
      handleClose(); // Đóng modal
      refreshUserData(); // Làm mới dữ liệu trong Profile.jsx
    } catch (err) {
      console.error(err);
      alert("Error updating user!");
    }
  };

  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        location: user.location,
        bio: user.bio,
        birthDate: user.birthDate,
        backgroundImage: user.backgroundImage,
        imgUrl: user.imgUrl,
        status: user.status,
        role: user.role,
      });
    }
  }, [user, open]);

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
          `http://localhost:8080/users/${auth.user.userId}`,
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
  }, [auth.user.userId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <p className="">Edit profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src={`http://localhost:8080${avatar.backgroundImage}`}
                      alt=""
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      name="backgroundImage"
                    />
                  </div>
                </div>
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                      src={`http://localhost:8080${avatar.imgUrl}`}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      name="imgUrl"
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  name="birthDate"
                  label="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  name="role"
                  label="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled
                />
                <TextField
                  fullWidth
                  name="status"
                  label="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
