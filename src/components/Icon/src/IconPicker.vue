<template>
  <Input
    @click="triggerPopover"
    :placeholder="t('placeholder')"
    :class="prefixCls">
    <template #addonAfter>
      <Popover 
        placement="bottomLeft"
        trigger="click"
        :overlayClassName="`${prefixCls}-popover`">
        <template #title>
          <div>
            <Input
              @change="handleSearch"
              allowClear
              :placeholder="t('search')" />
          </div>
        </template>
        <template #content>
          <div v-if="getPaginationList.length">
            <PScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap px-2">
                <li 
                  v-for="icon in getPaginationList" 
                  class="flex w-1/8 p-2 flex items-center jusitfy-center cursor-pointer border border-solid mr-1 mt-1"
                  :key="icon">
                  <PIcon :icon="icon" />
                </li>
              </ul>
            </PScrollContainer>
            <Pagination 
              showLessItems
              class="flex flex-center jusitfy-center mt-2"
              size="small"
              :page-size="pageSize"
              :total="getTotal"
              @change="handleChangePage" />
          </div>
          <template v-else>
            <div> <Empty /> </div>
          </template>
        </template>

        <div ref="triggerRef">
          <!-- <PIcon icon="ion:apps-outline"></PIcon> -->
        </div>
      </Popover>
    </template>
  </Input>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Input, Popover, Pagination, Empty } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import iconsData from '../data/icons.data';
  import { usePagination } from '@/hooks/web/usePagination';
  const { prefixCls } = useDesign('icon-picker')
  const { t } = useI18n('component.icon')

  const props = defineProps({
    pageSize: {
      type: Number,
      default: 140
    }
  })

  const visible = ref(true)
  const getIcons = computed(() => {
    const prefix = iconsData.prefix
    return iconsData.icons.map(icon => `${prefix}:${icon}`)
  })

  const triggerRef = ref<Nullable<HTMLElement>>(null)

  const currentList = ref(getIcons)

  const { getPaginationList, getTotal, setCurrentPage } = usePagination(currentList, props.pageSize)
  console.log('getTotal', getTotal);
  

  const triggerPopover = () => {
    if ( triggerRef.value ) {
      triggerRef.value.click()
    }
  }
  
  const handleSearch = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    console.log('e--->', value);
    if ( !value ) {

    }
    
  }

  const handleChangePage = (pageNum) => {
    setCurrentPage(pageNum)
  }
</script>
  
<style lang='less'>
  @prefixCls: ~'@{namespace}-icon-picker';

  .@{prefixCls} {
    &-popover {
      width: 300px;

      .scrollbar {
        height: 220px !important;
      }
    }
  }
</style>