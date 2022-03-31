import { SET_LOADING } from "../typex";

export const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};
