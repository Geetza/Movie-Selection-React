import axios from "axios";

let AxiosConfig = axios.create({
  baseURL: "http://localhost:5111",
});

export default AxiosConfig;
