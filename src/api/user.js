import request from '@/utils/request'
export const login = data => {
  return request({
      method: 'POST',
      url: '/toutiao/api/login',
      data
  })
}
// 获取用户信息 /user/getUserInfo
export const getUserInfo = () => {
  return request({
      method: 'GET',
      url: '/toutiao/user/getUserInfo'
  })
}
// 更新用户信息 /user/updateUserInfo
export const updateUserInfo = (data) => {
  return request({
      method: 'POST',
      url: '/toutiao/user/updateUserInfo',
      data
  })
}
// 更新用户photo
export const updataPhoto = (data) => {
  return request({
      method: 'POST',
      url: '/toutiao/user/photo',
      data
  })
}
// 取消关注
export const deleteFollowUser = (params) => {
  return request({
      method: 'DELETE',
      url: '/toutiao/article/unFollowUser',
      params
  })
}
// 添加关注
export const addFollowUser = (params) => {
  return request({
      method: 'POST',
      url: '/toutiao/article/addFollowUser',
      params
  })
}
