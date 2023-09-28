<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <commentsPlus
        v-for="(item, index) in list"
        :key="index"
        :commentsData="item"
        :index = 'index'
        :Totalcomments="Totalcomments"
        @update-comment-isLiking="updateCommentLiking"
        @update-comment-countAdd="updateCommentCountAdd"
        @update-comment-countRed="updateCOmmentCountRed"
        @onReply-Click="$emit('onReply-Click',$event)"
      >
      </commentsPlus>
    </van-list>
  </div>
</template>

<script>
import { getComments, getCommentsLogin } from '@/api/comment';
import commentsPlus from '@/views/article/components/article-comment-plus.vue';
export default {
  name: 'CommentList',
  components: {
    commentsPlus
  },
  props: {
    // 注意这个id 是 分类id 由于前期数据库字段取的名称偶有误，
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    newAddCommentData: {
        type: Object
    },
    type: {
        type: String,
        required: true,
        validator (value) {
            return ['a', 'c'].includes(value)
        },
        default: 'a'
      },
      Totalcomments: {
        type: [Number, String, Object],
        required: true
      }
  },
  data () {
    return {
      pageInfo: {
        pagesize: 5,
        pagenum: 1,
        article_id: this.articleId
      },
      finished: false,
      loading: false,
      list: [], // 这个list 里面是这篇文章的所有评论
      error: false
    };
  },
  methods: {
    updateCOmmentCountRed (index) {
        this.list[index].like_count--
    },
    updateCommentCountAdd (index) {
        this.list[index].like_count++
    },
    updateCommentLiking (index) {
        this.list[index].is_liking = !this.list[index].is_liking
    },
    async onLoad () {
      try {
        if (this.$store.state.user) {
            console.log(this.type)
          const results = await getCommentsLogin({
            pagesize: this.pageInfo.pagesize,
            pagenum: this.pageInfo.pagenum,
            article_id: this.pageInfo.article_id,
            type: this.type
          });
          this.list.push(...results.data.data);
          this.$emit('sendComments-data', results.data);
          if (results.data.data.length) {
            this.loading = false;
            this.pageInfo.pagenum += 1;
          } else {
            this.finished = true;
          }
        } else {
            console.log(this.type)
          const results = await getComments({
            pagesize: this.pageInfo.pagesize,
            pagenum: this.pageInfo.pagenum,
            article_id: this.pageInfo.article_id,
            type: this.type
          });
          this.list.push(...results.data.data);
          this.$emit('sendComments-data', results.data);
          if (results.data.data.length) {
            this.loading = false;
            this.pageInfo.pagenum += 1;
          } else {
            this.finished = true;
          }
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.log(error);
      }
    }
  },
  watch: {
    newAddCommentData (newVal, oldVal) {
        console.log(this.list)
        console.log(newVal)
        this.list.unshift(newVal)
    }
  }
};
</script>

<style lang="less" scoped>
</style>
