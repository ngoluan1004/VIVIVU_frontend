import React, { useState } from "react";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CakeIcon from "@mui/icons-material/Cake";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Box, Tab } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";
import FollowingModal from "./FollowingModal";
import FollowerModal from "./FollowerModal";
import InboxModal from "../Message/InboxModal";

const Profile = () => {
  const [user, setUser] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);
  const [userLikedPosts, setUserLikedPosts] = React.useState([]);
  const [userRepostedPosts, setUserRepostedPosts] = React.useState([]);
  const [userFavoritedPosts, setUserFavoritedPosts] = React.useState([]);
  const [isFollow, setIsFollow] = React.useState(false);

  const [followingCount, setFollowingCount] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);

  // lấy userId từ url để fetch thông tin
  const { userId } = useParams();
  const { auth } = useSelector((store) => store);

  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();

  // mở modal chỉnh sửa trang cá nhân
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);

  // mở modal Followings
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const handleOpenFollowingsModal = () => setOpenFollowingsModal(true);
  const handleCloseFollowingsModal = () => setOpenFollowingsModal(false);

  // mở modal Follower
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const handleOpenFollowersModal = () => setOpenFollowersModal(true);
  const handleCloseFollowersModal = () => setOpenFollowersModal(false);

  // mở modal Inbox
  const [openInboxModal, setOpenInboxModal] = useState(false);
  const handleOpenInboxModal = () => setOpenInboxModal(true);
  const handleCloseInboxModal = () => setOpenInboxModal(false);

  const handleBack = () => navigate(-1);

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
        `http://localhost:8080/follows/follow/${userId}`,
        {}, // Dữ liệu gửi lên (trường hợp này có thể để trống)
        config
      );

      // Kiểm tra nếu Follow/Unfollow thành công
      if (response.status === 200) {
        // Đổi trạng thái Follow
        setIsFollow(!isFollow);

        // Cập nhật số lượng người theo dõi dựa trên trạng thái mới
        setFollowingCount((prevFollowings) =>
          !isFollow ? prevFollowings + 1 : prevFollowings - 1
        );
      } else {
        console.error("Error following user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      // console.log("Like tweets");
    } else if (newValue === 1) {
      // console.log("user tweets");
    }
  };

  React.useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/posts/users/${userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user posts:", response.data); // In ra dữ liệu trả về
          setUserPosts(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserPosts();
  }, [userId]);

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
          `http://localhost:8080/users/${userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user:", response.data); // In ra dữ liệu trả về
          setUser(response.data);
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserById();
  }, [userId]);

  // fetchUserLikedPosts
  React.useEffect(() => {
    const fetchUserLikedPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/posts/like/${userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user liked posts:", response.data); // In ra dữ liệu trả về
          setUserLikedPosts(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserLikedPosts();
  }, [userId]);

  // fetchUserFavoritePosts
  React.useEffect(() => {
    const fetchUserRepostedPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/posts/repost/${userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user reported posts:", response.data); // In ra dữ liệu trả về
          setUserRepostedPosts(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserRepostedPosts();
  }, [userId]);

  // fetchUserFavoritePosts
  React.useEffect(() => {
    const fetchUserFavoritedPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/posts/favorite/${userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user favorited posts:", response.data); // In ra dữ liệu trả về
          setUserFavoritedPosts(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserFavoritedPosts();
  }, [userId]);

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
          `http://localhost:8080/follows/status/${userId}`,
          config
        );

        if (response.status === 200) {
          setIsFollow(response.data.followed); // Lấy trạng thái followed từ backend
          // console.log("followed :", response.data.followed);
        }
      } catch (error) {
        console.error("Error fetching reposted status:", error);
      }
    };

    fetchFollowedStatus();
  }, [userId]);

  const refreshUserData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/users/${userId}`,
        config
      );

      if (response.status === 200) {
        setUser(response.data); // Cập nhật thông tin người dùng
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      setFollowingCount(user.followingCount);
      setFollowerCount(user.followerCount);
    }
  }, [user]);

  const handleDeletePost = (postId) => {
    setUserPosts((prevPosts) =>
      prevPosts.filter((post) => post.postId !== postId)
    );
  };

  const handleUpdatePost = (updatedPost) => {
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === updatedPost.postId ? updatedPost : post
      )
    );
  };

  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Profile</h1>
      </section>
      <hr className="mt-5" />
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover cursor-pointer"
          src={`http://localhost:8080${user?.backgroundImage}`}
          alt=""
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="-translate-y-24 cursor-pointer"
            alt=""
            src={`http://localhost:8080${user?.imgUrl}`}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {userId == auth.user.userId ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px", bgcolor: "#16A34A" }}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Nút Inbox */}
              <Button
                onClick={handleOpenInboxModal}
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  borderColor: "#16A34A",
                  color: "#16A34A",
                }}
              >
                Inbox
              </Button>
              {/* Nút Follow/Unfollow */}
              <Button
                onClick={handleFollowUser}
                variant="contained"
                sx={{ borderRadius: "20px", bgcolor: "#16A34A" }}
              >
                {isFollow ? "Unfollow" : "Follow"}{" "}
                {/* Kiểm tra trạng thái theo dõi */}
              </Button>
            </Box>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{user.fullName}</h1>
            {true && (
              <img className="ml-2 w-5 h-5" src="/img/image.png" alt="" />
            )}
          </div>
          <h1 className="text-gray-500">@{user.username}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{user.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <CakeIcon />
              <p className="ml-2">{user.birthDate}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{user.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">{user.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5 cursor-pointer">
            <div
              className="flex items-center space-x-1 font-semibold"
              onClick={handleOpenFollowingsModal}
            >
              <span>{followerCount}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div
              className="flex items-center space-x-1 font-semibold"
              onClick={handleOpenFollowersModal}
            >
              <span>{followingCount}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Liked" value="2" />
                <Tab label="Reposted" value="3" />
                <Tab label="Favorited" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {userPosts.map((item) => (
                <TweetCard
                  item={item}
                  onDelete={handleDeletePost}
                  onUpdatePost={handleUpdatePost}
                />
              ))}
            </TabPanel>
            <TabPanel value="2">
              {userLikedPosts.map((item) => (
                <TweetCard item={item} />
              ))}
            </TabPanel>
            <TabPanel value="3">
              {userRepostedPosts.map((item) => (
                <TweetCard item={item} />
              ))}
            </TabPanel>
            <TabPanel value="4">
              {userFavoritedPosts.map((item) => (
                <TweetCard item={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModal
          handleClose={handleClose}
          open={openProfileModal}
          user={user}
          refreshUserData={refreshUserData} // Truyền callback
        />
      </section>
      <section>
        <FollowingModal
          handleClose={handleCloseFollowingsModal}
          open={openFollowingsModal}
          userId={userId}
        />
      </section>
      <section>
        <FollowerModal
          handleClose={handleCloseFollowersModal}
          open={openFollowersModal}
          userId={userId}
        />
      </section>
      <section>
        <InboxModal
          handleClose={handleCloseInboxModal}
          open={openInboxModal}
          item={user}
        />
      </section>
    </div>
  );
};

export default Profile;
