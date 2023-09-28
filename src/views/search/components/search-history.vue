<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearAll', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell v-for="(item, index) in searchHis" :key="index" @click="deleteOrSelect(index,item)" :title="item">
      <van-icon  v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

  <script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHis: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isDeleteShow: false
    };
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    deleteOrSelect (index, item) {
      if (this.isDeleteShow) {
          console.log('delete Item')
          this.$emit('delItem', index)
      } else {
        console.log('selectitem')
       this.$emit('selectItem', item)
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
