import axios from 'axios';
import { getToken } from './auth';

const http = {
  POST: 'post',
  GET:  'get',
  PUT:  'put',
  DELETE: 'delete',
}

const instance = axios.create({
  baseURL: 'https://authentication-app-11.herokuapp.com/',
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config);
  const user = JSON.parse(getToken());
  if(user){
    config.headers = { ...config.headers, ...user };
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default class Service {

  post(url, payload){
    console.log(payload);
    return this._request({ url: url, method: http.POST, data: payload});
  }

  get(url){
    return this._request({ url: url, method: http.GET});
  }

  put(url, payload) {
    return this._request({ url, method: http.PUT, data: payload });
  }

  delete(url) {
    return this._request({ url, method: http.DELETE });
  }

  _request(config) {
    return instance.request(config);
  }
}