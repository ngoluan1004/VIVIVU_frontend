import axios from "axios"
import { API_BASE_URL } from "../../Config/Api"
import { api } from "../../Config/Api";
import { type } from "@testing-library/user-event/dist/type"
import { FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, LOGOUT, FIND_USER_BY_ID_USER_SUCCESS, FIND_USER_BY_ID_USER_FAILURE } from "./ActionType"

export const loginUser = (loginData) => async(dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/token`, loginData)

        console.log("logedin user", data)

        // Kiểm tra code và lấy token từ data.result
    if (data.code === 0 && data.result?.token) {
        const token = data.result.token;

        // Lưu token vào localStorage
        localStorage.setItem("jwt", token);

        // Dispatch action thành công với token
        dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
    }else {
        // Dispatch lỗi cụ thể từ API
        dispatch({ type: LOGIN_USER_FAILURE, payload: data.message });
    }
    } catch (error) {
        console.log("error", error);
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: error.response?.data?.message || "Đăng nhập thất bại",
        });
    }
}

export const registerUser = (registerData) => async(dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/users/create-user`, registerData)

        console.log("signup user", data)
        if(data.jwt) {
            localStorage.setItem("jwt",data.jwt)
        }
        dispatch({type:REGISTER_USER_SUCCESS, payload:data.jwt})
    } catch (error) {
        console.log("error",error)
        dispatch({type:REGISTER_USER_FAILURE, payload:error.message})
    }
}

export const getUserProfile = (jwt) => async(dispatch) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/users/myInfo`, {
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        })

        dispatch({type:GET_USER_PROFILE_SUCCESS, payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:GET_USER_PROFILE_FAILURE, payload:error.message})
    }
}

export const findUserById = (userId) => async(dispatch) => {
    try {
        const {data} = await api.get(`/users/${userId}`)

        dispatch({type:FIND_USER_BY_ID_USER_SUCCESS, payload:data})
    } catch (error) {
        console.log("error",error)
        dispatch({type:FIND_USER_BY_ID_USER_FAILURE, payload:error.message})
    }
}

export const updateUser = (userId, userUpdateData) => async (dispatch) => {
    try {
        const { data } = await api.put(`/users/${userId}`, userUpdateData);
        console.log("User updated: ", data);
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("Update error: ", error);
        dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error.message });
    }
};

export const followUser = (followerId, followingId) => async (dispatch) => {
    try {
        const { data } = await api.post(`/follows`, null, {
            params: { followerId, followingId },
        });
        console.log("Follow user: ", data);
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log("Follow error: ", error);
        dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
    }
};


export const logout = (jwt) => async(dispatch) => {
        localStorage.removeItem("jwt")
        dispatch({type:LOGOUT, payload:null})
}