<template>
  <PBasicModal 
    width='800px'
    @ok='handleOk'
    @register='register'
    :title="t('modalTitle')">
    <div :class="prefixCls">
      <div :class="`${prefixCls}-left`">
        <div :class='`${prefixCls}-cropper`'>
          <CropperImage 
            v-if='src'
            height="300px"
            :src="src"
            circled
            @ready='handleReady'
            @cropped='handleCropped' />
        </div>

        <div :class='`${prefixCls}-toolbar`'>
          <Upload :showUploadList='false' accept='image/*' :beforeUpload='handleBeforeUpload'>
            <Tooltip :title="t('selectImage')" placement='bottom'>
              <PButton size='small' type='primary' preIcon='material-symbols:upload' />
            </Tooltip>
          </Upload>

          <Space>
            <Tooltip :title="t(item.title)" placement='bottom' v-for="item in toolbarList" :key='item.title'>
              <PButton 
                type='primary'
                size='small'
                :disabled="!src"
                :preIcon="item.preIcon" 
                @click='handleToolbar(item.type, item.number)' />
            </Tooltip>
          </Space>
        </div>
      </div>

      <div :class="`${prefixCls}-right`">
        <div :class='`${prefixCls}-preview`'> 
          <img :src="previewSrc" v-if='previewSrc' alt="">
        </div>

        <template v-if='previewSrc'>
          <div :class='`${prefixCls}-group`'>
            <Avatar :src='previewSrc' size='large' />
            <Avatar :src='previewSrc' :size='48' />
            <Avatar :src='previewSrc' :size='64' />
            <Avatar :src="previewSrc" :size="80" />
          </div>
        </template>
      </div>
    </div>
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { PropType, ref } from 'vue';
  import { Avatar, Tooltip, Upload, Space } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign';
  import { useI18n } from '@h/web/useI18n'
  import CropperImage from './Cropper.vue'
  import { propTypes } from '@/utils/propTypes';
  import { useModal } from '@c/PBase/Modal/index'
  import { toolbarList } from './toolbarConfig'
  import { dataURLtoBlob } from '@/utils/file/base64Conver';
  
  defineOptions({ name: 'CropperModal' })
  type apiFunParams = { file: Blob, filename: string, name: string }
  const props = defineProps({
    size: propTypes.number.def(5),
    src: propTypes.string.def(''),
    uploadApi: {
      type: Function as PropType<(params: apiFunParams) => Promise<any>>,
    }
  })
  let scaleX = 1
  let scaleY = 1
  const emits = defineEmits(['uploadError', 'uploadSuccess'])
  const { t } = useI18n('component.cropper')
  const { prefixCls } = useDesign('cropper-modal')
  const src = ref(props.src || '')
  const previewSrc = ref('')
  const cropper = ref<Cropper>()

  const [ register, { setModalProps, closeModal } ] = useModal()
  const handleToolbar = (type: string, number?: Number) => {
    if ( type === 'scaleX' ) {
      scaleX = number = scaleX === 1 ? -1 : 1
    }

    if ( type === 'scaleY' ) {
      scaleY = number = scaleY === 1 ? -1 : 1
    }

    cropper.value?.[type](number)
  }

  const handleReady = (cropperInstance: Cropper) => {
    cropper.value = cropperInstance
  }

  let fileName = ''
  const handleBeforeUpload = (file: File) => {
    const { size } = props
    if ( size && file.size > size * 1024 * 1024 ) {
      emits('uploadError', { msg: t('imageTooBig') })
      return
    }
    
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      src.value = (e.target.result as string) || ''
      fileName = file.name
    }

    return false;
  }

  const handleCropped = ({ imgbase64, imgInfo }) => {
    previewSrc.value = imgbase64
  }

  const handleOk = async () => {
    const { uploadApi } = props
    if ( !uploadApi ) return
    try {
      const blob = dataURLtoBlob(previewSrc.value)
      setModalProps({ confirmLoading: true });
      const result = await uploadApi({ file: blob, name: 'file', filename: fileName })
      closeModal()
      emits('uploadSuccess', { source: previewSrc.value, data: result.url })
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-cropper-modal';

  .@{prefix-cls} {
    display: flex;

    &-left,
    &-right {
      height: 340px;
    }

    &-left {
      width: 55%;
    }

    &-right {
      width: 45%;
    }

    &-cropper {
      height: 300px;
      background-color: #eee;
      background-image: linear-gradient(
          45deg,
          rgb(0 0 0 / 25%) 25%,
          transparent 0,
          transparent 75%,
          rgb(0 0 0 / 25%) 0
        ),
        linear-gradient(
          45deg,
          rgb(0 0 0 / 25%) 25%,
          transparent 0,
          transparent 75%,
          rgb(0 0 0 / 25%) 0
        );
      background-position: 0 0, 12px 12px;
      background-size: 24px 24px;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;


    }

    &-preview {
      width: 220px;
      height: 220px;
      margin: 0 auto;

      img {
        width: inherit;
        height: inherit;
      }
    }

    &-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 8px;
      margin: 8px 10px 0;
      border-top: 1px solid @border-color-base;
    }
  }

</style>