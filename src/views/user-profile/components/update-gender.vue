<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
      :columns="columns"
      :default-index="this.gender"
      show-toolbar
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user';
export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.gender
    };
  },
  methods: {
    onChange (picker, value, index) {
      this.localGender = index;
    },
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      });
      try {
        await updateUserInfo({
          gender: this.localGender
        });
        this.$emit('close');
        this.$emit('update-value', this.localGender);
        this.$toast.success('修改成功');
      } catch (error) {
        console.log(error);
      }
    }
  },
  created () {}
};
</script>

<style lang="less" scoped>
</style>
