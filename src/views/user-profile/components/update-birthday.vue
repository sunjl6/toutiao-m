<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user';
import dayjs from 'dayjs';
export default {
  name: 'UpdateBrithday',
  props: {
    birthday: {
      type: [String],
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(this.birthday)
    };
  },
  methods: {
    async onConfirm () {
        this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      });
      try {
        const birth = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(birth)
        await updateUserInfo({
            birthday: birth
        });
        console.log(this.birthday)
        this.$emit('close');
        this.$emit('update-value', birth);
        this.$toast.success('修改成功')
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
