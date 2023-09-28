<template>
  <van-icon color="#777" :name="isLiking ? 'good-job':'good-job-o'" @click="onLike"/>
</template>

<script>
import { addArticleLike, delArticleLike } from '@/api/article'
export default {
  name: 'articleIsLike',
  props: {
    isLiking: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      try {
        // 先判断用户是否登入
        if (!this.$store.state.user) {
          return this.$$toast('请先登入')
        }
        if (this.isLiking) {
          // 如果是true 那么点击了就是删除
          await delArticleLike({
            articleId: this.articleId
          })
          this.$emit('update-isLiking', !this.isLiking)
          this.$toast('取消点赞成功')
        } else {
          // 如果false 说明没有搜藏 拿点击了就是搜藏
          await addArticleLike({
            articleId: this.articleId
          })
          this.$emit('update-isLiking', !this.isLiking)
          this.$toast('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast('点赞发生错误')
      }
    }
  }
};
</script>

<style>
</style>
