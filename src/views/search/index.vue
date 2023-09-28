<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏结束 -->

    <!-- 搜索结果 -->
    <searchResult :searchText ="searchText" v-if="isResultShow"></searchResult>
    <!-- 搜索建议 -->
    <searchSuggestion  @search="onSearch" :searchText="searchText" v-else-if="searchText"></searchSuggestion>
    <!-- 搜索历史 -->
    <searchHistory :searchHis="searchHis" @selectItem="onSelectItem" @search="onSearch" @clearAll="searchHis = []" @delItem="onDelItem" v-else></searchHistory>

  </div>
</template>
<script>
import searchHistory from './components/search-history.vue';
import searchResult from './components/search-result.vue';
import searchSuggestion from './components/search-suggestion.vue';
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHis: getItem('SEARCH_HISTORY')
    };
  },
  computed: {},
  watch: {
    searchHis () {
      setItem('SEARCH_HISTORY', this.searchHis)
    }
  },
  created () {},
  methods: {
    // getSugText (text) {
    //   this.searchText = text
    //   this.isResultShow = true
    // },
    onSelectItem (val) {
      console.log(val)
      this.searchText = val
    },
    onDelItem (val) {
      this.searchHis.splice(val, 1)
    },
    onSearch (text) {
        this.searchText = text

        this.searchHis = getItem('SEARCH_HISTORY')
        const index = this.searchHis.indexOf(text)
        if (index !== -1) {
            this.searchHis.splice(index, 1)
        }
        this.searchHis.unshift(text)
        setItem('SEARCH_HISTORY', this.searchHis)

        this.isResultShow = true
    },
    onCancel () {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.search-container {
   padding-top: 108px;
  .search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
