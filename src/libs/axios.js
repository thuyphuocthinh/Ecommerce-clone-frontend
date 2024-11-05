import axios from "axios";

const axiosInstance = new axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, // send cookies in request
});

export default axiosInstance;
