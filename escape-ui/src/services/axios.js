import axios from "axios";

let axiosInstance = null;

const getAxiosInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: localStorage.getItem('localServerIp')?`http://${localStorage.getItem('localServerIp')}:8080` : 'http://127.0.0.1:8080',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return axiosInstance;
};

export const updateIpAddress = (ip) => {
  localStorage.setItem("localServerIp", ip);
  const connection = getAxiosInstance();
  connection.defaults.baseURL = `http://${ip}:8080`
};

export default getAxiosInstance;
