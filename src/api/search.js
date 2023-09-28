import request from '@/utils/request'
export const getSearchSuggestion = (str) => {
    return request({
        method: 'GET',
        url: `/taobao/sug?area=etao&code=utf-8&callback=search_data&q=${str}`,
        dataType: 'jsonp',
        jsonpCallback: 'search_data'
    })
}
export const SearchPageContent = (params) => {
    return request({
      method: 'GET',
      url: '/toutiao/api/article/SearchPageContent',
      params
    })
  }
