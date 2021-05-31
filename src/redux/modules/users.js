import axios from "axios";

// 액션 타입 정의
// github API 호출 시작
export const GET_USERS_START = "redux-start/users/GET_USERS_START";

// github API 호출에 대한 응답이 성공적일 경우
export const GET_USERS_SUCCESS = "redux-start/users/GET_USERS_SUCCESS";

// github API 호출에 대한 응답이 실패한 경우
export const GET_USERS_FAIL = "redux-start/users/GET_USERS_FAIL";

// redux-promise-middleware
const GET_USERS = "redux-start/users/GET_USERS";
export const GET_USERS_PENDING = "redux-start/users/GET_USERS_PENDING";
export const GET_USERS_FUFILLED = "redux-start/users/GET_USERS_FUFILLED";
export const GET_USERS_REJECTED = "redux-start/users/GET_USERS_REJECTED";

// 액션 생성 함수
export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}

export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}

// 초기값
const initState = {
  loading: false,
  data: [],
  error: null,
};

// reducer
export default function reducer(state = initState, action) {
  if (action.type === GET_USERS_START || action.type === GET_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }

  if (action.type === GET_USERS_FUFILLED) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  }

  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  if (action.type === GET_USERS_REJECTED) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

  return state;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// redux-thunk
export function getUsersThunk() {
  return async (dispatch, getState, { history }) => {
    try {
      console.log(history);
      dispatch(getUsersStart());
      // sleep
      await sleep(2000);
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
      history.push("/");
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  };
}

// redux-promise-middelware
export function getUsersPromise() {
  return {
    type: GET_USERS,
    payload: async () => {
      const res = await axios.get("https://api.github.com/users");
      return res.data;
    },
  };
}
