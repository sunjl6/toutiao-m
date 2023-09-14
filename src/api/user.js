import request from '@/utils/request'
export const login = data => {
  return request({
      method: 'POST',
      url: '/api/login',
      data
  })
}

export const getUserInfo = () => {
  return request({
      method: 'GET',
      url: '/getUserInfo'
  })
}
export const getCate = () => {
  return request({
    method: 'GET',
    url: '/article/cate'
  })
}
