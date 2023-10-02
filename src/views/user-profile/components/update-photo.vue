<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="canncle" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确认</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updataPhoto } from '@/api/user';
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
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
        // 原文使用的是 toBlob 方法 通过formData 传给后台，我这里为了方法 暂时使用 dataurl 来存放
        // var dataURL = $().cropper('getCroppedCanvas').toDataURL('image/jpeg');
        const dataURL = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        // 下面调用请求方法，修改图片
        // 通知父组件 修改图片
        await updataPhoto({
          photo: dataURL
        });
        this.$emit('update-photo', dataURL);
        this.$emit('close');
        this.$toast.success('修改图片成功')
      } catch (error) {
        console.log(error);
        this.$toast.fail('保存图片失败');
      }
    }
  },
  mounted () {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    });
  }
};
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .canncle,
    .confirm {
      height: 90px;
      width: 90px;
      display: flex;
      font-size: 30px;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
}
</style>
