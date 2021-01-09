import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_IP
})

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  localStorage.removeItem("Telegram:token");
  localStorage.removeItem("Telegram:user");

  window.location.reload()
  return Promise.reject(error);
});

export default api