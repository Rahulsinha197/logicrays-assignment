import axios from "axios";
import { getAuth } from "./localStorage";
let baseUrl = "";
if (process.env.REACT_APP_NODE_ENV === "development") {
  if (!process.env.REACT_APP_LOCAL_API_URL) {
    throw Error(
      `Setup .env in your project at root directory and add environemnt variable REACT_APP_LOCAL_API_URL`
    );
  }
  baseUrl = process.env.REACT_APP_LOCAL_API_URL;
} else {
  if (!process.env.REACT_APP_API_URL) {
    throw Error(
      `Setup .env in your project at root directory and add environemnt variable REACT_APP_API_URL`
    );
  }
  baseUrl = process.env.REACT_APP_API_URL;
}
const codes = {
  UNAUTHORIZED: 401,
  CUSTOM_TOKEN_EXPIRED: -2,
  REQUEST_TIMEOUT: 408,
  ECONNABORTED: "ECONNABORTED",
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === codes.UNAUTHORIZED) {
      // rootStore.AuthStore.onLogOut()
    }

    if (
      (error.response && error.response.status === codes.REQUEST_TIMEOUT) ||
      error.code === codes.ECONNABORTED
    ) {
      //Looks like the server is taking to long to respond, please try again in sometime.
      console.log(`A timeout happend on url ${error.config.url}`);
      //errorToast({ content: 'Server request timed out. Please retry again.' })
    }

    if (!error?.response?.data?.message) {
      console.log("Server error not found");
      /* Add something went wrong toast error here
    	statusText in toast maybe.*/
    }
    throw error;
    // return Promise.reject(error)
  }
);
const getFullUrl = (url, type) => {
  if (type === "facebook" || type === "instagram") {
    return `${url}`;
  } else return `${baseUrl}${url}`;
};

export const get = (request) => {
  return commonFetch({ method: "get", ...request });
};

export const post = (request) => {
  return commonFetch({
    method: "post",
    ...request,
  });
};

export const patch = (request) => {
  return commonFetch({ method: "patch", ...request });
};

export const put = (request) => {
  return commonFetch({ method: "put", ...request });
};

export const deletee = (request) => {
  return commonFetch({ method: "deletee", ...request });
};

const commonFetch = (request) => {
  const { subUrl, method, data = {}, params, headers = {}, type } = request;

  const url = getFullUrl(subUrl, type);
  const commonHeaders = getCommonHeaders();
  return axios({
    method,
    url,
    params,
    data,
    headers: { ...commonHeaders, ...headers },
  });
};

export const content_types = {
  multipart: {
    "Content-Type": "multipart/form-data",
  },
  json: {
    "Content-Type": "application/json",
  },
};

const getCommonHeaders = () => {
  return {
    ...content_types.json,
    Authorization: `Bearer ${getAuth()}`,
  };
};
