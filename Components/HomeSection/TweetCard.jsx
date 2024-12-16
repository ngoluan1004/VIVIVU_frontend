import React from "react";
import axios from "axios";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReplyModal from "./ReplyModal";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useSelector } from "react-redux";
import ReportModal from "../Report/ReportPostModal";
import EditPostModal from "./EditPostModal";

const TweetCard = ({
  item,
  onDelete,
  onAddComment,
  onUpdatePost,
  onNavigate,
  isDetailView,
  isDetail,
}) => {
  const { auth } = useSelector((store) => store);
  const [avatar, setAvatar] = React.useState([]);
  const [liked, setLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(item?.likesCount || 0);
  const [reposted, setReposted] = React.useState(false);
  const [repostCount, setRepostCount] = React.useState(item?.repostCount || 0);
  const [favorited, setFavorited] = React.useState(false);
  const [favoriteCount, setFavoriteCount] = React.useState(
    item?.favoriteCount || 0
  );
  const [commentCount, setCommentCount] = React.useState(
    item?.commentCount || 0
  );

  // console.log("item data:", item);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // mở modal bình luận
  const [openReplyModal, setOpenReplyModal] = React.useState(false);
  const handleOpenReplyModel = () => {
    setOpenReplyModal(true);
  };
  const handleCloseReplyModal = () => {
    setOpenReplyModal(false);
  };

  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  // mở modal báo xấu
  const [openReportModal, setOpenReportModal] = React.useState(false);
  const handleOpenReportModal = () => {
    setOpenReportModal(true);
  };
  const handleCloseReportModal = () => {
    setOpenReportModal(false);
  };

  // mở modal chỉnh sửa
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };
  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8080/posts/${item.postId}`,
        config
      );

      if (response.status === 200) {
        alert(`${response.data}`);
        // Gọi callback từ parent component để cập nhật lại danh sách users
        onDelete(item.postId);
        onNavigate();
      }
    } catch (error) {
      console.error("Error fetching reposted status:", error);
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
  }, [item?.user?.userId]);

  // hàm xử lý like
  const handleLikePost = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi request POST đến API để like bài viết
      const response = await axios.post(
        `http://localhost:8080/likes/add/${item?.postId}`,
        {}, // Dữ liệu gửi lên (trong trường hợp này có thể để trống)
        config
      );

      // Kiểm tra nếu like thành công
      if (response.status === 200) {
        // Đổi trạng thái liked
        setLiked(!liked);

        // Cập nhật số lượng like dựa trên trạng thái mới
        setLikesCount((prevLikes) => (!liked ? prevLikes + 1 : prevLikes - 1));
      } else {
        console.error("Error liking Post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // hàm xử lý chia sẻ
  const handleRePost = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8080/reposts/add/${item?.postId}`,
        {}, // Không gửi dữ liệu lên body
        config
      );

      if (response.status === 200) {
        // Đổi trạng thái reposted
        setReposted(!reposted);

        // Cập nhật số lượng repost
        setRepostCount((prevCount) =>
          !reposted ? prevCount + 1 : prevCount - 1
        );
      } else {
        console.error("Error reposting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // hàm xử lý yêu thích
  const handleFavoritePost = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi request POST đến API để favorite bài viết
      const response = await axios.post(
        `http://localhost:8080/favorites/add/${item?.postId}`,
        {}, // Không gửi dữ liệu lên body
        config
      );

      if (response.status === 200) {
        // Đổi trạng thái favorited
        setFavorited(!favorited);

        // Cập nhật số lượng favorite
        setFavoriteCount((prevCount) =>
          !favorited ? prevCount + 1 : prevCount - 1
        );
      } else {
        console.error("Error favoriting Post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // lấy trạng thái like từ backend
  React.useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/likes/status/${item?.postId}`,
          config
        );

        if (response.status === 200) {
          setLiked(response.data.liked); // Lấy trạng thái liked từ backend
        }
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    };

    fetchLikedStatus();
  }, [item?.postId]);

  // Fetch trạng thái reposted từ backend
  React.useEffect(() => {
    const fetchRepostedStatus = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/reposts/status/${item?.postId}`,
          config
        );

        if (response.status === 200) {
          setReposted(response.data.reposted); // Lấy trạng thái reposted từ backend
        }
      } catch (error) {
        console.error("Error fetching reposted status:", error);
      }
    };

    fetchRepostedStatus();
  }, [item?.postId]);

  // lấy trạng thái yêu thích từ backend
  React.useEffect(() => {
    const fetchFavoritedStatus = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/favorites/status/${item?.postId}`,
          config
        );

        if (response.status === 200) {
          setFavorited(response.data.favorited); // Lấy trạng thái favorited từ backend
        }
      } catch (error) {
        console.error("Error fetching favorited status:", error);
      }
    };

    fetchFavoritedStatus();
  }, [item?.postId]);

  return (
    <div className="">
      {/* <div className="flex items-center font-semibold text-gray-700 py-2">
        <RepeatIcon />
        <p>You RePost</p>
      </div> */}

      <div className="flex space-x-5 border-t">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user.userId}`)}
          alt="username"
          src={`http://localhost:8080${avatar.imgUrl}`}
          className="cursor-pointer mt-2 ml-2"
        />
        <div className="w-full mt-1 ml-1">
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
                {/* Nếu user hiện tại là chủ bài viết */}
                {auth.user.userId === item.user.userId ? (
                  <>
                    <MenuItem onClick={handleOpenPostModal}>Edit</MenuItem>
                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                    <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
                  </>
                ) : (
                  <>
                    {/* Nếu user không phải là chủ bài viết */}
                    <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
                    {auth.user.role === "ADMIN" && (
                      <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                    )}
                  </>
                )}
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={
                !isDetailView
                  ? () => navigate(`/post/${item?.postId}`)
                  : undefined
              }
              className={isDetailView ? "" : "cursor-pointer"}
            >
              <h2>
                <strong>{item?.title}</strong>
              </h2>
              <p>
                <strong>Địa chỉ:</strong> {item?.address}
              </p>
              <p>
                <strong>Thể loại:</strong> {item?.category}
              </p>
              <p className="text-justify pe-10">
                {" "}
                <strong>Nội dung: </strong> <br />
                {isDetailView
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
              <img
                className="w-11/12 border border-gray-400 rounded-md"
                src={`http://localhost:8080${item?.image}`}
                alt="dulich"
              />
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{commentCount}</p>
              </div>

              <div
                className={`${
                  liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {liked ? (
                  <FavoriteIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                )}
                <p>{likesCount}</p>
              </div>
              <div
                className={`${
                  reposted ? "text-green-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <IosShareIcon
                  className="cursor-pointer"
                  onClick={handleRePost}
                />
                <p>{repostCount}</p>
              </div>
              <div
                className={`${
                  favorited ? "text-blue-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {favorited ? (
                  <BookmarkIcon
                    onClick={handleFavoritePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <BookmarkBorderIcon
                    onClick={handleFavoritePost}
                    className="cursor-pointer"
                  />
                )}
                <p>{favoriteCount}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal
          item={item}
          open={openReplyModal}
          handleClose={handleCloseReplyModal}
          updateCommentCount={updateCommentCount} // // Hàm callback
          onAddComment={onAddComment} // Truyền xuống
          isDetailView={isDetailView}
          isDetail={isDetail}
        />
      </section>
      <section>
        <ReportModal
          item={item}
          open={openReportModal}
          handleClose={handleCloseReportModal}
        />
      </section>
      <section>
        <EditPostModal
          item={item}
          open={openPostModal}
          handleClose={handleClosePostModal}
          onUpdatePost={onUpdatePost}
        />
      </section>
    </div>
  );
};

export default TweetCard;
