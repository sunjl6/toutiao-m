<template>
  <div class="article-list">
    <van-pull-refresh :success-text="refreshMessage" success-duration="1500" v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(obj,index) in list" :key="index" :title="obj.title" /> -->
      <ArticleItem v-for="(obj,index) in list" :key="index" :article="obj"></ArticleItem>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleContent, getRandomArticle } from '@/api/article'
import ArticleItem from '@/components/article-item.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      refreshMessage: '刷新成功了',
      pageInfo: {
        pagesize: 10,
        pagenum: 1,
        cate_id: this.channel.id
      }
    };
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  methods: {
   async onRefresh () {
      // console.log('refresh')
      try {
        const res = await getRandomArticle({
          cate_id: this.pageInfo.cate_id
        })
        res.data.data.forEach(function (item, index, obj) {
          const img = JSON.parse(item.cover_img)
          item.cover_img = img
        })
        this.refreshMessage = `刷新成功，更新了${res.data.data.length}条数据`
        this.list.unshift(...res.data.data)
        this.refreshing = false
      } catch (err) {
        this.refreshMessage = '刷新失败'
        console.log('获取失败', err)
      }
    },
    async onLoad () {
      try {
        const res = await getArticleContent({
          cate_id: this.pageInfo.cate_id,
          pagesize: this.pageInfo.pagesize,
          pagenum: this.pageInfo.pagenum
        })
        res.data.data.forEach(function (item, index, obj) {
          const img = JSON.parse(item.cover_img)
          item.cover_img = img
        })
        this.list.push(...res.data.data)
        if (res.data.data.length) {
          this.pageInfo.pagenum += 1
          this.loading = false
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('请求失败', err)
        this.error = true
        this.loading = false
      }
    }
    }
  }

</script>

<style lang="less" scoped>
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
