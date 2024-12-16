import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
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

export default function EditPostModal({
  handleClose,
  open,
  item,
  onUpdatePost,
}) {
  const navigate = useNavigate();

  const [avatar, setAvatar] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const { auth } = useSelector((store) => store);

  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    address: "",
    category: "",
  });

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // fetchUserById
  React.useEffect(() => {
    const fetchUserByUserId = async () => {
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
          setUser(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserByUserId();
  }, [auth.user.userId]);

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

  // Gửi dữ liệu để chỉnh sửa bài đăng
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("address", formData.address);
    form.append("category", formData.category);

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu cập nhật bài đăng
      const response = await axios.put(
        `http://localhost:8080/posts/${item.postId}`,
        form,
        config
      );

      if (response.status === 200) {
        alert("Cập nhật bài đăng thành công!");

        console.log("lof: ", response.data);

        // Truyền bài đăng đã cập nhật vào `onUpdatePost`
        handleClose(); // Đóng modal
        onUpdatePost(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      address: "",
      category: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="py-5 text-xl font-bold ml-2 opacity-80">
            Chỉnh sửa bài đăng
          </h1>
          <div className="flex space-x-5">
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
                </div>
              </div>

              <div className="mt-2">
                <div
                  onClick={() => navigate(`/profile/${item?.user.userId}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0">{item?.title}</p>
                </div>
              </div>
            </div>
          </div>
          <section className={`py-10`}>
            <div>
              <div className="flex space-x-5  ml-2 mt-2">
                <Avatar
                  alt="username"
                  src={`http://localhost:8080${user.imgUrl}`}
                />
                <div className="w-full ml-2">
                  <div className="flex justify-between items-center ">
                    <div className="flex cursor-pointer items-center space-x-2">
                      <span className="font-semibold">
                        {auth?.user.fullName}
                      </span>
                      <span className="text-gray-600">
                        @{auth?.user.username}
                      </span>
                      <img
                        className="ml-2 w-5 h-5"
                        src="/img/image.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-5/6 ml-16">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label>Tiêu đề:</label>
                    <TextField
                      fullWidth
                      name="title"
                      variant="outlined"
                      size="large"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Nội dung:</label>
                    <TextField
                      fullWidth
                      name="content"
                      variant="outlined"
                      size="large"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Thể loại:</label>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                    >
                      <Select
                        labelId="category-label"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="VIETNAM">VIETNAM</MenuItem>
                        <MenuItem value="THEGIOI">THEGIOI</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <label>Địa chỉ:</label>
                    <TextField
                      fullWidth
                      name="address"
                      variant="outlined"
                      size="large"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center"></div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#16A34A",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
