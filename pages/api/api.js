import axios from "axios";
import { getToken } from "./auth";
const apiLogin = axios.create({
    baseURL: "http://127.0.0.1:8080/api/login"
});

const apiAgendar = axios.create({
    baseURL: "http://127.0.0.1:8080/api/agendar"
});

const apiGetUser = axios.create({
    baseURL: "http://127.0.0.1:8080/api/client"
});

const apiMail = axios.create({
  baseURL: "http://127.0.0.1:8080/api/mail"
});


apiLogin.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }
  return config;
});


apiAgendar.interceptors.request.use(async config => {
    return config;
  });

export {apiLogin, apiAgendar, apiGetUser, apiMail};