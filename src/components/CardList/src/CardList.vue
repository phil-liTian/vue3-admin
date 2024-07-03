<!--
 * @Date: 2024-06-12 09:53:28
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-2">
    <div class="p-2 bg-white">
      <List
       :grid="{ gutter: 5 }"
       :data-source="data" :pagination="paginationRef">
        <template #header>
          <slot name="header"></slot>
          <Tooltip>
            <template #title>
              <div>每行显示数量</div>
              <Slider v-bind="siderProps"></Slider>
            </template>
            <PButton><TableOutlined /></PButton>
          </Tooltip>
          <Tooltip>
            <template #title>刷新</template>
            <PButton><RedoOutlined /></PButton>
          </Tooltip>
        </template>

        <template #renderItem="{ item }">
          <ListItem>
            <Card>
              <template #title></template>

              <template #cover>
                <div>
                  <Image :src="item.imgs[0]"></Image>
                </div>
              </template>

              <template #actions>
                <EditOutlined />
                <PDropdown 
                  trigger="click"
                  popConfirm
                  :dropMenuList="[
                    { text: '删除', event: 1, popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDelete.bind(null, item.id)
                    } }
                  ]"
                  >
                  <EllipsisOutlined />
                </PDropdown>
              </template>

              <CardMeta>
                <template #title>
                  <TypographyParagraph :content="item.name"></TypographyParagraph>
                </template>
                <template #avatar>
                  <Avatar :src="item.avatar"></Avatar>
                </template>
                <template #description>
                  {{ item.time }}
                </template>
              </CardMeta>
            </Card>
          </ListItem>
        </template>
      </List>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, onMounted, ref } from 'vue'
  import { List, Card, Image, Tooltip, Slider, Avatar, Typography } from 'ant-design-vue'
  import { RedoOutlined, TableOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
  import { propTypes } from '@/utils/propTypes'
  import { isFunction } from '@/utils/is';
  import { useSlider } from './data'
  const props = defineProps({
    api: propTypes.func,
    params: propTypes.object.def({})
  })
  const emits = defineEmits(['delete'])
  const TypographyParagraph = Typography.Paragraph
  const ListItem = List.Item
  const CardMeta = Card.Meta
  const siderProps = computed(() => useSlider())
  // 待渲染的数据
  const data = ref([])
  const page = ref(1)
  const pageSize = ref(36)
  const total = ref(1)
  const paginationRef = ref({
    total,
    current: page,
    pageSize
  })

  const fetch = async () => {
    const { api, params } = props
    
    if ( api && isFunction(api) ) {
      const res = await api({ ...params, page: page.value, pageSize: pageSize.value })
      data.value = res.items;
      total.value = res.total
    }
  }

  const handleDelete = (id) => {
    emits('delete', id)
  }

  onMounted(() => {
    fetch()
  })

  
</script>
  
<style lang='less' scoped>
  
</style>