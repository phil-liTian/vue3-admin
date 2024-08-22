<!--
 * @Date: 2024-04-12 13:44:16
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper 
    content="需开启测试接口"
    title='图片裁剪'>

    <PCollapseContainer title="头像裁剪">
      <CropperAvatar 
        :uploadApi='uploadApi'
        :value="avatar" />
    </PCollapseContainer>

    <PCollapseContainer class="my-4" title="矩形裁剪">
      <div class="container p-4">
        <div class="cropper-container mr-10">
          <CropperImage :src="img" @cropped="handleCropend" />
        </div>
        <img :src="cropperImg" class="croppered" v-if="cropperImg" alt="">
      </div>
      <p v-if="cropperInfo">裁剪后图片信息: {{ cropperInfo }}</p>
    </PCollapseContainer>

    <PCollapseContainer title="圆形裁剪">
      <div class="container p-4">
        <div class="cropper-container">
          <CropperImage :circled="true" :src="img" @cropped="handleCircleCropend" />
        </div>
        <img :src="circleImg" class="croppered" v-if="circleImg" alt="">
      </div>
      <p v-if="circleInfo">裁剪后图片信息: {{ circleInfo }}</p>
    </PCollapseContainer>
    
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { CropperAvatar, CropperImage } from '@c/Cropper/index'
  import img from '@/assets/images/header.jpg'
  import { useUserStore } from '@s/modules/user'
  import { uploadApi } from '@a/sys/upload'

  defineOptions({ name: 'CropperDemo' })

  const userStore = useUserStore()

  const cropperImg = ref('')
  const cropperInfo = ref('')
  const circleImg = ref('')
  const circleInfo = ref('')

  const avatar = computed(() => {
    return userStore.getUserInfo.avatar
  })

  const handleCropend = ({ imgbase64, imgInfo }) => {
    cropperImg.value = imgbase64
    cropperInfo.value = imgInfo
  }

  const handleCircleCropend = ({ imgbase64, imgInfo }) => {
    circleImg.value = imgbase64
    circleInfo.value = imgInfo
  }
</script>
  
<style lang='less' scoped>
  .container {
    display: flex;
    align-items: center;
    width: 100vw;

    .cropper-container {
      width: 40vw;
    }

    .croppered {
      height: 360px;
    }
  }
</style>