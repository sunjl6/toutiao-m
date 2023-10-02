<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人资料"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 资料单元格 -->
    <input type="file" hidden ref="file" @change="onChange">
    <van-cell title="头像" is-link>
      <van-image
        class="avator"
        fit="cover"
        round
        :src="UserInfo.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isUpdateNameShow = true"
      is-link
      :value="UserInfo.name"
    />
    <van-cell
      title="性别"
      is-link
      :value="UserInfo.gender === 0 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      @click="isUpdateBirthdayShow = true"
      is-link
      :value="UserInfo.birthday | formatDate"
    />

    <!-- 点击昵称的弹出层 -->
    <van-popup
      class="nickNameClass"
      v-model="isUpdateNameShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        :name="this.UserInfo.name"
        @update-value="updateName"
      ></UpdateName>
    </van-popup>
    <!-- 点击昵称的弹出层 -->
    <!-- 点击性别弹出层 -->
    <van-popup
      class="genderClass"
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <UpdateGender
        v-if="isUpdateGenderShow"
        :gender="UserInfo.gender"
        @close="isUpdateGenderShow = false"
        @update-value="updateGender"
      ></UpdateGender>
    </van-popup>
    <!-- 点击性别弹出层 -->
    <!-- 点击弹出生日弹出层 -->
    <van-popup
      class="birthClass"
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        :birthday="UserInfo.birthday"
        @close="isUpdateBirthdayShow = false"
        @update-value="updateBirthday"
      ></UpdateBirthday>
    </van-popup>
    <!-- 点击弹出生日弹出层 -->
    <!-- 点击修改头像弹出层 -->
    <van-popup
      class="photoClass"
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <updatePhotoVue
        v-if="isUpdatePhotoShow"
        @close="isUpdatePhotoShow = false"
        @update-photo="updatePhoto"
        :img = 'img'
      ></updatePhotoVue>
    </van-popup>
    <!-- 点击修改头像弹出层 -->

  </div>
</template>

<script>
import { getUserInfo } from '@/api/user';
import UpdateName from '@/views/user-profile/components/update-name.vue';
import UpdateGender from '@/views/user-profile/components/update-gender.vue';
import UpdateBirthday from '@/views/user-profile/components/update-birthday.vue';
import updatePhotoVue from './components/update-photo.vue';
export default {
  name: 'user-profile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    updatePhotoVue
  },
  data () {
    return {
      UserInfo: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    };
  },
  created () {
    this.loadUserInfo();
  },
  methods: {
    updatePhoto (photo) {
      this.UserInfo.photo = photo
      console.log(this.UserInfo.photo)
    },
    onChange () {
      this.isUpdatePhotoShow = true
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.img = data
      this.$refs.file.value = ''
    },
    updateBirthday (birthday) {
      this.UserInfo.birthday = birthday
    },
    updateGender (gender) {
      this.UserInfo.gender = gender;
    },
    updateName (name) {
      this.UserInfo.name = name;
    },
    async loadUserInfo () {
      try {
        const result = await getUserInfo();
        console.log(result);
        this.UserInfo = result.data.data;
      } catch (error) {
        console.log(error);
        return this.$toast.file('获取用户信息失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  .nickNameClass {
    background-color: rgb(241, 241, 241);
  }
  .avator {
    width: 60px;
    height: 60px;
  }
  /deep/ .van-nav-bar {
    .van-icon {
      color: #fff;
    }
  }
}
</style>
