/**
 * 本地存储token
 */
export function setItem (data) {
  localStorage.setItem('userInfo', data)
}
/**
 * 获取本地存储token
 */
export function getItem () {
  return localStorage.getItem('userInfo')
}
/**
 * 删除本地存储token
 */
export const removeItem = () => {
  localStorage.removeItem('userInfo')
}
