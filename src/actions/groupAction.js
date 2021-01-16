import axios from "axios";

export const GET_GROUP_LIST = "GET_GROUP_LIST";
export const GET_GROUP_DETAIL = "GET_GROUP_DETAIL";
export const POST_GROUP_CREATE = "POST_GROUP_CREATE";
export const PUT_GROUP_EDIT = "PUT_GROUP_EDIT";



export const getGroupList = () => {
  return (dispatch) => {
    axios
      .get("http://192.168.1.100:3001/api/group")
      .then(function (response) {
        dispatch({
          type: GET_GROUP_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getGroupDetail = (GroupID) => {
  return (dispatch) => {
    axios
      .get(
        "http://192.168.1.100:3001/api/group/"+GroupID
      )
      .then(function (response) {
        dispatch({
          type: GET_GROUP_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postGroupCreate = (data) => {
  return (dispatch) => {
    axios
      .post(
         "http://192.168.1.100:3001/api/group/",
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: POST_GROUP_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_GROUP_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putGroupUpdate = (data, GroupID) => {
  return (dispatch) => {
    axios
      .put(
        "http://192.168.1.100:3001/api/user/"+GroupID,
        data
      )
      .then(function (response) {
        console.log(response);
        
        dispatch({
          type: PUT_GROUP_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_GROUP_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};


export const deleteGroup = (GroupID) => {
  return (dispatch) => {
    axios
      .delete(
         "http://192.168.1.100:3001/api/user/"+GroupID
      )
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        
      });
  };
};


export const deleteDataGroup = () => {
  return (dispatch) => {
    dispatch({
      type: GET_GROUP_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });


    dispatch({
      type: POST_GROUP_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
