<template>
  <van-icon :name="is_collected?'star':'star-o'" :class = "{collected : is_collected}" @click="onCollected"/>
</template>

<script>
import { addCollectArticle, delCollectArticle } from '@/api/article'
export default {
    name: 'CollectArticle',
    props: {
        is_collected: {
            type: Boolean,
            required: true
        },
        article_id: {
            type: [Number, String, Object],
            required: true
        }
    },
    methods: {
       async onCollected () {
            try {
                if (!this.$store.state.user) {
               return this.$toast('请先登入')
            }
            if (this.is_collected) {
                // 已经搜藏了点击取消
                await delCollectArticle({
                    id: this.article_id
                })
                this.$emit('update-collected', !this.is_collected)
                this.$toast('取消搜藏')
            } else {
                // 未搜藏 点击搜藏
                await addCollectArticle({
                    id: this.article_id
                })
                this.$emit('update-collected', !this.is_collected)
                this.$toast('已搜藏')
                // const arr = [{
                //     articleid: 1,
                //     status: 1
                // }, {
                //     articleid: 2,
                //     status: -1
                // }]
                // console.log(arr[1])
            }
            } catch (error) {
             console.log(error)
            }
        }
    }
};
</script>

<style lang="less" scoped>
.collected{
        color: #ffa500;
}
</style>
