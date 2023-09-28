<template>
  <div class="search-suggestion">
      <van-cell @click="$emit('search',item)" v-for="(item, index) in suggestList" :key="index" icon="search">
        <div slot="title" v-html="highlihgt(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 监听输入的内容 调取接口获取搜索建议
      // handler (newVal, oldVal) {
      //   this.loadSug(newVal);
      // },
      handler: debounce(function (newVal) {
        this.loadSug(newVal);
      }, 300),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlihgt (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color: #3296fa">${this.searchText}</span>`)
    },
    async loadSug (str) {
      try {
        const arr = []
        const res = await getSearchSuggestion(str);
        const result = this.jsonpToJson(res.data.data);
        // 处理返回数据
        result.forEach((item, index, obj) => {
          arr.push(item[0])
        })
        this.suggestList = arr
      } catch (error) {
        console.log(error)
        this.$toast('获取推荐数据失败');
      }
    },
    // jsonp转化json
    jsonpToJson (jsonpStr) {
      const jsonp = jsonpStr;
      const reg = /^\w+\((\{[^()]+\})\)$/;
      let flag = null;
      const match = jsonp.match(reg);
      console.log(match)
      if (match) {
        flag = JSON.parse(match[1]);
      }
      // console.log(flag.result);
      // flag 里放的每个元素也是数组 请注意，拿回去还好处理下
      return flag.result
    }
  }
};
</script>

<style scoped lang="less"></style>
