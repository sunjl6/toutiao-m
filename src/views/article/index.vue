<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="头条">
      <template #left>
        <van-icon @click="$router.back()" name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.photo"
          />
          <div slot="title" class="user-name">{{ article.name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pub_date | relativeTime }}
          </div>
          <!-- <van-button
            v-if="isfollowed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading ="isFollowLoading"
            >已关注</van-button
          >
          <van-button
            v-else
            @click="onFollow"
            :loading ="isFollowLoading"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >未关注</van-button
          > -->
          <FollowUser
            :isfollowed="this.article.is_followed || false"
            :author_id="this.article.author_id"
            @update-is_followed="updateIsFollowed"
            class="follow-btn"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 用户评论 -->
        <articleComment
          :newAddCommentData="this.newAddCommentData"
          :articleId="this.article.id"
          :Totalcomments="this.Totalcomments"
          type="a"
          @sendComments-data="getParentComponentCommentData"
          @onReply-Click="onReplyClick"
        ></articleComment>
        <!-- 底部区域 -->

        <!-- 底部写评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <!-- 使用封装的组件 -->
          <CommentPost
            :articleId="this.article.id"
            type="a"
            @update-isPostShow="updateIsPostShow"
            @update-totalCount="updateTotalCount"
          ></CommentPost>
        </van-popup>
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="this.Totalcomments" color="#777" />
          <CollectArticle
            :is_collected="this.article.is_collected || false"
            :article_id="this.article.id"
            @update-collected="updateCollected"
          ></CollectArticle>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <isLikeArticle
            :isLiking="article.is_liking"
            :articleId="article.id"
            @update-isLiking="updateIsLiking"
          ></isLikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="isArticleDelete" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="this.loadArticle" class="retry-btn"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply v-if="isReplyShow" :currentComment="currentComment" :Totalcomments="Totalcomments" @close-reply="isReplyShow= false" ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import CommentPost from '@/views/article/components/article-comment-post.vue';
import { getArticleById, LoginUsergetArticleById } from '@/api/article';
import { ImagePreview } from 'vant';
import CollectArticle from '@/components/collect-article/index.vue';
import articleComment from '@/views/article/components/article-comment.vue';
import isLikeArticle from '@/components/islike-article';
// import { deleteFollowUser, addFollowUser } from '@/api/user';
import FollowUser from '@/components/follow-user/index.vue';
import CommentReply from '@/views/article/components/article-comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    articleComment,
    isLikeArticle,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      isLoading: true,
      isArticleDelete: false,
      isfollowed: false,
      Totalcomments: '0',
      // isFollowLoading: false
      isPostShow: false, // 控制底部发布评论弹出效果
      isReplyShow: false,
      newAddCommentData: {
        type: Object
      },
      currentComment: {
        type: [Object]
      }
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.loadArticle();
  },
  methods: {
    onReplyClick (commentData) {
      this.isReplyShow = true
      this.currentComment = commentData
    },
    updateTotalCount (count) {
      console.log(count);
      this.Totalcomments = count;
    },
    updateIsPostShow (data) {
      this.isPostShow = false;
      this.newAddCommentData = data;
    },
    updateIsLiking (isLiking) {
      this.article.is_liking = isLiking;
    },
    getParentComponentCommentData (data) {
      this.Totalcomments = data.total_count;
    },
    updateCollected (b) {
      this.article.is_collected = b;
    },
    updateIsFollowed (b) {
      this.article.is_followed = b;
    },
    // async onFollow () {
    //   this.isFollowLoading = true
    //   try {
    //     if (this.article.is_followed) {
    //         await deleteFollowUser({
    //         author_id: this.article.author_id
    //       })
    //       this.isfollowed = !this.isfollowed
    //     } else {
    //         await addFollowUser({
    //           author_id: this.article.author_id
    //         })
    //         this.isfollowed = !this.isfollowed
    //       }
    //   } catch (error) {}
    //   this.isFollowLoading = false
    // },
    previewImage () {
      const articleContentDom = this.$refs['article-content'];
      const imgs = articleContentDom.querySelectorAll('img');
      const imgList = [];
      imgs.forEach((img, index, obj) => {
        imgList.push(img.src);
        img.addEventListener('click', () => {
          ImagePreview([img.src]);
        });
      });
    },
    async loadArticle () {
      try {
        let res = [];
        // 判断是否登入，如果登入发送那个获取登入的
        if (this.$store.state.user) {
          res = await LoginUsergetArticleById(this.articleId);
          this.isfollowed = res.data.data.is_followed;
        } else {
          this.isfollowed = false;
          res = await getArticleById(this.articleId);
        }
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdfasdfasdf');
        // }
        if (res.data.status === 404) {
          this.isLoading = false;
          this.isArticleDelete = true;
          console.log(this.isLoading);
          console.log(this.isArticleDelete);
          return;
        }
        this.article = res.data.data;
        // 获取数据后获取dom元素，实现图片预览
        // 因为我们文章展示加了判断，那么可能存在dom元素还没渲染，所有会undefined 这时候要加个定时器设置事件是0秒就行了
        setTimeout(() => {
          this.previewImage();
        }, 0);
        this.isArticleDelete = true;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  ::v-deep .van-nav-bar {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon-arrow-left {
          color: #fff;
        }
      }
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
