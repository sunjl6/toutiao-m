import request from '@/utils/request'
// 分页查询文章内容
export const getArticleContent = params => {
    return request({
      method: 'GET',
      url: '/article/pageContent',
      params
    })
  }
// 分类5条随机内容
export const getRandomArticle = params => {
  return request({
    method: 'GET',
    url: '/article/randomArticle',
    params
  })
}
