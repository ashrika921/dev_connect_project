import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
//Load user
export const loadUser = () => async (dispath) => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get("/api/auth");
    dispath({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispath({
      type: AUTH_ERROR,
    });
  }
};

//register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => {
        return dispatch(setAlert(error.msg, "danger"));
      });
    }
    //console.log(errors);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response.data);
    if (errors) {
      errors.forEach((error) => {
        return dispatch(setAlert(error.msg, "danger"));
      });
    }
    //console.log(errors);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout/clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
