import {
  LOG_IN,
} from "./actionTypes";

const initialState = {
  authed: false,
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      state = { ...state, authed:action.payload };
      break;
    default:
      state = { ...state };
  }

  return state;
};

export default collectionReducer;
