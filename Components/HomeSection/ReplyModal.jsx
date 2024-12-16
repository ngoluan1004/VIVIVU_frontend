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

export default function ReplyModal({
  handleClose,
  open,
  item,
  updateCommentCount,
  onAddComment,
  isDetailView,
  isDetail,
}) {
  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState("");

  const [avatar, setAvatar] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const { auth } = useSelector((store) => store);

  const [formData, setFormData] = React.useState({ content: "" });

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
          console.error("Error");
        }
      } catch (error) {
        console.error("Error fetching:", error);
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

  // Gửi dữ liệu tạo bình luận
  const handleSubmit = async () => {
    // e.preventDefault();
    const form = new FormData();
    form.append("content", formData.content);

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8080/comments/add/${item.postId}`,
        form,
        config
      );
      alert("Tạo bình luận thành công!");
      const newComment = response.data; // Giả sử API trả về bình luận vừa tạo
      updateCommentCount((prevCount) => prevCount + 1); // Gọi hàm callback từ TweetCard để tăng số lượng bình luận
      handleClose(); // Đóng modal
      onAddComment(newComment); // Gọi callback để thêm bình luận vào danh sách
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
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
          <h1 className="py-5 text-xl font-bold ml-2 opacity-80">Bình luận</h1>
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
                  <h2>
                    <strong>{item?.title}</strong>
                  </h2>
                  <p className="mb-2 p-0">
                    {isDetail
                      ? item?.content
                          ?.split(".")
                          .reduce((acc, sentence, index) => {
                            const updatedContent = acc + sentence.trim();
                            // Thêm xuống dòng mỗi khi đạt đủ 2 câu
                            if (
                              (index + 1) % 2 === 0 &&
                              index < item?.content?.split(".").length - 1
                            ) {
                              return updatedContent + ".<br />";
                            }
                            return updatedContent + ".";
                          }, "")
                          ?.replace(/\.<br \/>$/, "") // Loại bỏ xuống dòng thừa ở cuối
                          ?.replace(/\.\./g, ".") // Sửa dấu chấm lặp nếu xảy ra
                          ?.split("<br />") // Xử lý thẻ <br /> để React hiểu
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))
                      : item?.content?.length > 200
                      ? `${item?.content.slice(0, 200)}...`
                      : item?.content}
                  </p>
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
                    <label>Nội dung bình luận:</label>
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
                        Bình luận
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
