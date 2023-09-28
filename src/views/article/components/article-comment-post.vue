<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length">发布</van-button>
  </div>
</template>

  <script>
  import { addComments } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    articleId: {
        type: [Number, String, Object],
        required: true
    },
    type: {
        type: String,
        required: true,
        validator (value) {
            return ['a', 'c'].includes(value)
        },
        default: 'a'
      }
  },
  data () {
    return {
      message: ''
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
        this.$toast.loading({
        message: '加载中...',
       forbidClick: true,
       duration: 0
      });
        try {
            const result = await addComments({
                content: this.message,
                articleId: this.articleId,
                type: this.type
            })
            this.$emit('update-isPostShow', result.data.data[0])
            this.$emit('update-totalCount', result.data.total_count)
            this.$emit('close', false)
            this.message = ''
            this.$toast.success('评论成功')
        } catch (error) {
            console.log(error)
            this.$emit('close', false)
            return this.$toast.fail('评论失败')
        }
    }
  }
};
</script>

  <style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
