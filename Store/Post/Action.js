import axios from "axios";
import { api } from "../../Config/Api";
import { RETWEET_CREATE_SUCCESS, 
    RETWEET_CREATE_FAILURE, 
    GET_ALL_TWEET_FAILURE, 
    GET_ALL_TWEET_SUCCESS,
    GET_USERS_TWEET_FAILURE,
    USER_LIKE_TWEET_SUCCESS , 
    USER_LIKE_TWEET_FAILURE,
    GET_USERS_TWEET_SUCCESS,
    FIND_TWEET_BY_ID_SUCCESS,
    FIND_TWEET_BY_ID_FAILURE,
    TWEET_CREATE_SUCCESS,
    TWEET_CREATE_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
    REPOST_SUCCESS,
    REPOST_FAILURE,
    UNREPOST_SUCCESS,
    UNREPOST_FAILURE,
    LIKE_SUCCESS,
    LIKE_FAILURE,
    UNLIKE_SUCCESS,
    UNLIKE_FAILURE,
    FAVORITE_SUCCESS,
    FAVORITE_FAILURE,
    UNFAVORITE_SUCCESS,
    UNFAVORITE_FAILURE,
    TWEET_DELETE_SUCCESS,
    TWEET_DELETE_FAILURE,
} from "./ActionType";

export const getAllTweets = () => async (dispatch) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            }, 
        };

        // Gửi yêu cầu API với header kèm token
        const { data } = await api.get("/posts/allposts", config);

        console.log("get all posts: ", data);

        // Dispatch action thành công với dữ liệu bài viết
        dispatch({ type: GET_ALL_TWEET_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);

        // Dispatch action thất bại với lỗi
        dispatch({ type: GET_ALL_TWEET_FAILURE, payload: error.message });
    }
};


export const getUsersTweets=(userId)=> async (dispatch)=> {
    try {
        const {data} = await api.get(`/posts/users/${userId}`);
        console.log("get a user all posts: ", data)
        dispatch({type:GET_USERS_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("error", error)
        dispatch({type:GET_USERS_TWEET_FAILURE, payload:error.message})
    }
}

export const findTweetByLikeContainerUser=(userId)=> async (dispatch)=> {
    try {
        const {data} = await api.get(`/posts/like/${userId}`);
        console.log("user likes posts: ", data)
        dispatch({type:USER_LIKE_TWEET_SUCCESS, payload:data})
    } catch (error) {
        console.log("error", error)
        dispatch({type:USER_LIKE_TWEET_FAILURE, payload:error.message})
    }
}

export const findTweetById=(postId)=> async (dispatch)=> {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            }, 
        };

        // Gửi yêu cầu API với header kèm token
        const {data} = await api.get(`/posts/${postId}`,config);
        console.log("find twit by ID: ", data)
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS, payload:data})
    } catch (error) {
        console.log("error", error)
        dispatch({type:FIND_TWEET_BY_ID_FAILURE, payload:error.message})
    }
}

export const createTweet = (postData) => async (dispatch) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            },
        };

        // Gửi yêu cầu API với header kèm token và dữ liệu bài viết
        const { data } = await api.post(`/posts`, postData, config);

        console.log("create tweet: ", data);

        // Dispatch action thành công với dữ liệu phản hồi
        dispatch({ type: TWEET_CREATE_SUCCESS, payload: data });
    } catch (error) {
        console.log("error", error);

        // Dispatch action thất bại với lỗi
        dispatch({ type: TWEET_CREATE_FAILURE, payload: error.message });
    }
};


export const addComment = (postId, comment) => async (dispatch) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            },
        };
        const { data } = await api.post(`/comments/add/${postId}`, comment);
        console.log("Comment added successfully:", data);
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        console.error("Failed to add comment:", error);
        dispatch({ type: ADD_COMMENT_FAILURE, payload: error.message });
    }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await api.delete(`/comments/${postId}/${commentId}`);
        console.log("Comment deleted successfully");
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
    } catch (error) {
        console.error("Failed to delete comment:", error);
        dispatch({ type: DELETE_COMMENT_FAILURE, payload: error.message });
    }
};

export const getAllComments = (postId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/comments/getallcmt/${postId}`);
        console.log("Fetched comments successfully:", data);
        dispatch({ type: GET_ALL_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        dispatch({ type: GET_ALL_COMMENTS_FAILURE, payload: error.message });
    }
};

export const repostPost = (postId) => async (dispatch) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            },
        };
        const { data } = await api.post(`/reposts/add/${postId}`,config);
        console.log("Repost successful:", data);
        dispatch({ type:RETWEET_CREATE_SUCCESS, payload: { postId, ...data } });
    } catch (error) {
        console.error("Repost failed:", error);
        dispatch({ type:RETWEET_CREATE_FAILURE, payload: error.message });
    }
};
export const likePost = (postId) => async (dispatch) => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("jwt");

        // Cấu hình header với Authorization
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
            },
        };

        // Gửi yêu cầu API với header kèm token
        const { data } = await api.post(`/likes/add/${postId}`, config);
        console.log("Like successful:", data);
        //  Dispatch dữ liệu bài viết đã cập nhật
        dispatch({ type: LIKE_SUCCESS, payload: { postId, ...data } });
    } catch (error) {
        console.error("Like failed:", error);

        // Dispatch action thất bại với lỗi
        dispatch({ type: LIKE_FAILURE, payload: error.message });
    }
};


export const favoritePost = (userId, postId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/favorite/add/${userId}/${postId}`);
        console.log("Favorite successful:", data);
        dispatch({ type: FAVORITE_SUCCESS, payload: data });
    } catch (error) {
        console.error("Favorite failed:", error);
        dispatch({ type: FAVORITE_FAILURE, payload: error.message });
    }
};


export const deleteTweet = (postId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/posts/${postId}`);
        console.log("deleted tweet: ", data);
        dispatch({ type: TWEET_DELETE_SUCCESS, payload: postId });
    } catch (error) {
        console.log("error", error);
        dispatch({ type: TWEET_DELETE_FAILURE, payload: error.message });
    }
};
