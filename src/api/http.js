import http from '@/utlis/axi.js'
import { getItem } from '@/utlis/localStorage.js'
export function getUserInfo (form) {
  return http.post('/mp/v1_0/authorizations', form)
}

/**
 * 设置请求拦截器
 */
http.interceptors.request.use(function (config) {
  const userInfo = getItem()
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log('拦截器错误')
  return Promise.reject(error)
})

/**
 * 首页渲染 用户名和头像
 */
export const getUserInitInfo = () => {
  // const userInfo = localStorage.getItem('userInfo')
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${userInfo}`
    // }

  })
}
