<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
        <div v-if="article.cover_img.length === 3" class="cover-wrap">
          <div v-for="(img, index) in article.cover_img" :key="index" class="cover-item">
            <van-image
              class="cover-item-img"
              fit="cover"
              :src= "img"
            />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>作者:源自网络</span>
          <span>99 评论</span>
          <span>{{ article.pub_date | relativeTime}}</span>
        </div>
    </div>
    <van-image
      v-if ="article.cover_img.length === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src= article.cover_img[0].toString()
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex:unset;
    width:232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover{
    width:232px;
    height: 146px;
  }
  .label-info-wrap span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
