<template>
  <div class="comment-reply">
    <!-- /导航栏 -->
    <van-nav-bar :title="`${this.currentComment.reply_count}条回复`">
      <van-icon slot="left" name="cross" color="#fff" @click="onClose" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :commentsData="currentComment" :Totalcomments="Totalcomments"></CommentItem>
      <!-- /当前评论项 -->
      <van-cell>全部回复</van-cell>
      <!-- 评论的回复列表 -->
      <CommentList type="c" :articleId="currentComment.id" :newAddCommentData="this.newAddCommentData" :Totalcomments="Totalcomments"></CommentList>
      <!-- /评论的回复列表 -->
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round
      @click ='isPostShow= true'
      >写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <!-- 输入回复弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost v-if="isPostShow" :articleId="currentComment.id" type = 'c' @update-isPostShow="updatePostShow" @update-totalCount="getTotalCount"></CommentPost>
    </van-popup>
    <!-- 输入回复弹出层 -->
  </div>
</template>

  <script>
import CommentItem from '@/views/article/components/article-comment-plus-reply.vue';
import CommentList from '@/views/article/components/article-comment.vue';
import CommentPost from '@/views/article/components/article-comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    currentComment: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      isPostShow: false,
      newAddCommentData: {
        type: Object
      },
      Totalcomments: this.currentComment.reply_count
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    getTotalCount (total) {
      console.log('total' + total)
      this.Totalcomments = total
    },
    updatePostShow (data) {
      this.isPostShow = false
      this.newAddCommentData = data
    },
    onClose () {
      this.$emit('close-reply', false);
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-wrap{
  position: fixed;
  top:92px;
  left:0;
  right:0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: solid 1px red;
  .post-btn {
    width: 60%;
    background-color: green;
    color: #fff;
  }
}
</style>
