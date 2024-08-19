<!--
 * @Date: 2024-04-12 13:24:34
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper 
    title="基础组件"
    content="基础组件依赖于ant-design-vue,当前只展示对基础组件进行了二次封装的组件">
    <Row :gutter="[24, 24]">
      <Col :xl="10" :lg="24">
        <Card title="BasicButton Color">
          <div class="my-2">
            <h3>success</h3>
            <div class="my-2">
              <PButton color="success">成功</PButton>
              <PButton class="ml-2" color="success" disabled>禁用</PButton>
              <PButton class="ml-2" color="success" loading>loading</PButton>
              <PButton class="ml-2" color="success" type="link">link</PButton>
              <PButton class="ml-2" color="success" type="link" loading>loading link</PButton>
              <PButton class="ml-2" color="success" type="link" disabled>disabled link</PButton>
            </div>
          </div>


          <div class="my-2">
            <h3>warning</h3>
            <div class="my-2">
              <PButton color="warning">警告</PButton>
              <PButton class="ml-2" color="warning" disabled>禁用</PButton>
              <PButton class="ml-2" color="warning" loading>loading</PButton>
              <PButton class="ml-2" color="warning" type="link">link</PButton>
              <PButton class="ml-2" color="warning" type="link" loading>loading link</PButton>
              <PButton class="ml-2" color="warning" type="link" disabled>disabled link</PButton>
            </div>
          </div>

          <div class="my-2">
            <h3>error</h3>
            <div class="my-2">
              <PButton color="error">错误</PButton>
              <PButton class="ml-2" color="error" disabled>禁用</PButton>
              <PButton class="ml-2" color="error" loading>loading</PButton>
              <PButton class="ml-2" color="error" type="link">link</PButton>
              <PButton class="ml-2" color="error" type="link" loading>loading link</PButton>
              <PButton class="ml-2" color="error" type="link" disabled>disabled link</PButton>
            </div>
          </div>

          <div class="my-2">
            <h3>ghost</h3>
            <div class="my-2">
              <PButton ghost class="ml-2" color="success">幽灵成功</PButton>
              <PButton ghost class="ml-2" color="warning">幽灵警告</PButton>
              <PButton ghost class="ml-2" type="dashed" color="warning">幽灵警告dashed</PButton>
              <PButton ghost class="ml-2" color="error">幽灵错误</PButton>
              <PButton ghost class="ml-2" danger>幽灵危险</PButton>
            </div>
          </div>
        </Card>
      </Col>

      <Col :xl="14" :lg="24">
        <Card title="BasicButton Type">
          <div class="my-2">
            <h3>primary</h3>
            <PButton preIcon="mdi:page-next-outline" type="primary">主按钮</PButton>
            <PButton type='primary' class="ml-2" disabled>禁用</PButton>
            <PButton preIcon="mdi:page-next-outline" type='primary' danger class="ml-2">危险</PButton>
            <PButton type='primary' loading class="ml-2">loading</PButton>
            <PButton type='link' class="ml-2">link</PButton>
            <PButton type='link' loading class="ml-2">loading link</PButton>
            <PButton type='link' disabled class="ml-2">disabled link</PButton>
          </div>

          <div class="my-2">
            <h3>default</h3>
            <PButton type="default">默认</PButton>
            <PButton type="default" disabled class="ml-2">禁用</PButton>
            <PButton type="default" danger class="ml-2">危险</PButton>
            <PButton type="default" loading class="ml-2">loading</PButton>
            <PButton type="link" class="ml-2">link</PButton>
            <PButton type="link" class="ml-2" loading>loading link</PButton>
            <PButton type="link" class="ml-2" disabled>disabled link</PButton>
          </div>

          <div class="my-2">
            <h3>dashed</h3>
            <PButton type="dashed"> dashed </PButton>
            <PButton type="dashed" disabled class="ml-2"> 禁用 </PButton>
            <PButton type="dashed" danger class="ml-2"> 危险 </PButton>
            <PButton type="dashed" loading class="ml-2"> loading </PButton>
          </div>

          <div class="my-2">
            <h3>ghost</h3>
            <div class="py-2 px-2 bg-gray-400">
              <PButton ghost type="primary">幽灵主要</PButton>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Row, Col, Card } from 'ant-design-vue'  
  defineOptions({ name: 'ButtonDemo' })
</script>
