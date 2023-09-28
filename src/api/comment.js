import request from '@/utils/request'
// 未登入用户获取评论
export const getComments = (params) => {
    return request({
        method: 'GET',
        url: '/toutiao/api/article/getComments',
        params
    })
  }
// 已登入用户获取评论
export const getCommentsLogin = (params) => {
    return request({
        method: 'GET',
        url: '/toutiao/article/getComments',
        params
    })
  }
// 取消评论点赞

// 添加评论点赞
export const addCommentLike = (params) => {
  return request({
      method: 'POST',
      url: '/toutiao/article/addCommentLike',
      params
  })
}

// 取消文章点赞
export const delCommentLike = (params) => {
  return request({
      method: 'DELETE',
      url: '/toutiao/article/delCommentLike',
      params
  })
}

// 发布评论
export const addComments = (data) => {
  return request({
      method: 'POST',
      url: '/toutiao/article/addComments',
      data
  })
}
