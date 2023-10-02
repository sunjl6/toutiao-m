import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import My from '@/views/my'
import Qa from '@/views/qa'
import Video from '@/views/video'
import Search from '@/views/search'
import Article from '@/views/article'
import User from '@/views/user-profile'
Vue.use(VueRouter)
const routes = [
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/user/profile',
    name: 'User-profile',
    component: User
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home', // 默认根路径跳转home
        name: 'home',
        component: Home
      },
      {
        path: '/my',
        name: 'my',
        component: My
      },
      {
        path: '/qa',
        name: 'qa',
        component: Qa
      },
      {
        path: '/video',
        name: 'video',
        component: Video
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
