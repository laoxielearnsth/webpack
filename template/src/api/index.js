import axios from 'axios';

let http = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data){
      if (data.hasOwnProperty(k) === true){
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

// request拦截器
http.interceptors.request.use(config => {
  // 修改config 设置请求头等
  return config
}, error => {
  return Promise.reject(error);
});

// response拦截器
http.interceptors.response.use(response=>{
  // todo 成功状态下 自定义统一标准处理
  const status = response.data.code;
  if (status) {
    switch (status) {
      case 200: {
        break
      }
      case 2000: {
        break
      }
    }
  }
  return response;
}, error => {
  const status = error.response.status;
  // todo 根据标准status code 进行处理
  switch (status) {
    case 404: {
      // return Promise.reject(404);
      // do nothing
      break;
    }
    case 500: {
      return Promise.reject(500);
    }
  }
});

function apiAxios(method, url, params) {
  return http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  }
}
