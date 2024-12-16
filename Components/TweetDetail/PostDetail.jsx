import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";
import Comment from "../TweetDetail/Comment";

const TweetDetail = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { postId } = useParams();
  // console.log("Post ID from URL:", postId);
  const [post, setPost] = React.useState(null); // Trạng thái lưu thông tin bài viết
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Lấy dữ liệu bài viết
        const postResponse = await axios.get(
          `http://localhost:8080/posts/${postId}`,
          config
        );
        setPost(postResponse.data); // Gán dữ liệu bài viết vào state
        // console.log("Post data: ", postResponse.data);

        // Lấy danh sách bình luận
        const commentsResponse = await axios.get(
          `http://localhost:8080/comments/getallcmt/${postId}`,
          config
        );
        setComments(commentsResponse.data); // Gán danh sách bình luận vào state
        // console.log("Comments data: ", commentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found!</p>;
  }

  // if (loading) return <p>Loading comments...</p>;
  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((cmt) => cmt.commentId !== commentId)
    );
  };

  const handleUpdateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((cmt) =>
        cmt.commentId === updatedComment.commentId ? updatedComment : cmt
      )
    );
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <React.Fragment>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Post Detail</h1>
      </section>
      <section>
        <TweetCard
          item={post}
          onAddComment={handleAddComment}
          onNavigate={() => navigate(`/`)}
          isDetailView={true} // Chế độ chi tiết
          isDetail={false}
        />
        <Divider sx={{ margin: "2rem 0rem" }} />
        <h1>Comments:</h1>
      </section>
      <section>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              item={comment}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </section>
    </React.Fragment>
  );
};

export default TweetDetail;
