import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import TweetCard from "./TweetCard";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const { auth } = useSelector((store) => store);
  const [avatar, setAvatar] = React.useState([]);
  // const { post } = useSelector((store) => store);
  // console.log("post", post);
  const [postCreatedAt, setPostCreatedAt] = React.useState("");

  const [post, setPost] = useState(null); // Single post data
  const [posts, setPosts] = useState([]); // All posts data
  const [postId, setPostId] = useState(""); // Post ID for search
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    address: "",
    image: null,
  });

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Gửi dữ liệu tạo bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("category", formData.category);
    form.append("address", formData.address);
    form.append("image", formData.image);

    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/posts/create",
        form,
        config
      );
      alert("Tạo bài đăng thành công!");
      // Sau khi tạo bài xong, gọi lại hàm fetchAllPosts để lấy tất cả bài đăng
      setPosts((prevPosts) => [response.data, ...prevPosts]);

      // fetchAllPosts(); // Lấy lại danh sách bài đăng mới nhất
      // Lấy giá trị createdAt
      const postCreatedAt1 = response.data.createdAt;

      // Chuyển đổi định dạng
      const formattedDate = postCreatedAt1.split("T")[0]; // Tách chuỗi tại ký tự 'T'

      setPostCreatedAt(formattedDate); // Output: "2024-12-01"
    } catch (err) {
      console.error(err);
      alert("Error creating post!");
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts/posts");
      setPosts(response.data);
      // console.log("response: ", response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching posts!");
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
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

  // Gọi hàm fetchAllPosts khi trang được load
  useEffect(() => {
    fetchAllPosts(); // Hàm sẽ tự động gọi khi component render lần đầu tiên
  }, []); // Empty dependency array, tức là chỉ gọi khi component load lần đầu

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === updatedPost.postId ? updatedPost : post
      )
    );
  };
  const handleCommentCountUpdate = (postId, newCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, commentCount: newCount } : post
      )
    );
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold ml-2 opacity-80">Trang chủ</h1>
      </section>
      <hr className="mt-5" />
      <section className={`pb-1`}>
        <div className="flex space-x-5  ml-2 mt-2">
          <Avatar
            alt="username"
            src={`http://localhost:8080${avatar.imgUrl}`}
          />
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Tiêu đề:</label>
                <TextField
                  fullWidth
                  name="title"
                  variant="outlined"
                  size="small"
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
                <FormControl fullWidth variant="outlined" size="small" required>
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
                <label>Address:</label>
                <TextField
                  fullWidth
                  name="address"
                  variant="outlined"
                  size="small"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div>
                <img src="" alt="" />
              </div> */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
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
                    Đăng bài
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div style={{ padding: "20px" }}>
          {/* Display all posts */}
          <div style={{ marginTop: "20px" }}>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  // style={{
                  //   border: "1px solid #ccc",
                  //   padding: "10px",
                  //   marginBottom: "10px",
                  // }}
                >
                  <TweetCard
                    item={post}
                    onDelete={handleDeletePost}
                    onUpdatePost={handleUpdatePost}
                    updateCommentCount={(newCount) =>
                      handleCommentCountUpdate(post.postId, newCount)
                    } // Truyền callback
                    isDetailView={false} // Không phải chế độ chi tiết
                  />
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
