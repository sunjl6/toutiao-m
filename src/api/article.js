import request from '@/utils/request'
// 分页查询文章内容
export const getArticleContent = params => {
    return request({
      method: 'GET',
      url: '/toutiao/api/article/pageContent',
      params
    })
  }
// 分类5条随机内容
export const getRandomArticle = params => {
  return request({
    method: 'GET',
    url: '/toutiao/api/article/randomArticle',
    params
  })
}

// 已登入用户获取用户搜藏的文章分类
export const getMyArticle = () => {
  return request({
    method: 'GET',
    url: '/toutiao/article/myCate'
  })
}

// 未登入用户获取默认文章分类
export const getCateUnReg = () => {
  return request({
    method: 'GET',
    url: '/toutiao/api/article/cate'
  })
}
// 未登入用户获取文章详细
export const getArticleById = (id) => {
  return request({
    method: 'GET',
    url: `/toutiao/api/article/articleById/${id}`
  })
}
// 登入用户获取文章详细
export const LoginUsergetArticleById = (id) => {
  return request({
    method: 'GET',
    url: `/toutiao/article/LogArticleById/${id}`
  })
}
// 搜藏文章
export const addCollectArticle = (params) => {
  return request({
      method: 'POST',
      url: '/toutiao/article/addCollectArticle',
      params
  })
}
// 取消搜藏文章
export const delCollectArticle = (params) => {
  return request({
      method: 'DELETE',
      url: '/toutiao/article/delCollectArticle',
      params
  })
}
// 增加文章点赞
export const addArticleLike = (params) => {
  return request({
      method: 'POST',
      url: '/toutiao/article/addArticleLike',
      params
  })
}
// 取消文章点赞
export const delArticleLike = (params) => {
  return request({
      method: 'DELETE',
      url: '/toutiao/article/delArticleLike',
      params
  })
}
