import axios from "axios";

import { getToken } from "../utils/auth.util";
import { canPerformAction } from "../utils/permissions.utils";

// const BASE_URL = "http://52.29.184.31:3008/api/v1/";
const BASE_URL = "https://p-post.herokuapp.com/api/v1/";
// const BASE_URL = "http://localhost:3008/api/v1/";

export async function getApiRequestHeader() {
  const authToken = await getToken();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authToken === undefined ? "" : `Bearer ${authToken.token}`
  };
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: false
});

export async function updateHeaders() {
  const header = await getApiRequestHeader();
  instance.defaults.headers = header;
}

export async function request({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }

  return response;
}

export async function newRequest({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }

  if (
    response.status
      ? response.status.toString().indexOf("2") !== 0
      : response.data.status.toString().indexOf("2") !== 0
  ) {
    // eslint-disable-next-line
    throw { response };
  } else {
    return response.data;
  }
}

export async function get(url, params, featureAndAction, config) {
  if (canPerformAction(featureAndAction)) {
    for (var key in params) {
      url = url + "/" + params[key];
    }
    return request({ method: "get", url, data: {}, ...config });
  }
}

export async function newGet(url, params, featureAndAction, config) {
  if (canPerformAction(featureAndAction)) {
    for (var key in params) {
      url = url + "/" + params[key];
    }
    return newRequest({ method: "get", url, data: {}, ...config });
  }
}

export async function del(url, params, config) {
  return request({ method: "delete", url, data: { params }, ...config });
}

export async function post(url, data, featureAndAction, config) {
  if (canPerformAction(featureAndAction)) {
    return request({ method: "post", url, data, ...config });
  }
}

export async function newPost(url, data, featureAndAction, config) {
  if (canPerformAction(featureAndAction)) {
    return newRequest({ method: "post", url, data, ...config });
  }
}

export async function put(url, data, config) {
  return request({ method: "put", url, data, ...config });
}

export const independentRequest = async (url, method, data) => {
  const promise = axios[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }
  const payload = response;
  return payload;
};
