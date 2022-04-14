import axios from "axios";

export const getApi = (url: string) => {
  return axios(url)
    .then(({ data }) => data)
    .catch((e) => console.log(e));
};

export const putApi = (url: string, data: unknown) => {
  axios.put(url, data).catch((e) => console.log(e));
};

export const postApi = (url: string, data: unknown) => {
  return axios
    .post(url, data)
    .then(({ data }) => data)
    .catch((e) => console.log(e));
};
