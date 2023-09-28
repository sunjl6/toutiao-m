<template>
  <van-button
    v-if="isfollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="isFollowLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    @click="onFollow"
    :loading="isFollowLoading"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >未关注</van-button
  >
</template>

<script>
import { deleteFollowUser, addFollowUser } from '@/api/user';
import '@/store/index'
export default {
  name: 'FollowUser',
  created () {
  },
  props: {
    isfollowed: {
        type: Boolean,
        required: true
    },
    author_id: {
        type: [Number, String, Object],
        required: true
    }
  },
  data () {
    return {
        isFollowLoading: false
    };
  },
  methods: {
    async onFollow () {
        if (!this.$store.state.user) {
          return this.$toast('请先登入后再关注')
        }
      this.isFollowLoading = true
      try {
        if (this.isfollowed) {
            await deleteFollowUser({
            author_id: this.author_id
          })
          this.$emit('update-is_followed', !this.isfollowed)
        } else {
            await addFollowUser({
              author_id: this.author_id
            })
            this.$emit('update-is_followed', !this.isfollowed)
          }
      } catch (error) {
        console.log(error)
      }
      this.isFollowLoading = false
    }
  }
};
</script>

<style >
</style>
