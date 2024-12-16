import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, Button, TextField } from "@mui/material";
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

export default function ReportModal({ handleClose, open, item }) {
  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState("");

  const [avatar, setAvatar] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const { auth } = useSelector((store) => store);

  const [formData, setFormData] = React.useState({ reason: "" });
  // console.log("loging: ", item);

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  React.useEffect(() => {
    const fetchUserCmt = async () => {
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
    fetchUserCmt();
  }, [auth.user.userId]);

  // Gửi dữ liệu tạo báo cáo
  const handleSubmit = async () => {
    // e.preventDefault();
    const form = new FormData();
    form.append("reason", formData.reason);

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `http://localhost:8080/reports/add_post/${item.postId}`,
        form,
        config
      );
      alert("Báo cáo thành công!");

      handleClose(); // Đóng modal
    } catch (err) {
      console.error(err);
      alert("Error creating comments!");
    }
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
      image: "",
      twitId: item?.postId,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="py-5 text-xl font-bold ml-2 opacity-80">Báo cáo</h1>
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
                  <p className="mb-2 p-0">{item?.content}</p>
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
                    <label>Lí do báo cáo:</label>
                    <TextField
                      fullWidth
                      name="reason"
                      variant="outlined"
                      size="large"
                      value={formData.reason}
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
                        Báo cáo
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
