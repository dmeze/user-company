import { SET_LOADING } from "../types";

export const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};
