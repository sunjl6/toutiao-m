import request from '@/utils/request'
export const login = data => {
  return request({
      method: 'POST',
      url: '/toutiao/api/login',
      data
  })
}

export const getUserInfo = () => {
  return request({
      method: 'GET',
      url: '/toutiao/getUserInfo'
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
