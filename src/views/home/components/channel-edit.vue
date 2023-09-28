<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button @click="isEdit = !isEdit" type="danger" class="edit-btn" round plain size="mini"
        >{{ isEdit ? '完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        v-for="(obj, index) in myChannel"
        :key="index"
        @click="onMyChannelClick(obj,index)"
        class="grid-item"
      >
        <van-icon v-show="isEdit && !MustShow.includes(obj.id)" slot="icon" name="clear"></van-icon>
        <span  slot="text" :class="{ active: active === index }" class="text">{{ obj.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="(obj,index) in recommend" :key="index"
        @click="onAddChannel(obj,index)"
        text="文字"
      >
      <span slot="text" class="text">{{ obj.name }}</span>
    </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllCate, addCateChannel, deleteCateById } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage';
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      MustShow: [1]
    }
  },
  computed: {
    ...mapState(['user']),
    recommend () {
      // const rec = []
      // this.allChannels.forEach(channel => {
      //   const bl = this.myChannel.find(function (myChannel, index, obj) {
      //     return myChannel.id === channel.id
      //   })
      //    if (!bl) {
      //     rec.push(channel)
      //    }
      // })
      // return rec
     return this.allChannels.filter((channel) => {
       return !this.myChannel.find((myChannel) => {
          return myChannel.id === channel.id
        })
     })
    }
  },
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
      this.loadAllChannels()
    },
  methods: {
    async deleteChannel (channel) {
        try {
                  if (this.user) {
          // 有用户，说明登入，发生请求删除
           await deleteCateById(channel.id)
        } else {
          // 否则没用用户就是修改本地存储 删除其实就是把数组重新存到本地存储
          setItem('TOUTIAO_CHANNELS', this.myChannel)
        }
        } catch (error) {
          this.$toast('操作失败，稍后再试')
        }
      },
      onMyChannelClick (channel, index) {
        if (this.isEdit) {
          // 如果是true 说明 编辑了 那么就实现删除频道

          // 这里是确保第一个不能被删除
          if (this.MustShow.includes(channel.id)) {
              return
          }
          // 如果删除的是激活分类的前面一个就修改父组件激活的分类往前
          if (index <= this.active) {
            this.$emit('update-active', this.active - 1, true)
          }
          // 删除频道
          // this.myChannel.splice(index, 1)
          this.$emit('please-del-Channel', index)

          // 这里调用持久化方法，单独封装
          this.deleteChannel(channel)
        } else {
          // 如果是false 那么就是未编辑状态。点击会到这个分类的页面。
          this.$emit('update-active', index, false)
        }
      },
      async onAddChannel (channel) {
        if (this.isEdit) {
          // this.myChannel.push(channel)
          this.$emit('please-add-Channel', channel)
        }
        if (this.user) {
          // 有user 说明用户已经登入了 发生请求
          try {
                   const res = await addCateChannel(
            {
              id: channel.id,
              seq: channel.length
            }
          )
          console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          // 么有user 用户没用登入 本地存储
          setItem('TOUTIAO_CHANNELS', this.myChannel)
        }
      },
      async loadAllChannels () {
        try {
           const res = await getAllCate()
           this.allChannels = res.data.data
           console.log(res)
        } catch (error) {
          this.$toast('获取所有文章失败')
        }
      }
    }
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: solid 1px #f85959;
  }
  ::v-deep .grid-item {
    width: 160px;
    height: 80px;
    .van-grid-item__content {
      background-color: rgb(249, 247, 247);
      .van-grid-item__text{
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active{
        color: red;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
  ::v-deep .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-grid-item__icon {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
  ::v-deep .my-grid {
    .grid-item {
      .van-grid-item__content {
        .van-icon-clear {
          font-size: 14px;
          color: #cacaca;
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
    }
  }
}
</style>
