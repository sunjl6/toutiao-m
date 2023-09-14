<template>
    <div class="home-container">
     <van-nav-bar class="page-nav-bar" fixed>
      <!-- <div class="van-nav-bar__title" > -->
        <van-button
        class="search-btn"
        slot="title"
        round
        type="info"
        size="small"
        icon="search"
        >
          搜索
        </van-button>
      <!-- </div> -->
     </van-nav-bar>
     <van-tabs  class="channel-tabs" v-model="active" animated swipeable >
      <van-tab :title= obj.name v-for="obj in cateList" :key="obj.id">
        <articleList :channel = obj></articleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    </div>
  </template>

  <script>
  import { getCate } from '@/api/user';
  import articleList from '@/views/home/components/article-list.vue'
  export default {
    name: 'HomeIndex',
    components: {
      articleList
    },
    props: {},
    data () {
      return {
        active: 0,
        cateList: []
      }
    },
    computed: {},
    watch: {},
    created () {
      this.getArticleCate()
    },
    mounted () {},
    methods: {
      async getArticleCate () {
        const res = await getCate()
        if (res.data.status !== 0) {
          return this.$toast(res.data.message)
        }
         this.cateList = res.data.data
        // console.log('res.data是' + res.data.data)
        // console.log('list是' + this.cateList[0].name)
      }
    }
  }
  </script>
<style lang = "less" scoped>
.home-container{
  padding-top:176px;
  padding-bottom: 100px;
::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar{
    .search-btn{
      width: 555px;
      height: 64px;
      background-color:#5babfb;
      border:none;
      font-size: 28px;
    }
    ::v-deep .van-icon {
      font-size: 32px;
      color: antiquewhite;
    }
  }
  ::v-deep .channel-tabs{
    .van-tabs__wrap{
      height: 82px;
      top: 92px;
      position:fixed;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab{
      min-width: 200px;
      border-right: solid 1px #d6d6df;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      i.toutiao {
        font-size: 35px;
      }
      &:before{
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder{
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
