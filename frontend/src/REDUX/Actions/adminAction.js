import {
  ADMIN_HOME_FAIL,
  ADMIN_HOME_REQUEST,
  ADMIN_HOME_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_SEARCH_FAIL,
  ADMIN_SEARCH_REQUEST,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_USER_BLOCK_FAIL,
  ADMIN_USER_BLOCK_REQUSET,
  ADMIN_USER_BLOCK_SUCCESS,
  ADMIN_USER_DELETE_FAIL,
  ADMIN_USER_DELETE_REQUEST,
  ADMIN_USER_DELETE_SUCCESS,
  ADMIN_SELECT_REQUEST,
  ADMIN_SELECT_DATA
} from "../Constants/adminConstants";
import axios from "axios";

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/admin/login",
      { email, password },
      config
    );
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminHomeAction = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_HOME_REQUEST });

    const token = JSON.parse(localStorage.getItem("adminInfo"));
    console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.get("http://localhost:5000/admin", config);
    dispatch({ type: ADMIN_HOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_HOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminuserBlock = (id) => async (dispatch) => {
  console.log("block dispstch", id);
  try {
    dispatch({ type: ADMIN_USER_BLOCK_REQUSET });

    const token = JSON.parse(localStorage.getItem("adminInfo"));
    console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/admin/block?id=" + id,
      config
    );
    dispatch({ type: ADMIN_USER_BLOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_BLOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};


export const admindeleteUser = (id) => async (dispatch) => {

  try {
    dispatch({ type: ADMIN_USER_DELETE_REQUEST })

    const token = JSON.parse(localStorage.getItem("adminInfo"));
    console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };


    const { data } = await axios.get("http://localhost:5000/admin/delete?id=" + id, config)
    console.log(data + "THIS IS ");


    dispatch({ type: ADMIN_USER_DELETE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: ADMIN_USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
}


export const adminLogout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo")
  dispatch({ type: ADMIN_LOGOUT })
}


export const adminSearch = (searchkeyword) => async (dispatch) => {

  try {
    dispatch({ type: ADMIN_SEARCH_REQUEST })
    const token = JSON.parse(localStorage.getItem("adminInfo"));  
    console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.post("http://localhost:5000/admin/search", { searchkeyword }, config)

    dispatch({ type: ADMIN_SEARCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADMIN_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
}

export const adminUpdate = (data) => async (dispatch) => {
  console.log("adminUpdate data", data);
  try {
    // dispatch({
    //     type:ADMIN_SELECT_REQUEST
    // })
    dispatch({
      type: ADMIN_SELECT_DATA,
      payload: data
    })
  } catch (error) {

  }
}

export const adminUpdateUser = (id, firstname, lastname, email, oldEmail) => async (dispatch) => {

  // console.log("we are in action.js",id,firstname,lastname,email,oldEmail);

  try {

    // console.log(id + "THIS IS ID in userupdate");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.post(
      'http://localhost:5000/admin/update', { id, firstname, lastname, email, oldEmail },
      config
    ).then((Data) => {
      console.log('updated data from server', Data);
      localStorage.setItem('editedUser', JSON.stringify(Data))
      dispatch({
        type: ADMIN_SELECT_DATA,
        payload: Data.data
      })
    }).catch((err) => {
      console.log(err)
      // dispatch({
      //   type: ADMIN_UPDATE_FAILED,
      //   payload: err.response
      // })
    })
  } catch (error) {
    console.log(error)
  }
}