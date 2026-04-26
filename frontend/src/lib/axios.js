import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",

  /* The `withCredentials: true` option in the axios configuration allows the API request to include
 credentials such as cookies, authorization headers, or TLS client certificates. This is useful when
 making cross-origin requests and you want to include credentials for authentication purposes. By
 setting `withCredentials` to true, the browser will include the necessary cookies or headers in the
 request, allowing the server to authenticate the user making the request. */
  withCredentials: true,
});
