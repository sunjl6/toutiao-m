import request from '@/utils/request'

export const getAllCate = () => {
    return request({
      method: 'GET',
      url: '/toutiao/api/article/Allcate'
    })
  }
export const addCateChannel = (params) => {
    return request({
      method: 'PATCH',
      url: '/toutiao/article/addCate',
      params
    })
  }
export const deleteCateById = (id) => {
    return request({
      method: 'GET',
      url: `/toutiao/article/deleteCateById/${id}`
    })
  }
