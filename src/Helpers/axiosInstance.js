// import axios from "axios";
// const BASE_URL="http://localhost:5001/api/v1";
//  const axiosInstance=axios.create();
//  axiosInstance.defaults.baseURL=BASE_URL;
//  axiosInstance.defaults.withCredentials=true;
//  export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
    // withCredentials:true, 
  });
};
export default axiosInstance;