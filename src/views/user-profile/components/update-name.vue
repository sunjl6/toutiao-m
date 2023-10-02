<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onUpdateSubmit"
    />
    <div class="nickNam-wrap">
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          maxlength="10"
          placeholder="请输入昵称"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user';
export default {
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      message: this.name
    };
  },
  methods: {
    async onUpdateSubmit () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      });
      try {
        await updateUserInfo({
          name: this.message
        });
        this.$emit('close');
        this.$emit('update-value', this.message);
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.update-name {
  .nickNam-wrap {
    margin-top: 20px;
  }
  /deep/ .van-nav-bar__content {
    background-color: #fff;
    .van-nav-bar__title {
      color: black;
    }
  }
}

//.van-nav-bar__content
</style>
