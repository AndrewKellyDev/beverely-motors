import { LOG_IN } from "./actionTypes";

export const login = (data) => {
  return {
    type: LOG_IN,
    payload: data,
  };
};
