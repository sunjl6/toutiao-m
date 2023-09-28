<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync = "error"
      error-text="搜索失败，请重新再试"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { SearchPageContent } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      requierd: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pagesize: 15,
      pagenum: 1,
      error: false
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 发送请求获取数据
        const res = await SearchPageContent({
            pagesize: this.pagesize,
            pagenum: this.pagenum,
            qa: this.searchText
        })
        // if (Math.random() > 0.5) {
        //       JSON.parse('adasdfasdf')
        //   }
        this.list.unshift(...res.data.data)
        if (res.data.data.length) {
          this.pagenum++
          console.log('数组还要长度')
          this.loading = false
        } else {
          this.finished = true
          console.log('数组长度0')
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
