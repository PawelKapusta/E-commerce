import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090/api/v1", // Now it's local url
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    data => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

export default http;
