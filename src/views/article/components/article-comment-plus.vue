<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentsData.photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentsData.name }}</div>
      <van-button
        class="like-btn"
        :loading="commentLoading"
        :class="{liked: commentsData.is_liking}"
        :icon="commentsData.is_liking ? 'good-job':'good-job-o'"
        @click="onLiking"
      >
        {{ commentsData.like_count || "赞" }}</van-button
      >
    </div>
    <div slot="label">
      <p class="comment-content">{{ commentsData.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentsData.pub_date | relativeTime
        }}</span>
        <van-button class="reply-btn" size="small"  round @click="$emit('onReply-Click',commentsData)"
          >回复 {{ commentsData.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>
<script>
import { addCommentLike, delCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    index: {
      type: Number
      // required: true
    },
    commentsData: {
      type: Object,
      required: true
    },
    Totalcomments: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLiking () {
      this.commentLoading = true
      try {
        if (!this.$store.state.user) {
          // 用户未登入了
          return this.$toast('请先登入');
        }
        // 用户登入
        if (this.commentsData.is_liking) {
          // is_liking 是true 那么就点击删除
          await delCommentLike({
            commentId: this.commentsData.id,
            type: 'a'
          })
          this.$emit('update-comment-isLiking', this.index)
          this.$emit('update-comment-countRed', this.index)
          this.$toast('取消点赞')
        } else {
          // is_liking 是false 那么添加
          await addCommentLike({
            commentId: this.commentsData.id,
            type: 'a'
          })
          this.$emit('update-comment-isLiking', this.index)
          this.$emit('update-comment-countAdd', this.index)
          this.$toast('点赞成功')
        }
      } catch (error) {
        console.log(error);
        this.$toast('点赞失败');
      }
      this.commentLoading = false
    }
  }
};
</script>

  <style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: red;
    }
  }
}
</style>
