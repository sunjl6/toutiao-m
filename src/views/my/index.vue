<template>
    <div class="My-container">
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image class="avatar" round
            :src= "userInfo.photo"
            fit = 'cover'
            />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button round size="mini" to="/user/profile">编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
              <span class="count">{{userInfo.art_count}}</span>
              <span class="text">头条</span>
          </div>
          <div class="data-item">
              <span class="count">{{userInfo.follow_count}}</span>
              <span class="text">关注</span>
          </div>
          <div class="data-item">
              <span class="count">{{userInfo.fans_count}}</span>
              <span class="text">粉丝</span>
          </div>
          <div class="data-item">
              <span class="count">{{userInfo.like_count}}</span>
              <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <div v-else class="header not-login">
          <div class="login-btn" @click="$router.push('/login')">
              <img class="mobile-img" src="~@/assets/mobile.png" alt="">
              <span class="text">登入 / 注册</span>
          </div>
      </div>

      <van-grid class="grid-nav" :column-num="2">
        <van-grid-item  class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item  class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>

      <van-cell title="消息通知" is-link />
      <van-cell class="mb-9" title= "小智同学" is-link/>
      <van-cell v-if="user" @click="onLogout" clickable class="logout-cell" title="退出登入" />
    </div>
  </template>

  <script>
  // import { mapState } from 'vuex';
  import { getUserInfo } from '@/api/user'
  export default {
    name: 'MyIndex',
    components: {},
    props: {},
    data () {
      return {
        userInfo: {}
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    watch: {},
    created () {
      if (this.$store.state.user) {
         this.loadUser()
      }
    },
    mounted () {},
    methods: {
      async loadUser () {
        try {
          const res = await getUserInfo();
          this.userInfo = res.data.data
        } catch (err) {
          console.log(err)
          this.$toast('获取数据失败')
        }
      },
      onLogout () {
        this.$dialog.confirm({
        title: '确定退出吗'
        })
        .then(() => {
            // on confirm
            this.$store.commit('setUser', null)
            this.$store.commit('setUserId', null)
        })
        .catch(() => {
            // on cancel
        });
      }
    }
  }
  </script>

<style scoped lang="less">
.My-container{
  .header{
    height: 361px;
    background-image: url('~@/assets/banner.png');
    // background-color: yellow;
    background-size: cover;
  }
  .not-login{
      display: flex;
      justify-content: center;
      align-content: center;
      .login-btn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
       .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
      }
    }
  .user-info{
    .base-info{
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
         display: flex;
         align-items: center;
        .avatar{
        height: 132px;
        width: 132px;
        border: solid 4px #fff;
        }
        .name{
        margin-left: 23px;
        font-size: 30px;
        color: #fff;
        }
      }

    }
    .data-stats{
      height: 130px;
      // background-color: #ccc;
      display: flex;

      .data-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // background-color: pink;
        // border: solid 4px #fff;
        .count{
          font-size: 36px;
          color: #fff;
        }
        .text{
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav{
    height: 141px;
    .grid-item{
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang{
        color:#eb5253;
      }
      span.text{
        font-size: 28px;
      }
      .toutiao-lishi{
        color:#ff9d1d;
      }
    }
  }
  .logout-cell{
    color: #d86262;
    text-align: center;
  }
  .md-9{
    margin-bottom: 9px;
  }
}
</style>
