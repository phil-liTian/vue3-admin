/*
 * @Date: 2024-06-18 19:27:26
 * @LastEditors: phil_litian
 */
import { defineComponent, onMounted, ref } from "vue";
import { Card, Typography, Spin, Space, Button, Input } from 'ant-design-vue'
import { PageWrapper } from '@c/page/index'
import { useReqest } from '@phil/hooks'
import { imitateApi } from './mock-api'
const TLink = Typography.Link
const TParagraph = Typography.Paragraph
const TText = Typography.Text

const Demo1 = defineComponent({
  setup() {
    const { data, loading, error } = useReqest(
      imitateApi,
      {
        cacheKey: 'demo1',
        onSuccess: (data, params) => {
          console.log('data1-->', data, params);
        }
      }
    )
    return () => (
      <Card title='用法1'>
        <Typography>
          <TParagraph>
            <TText type="danger">useRequest</TText>
            <TText code>loading</TText>
            <TText code>data</TText>
            <TText code>error</TText>
          </TParagraph>

          <TText code>{ `const { data, loading, error } = useReqest(imitateApi)` }</TText>
          <Spin spinning={loading.value} >
            <div>{ error.value ? 'failed to load' : `userName: ${data.value}` }</div>
          </Spin>
        </Typography>
      </Card> 
    )
  }
})

const Demo2 = defineComponent({
  setup() {
    const search = ref('')
    const setSearch = (value: string) => {
      search.value = value
    }
    const { run } = useReqest(imitateApi, { manual: true })

    return () => (
      <Card class='mt-2' title='手动触发'>
        <Typography>
          <TParagraph>
            如果设置了 <TText type="danger">options.manual = true</TText>,则useRequest不会默认执行，
            需通过 <TText type="danger">run</TText>来触发执行
          </TParagraph>
          <TText code>
            {`const { loading, run } = useRequest(imitateApi, { manual: true });`}
          </TText>
        </Typography>
      </Card>
    )
  }
})

const Demo3 = defineComponent({
  setup() {
    const { loading, run } = useReqest(imitateApi, {
      onBefore: params => {
        console.log('onBefore', params);
      },
      onSuccess: (result, params) => {
        console.log('onSuccess', result, params);
      },
      onError: (e) => {
        console.log('onError', e);
      },
      onFinally: (data, params, error) => {
        console.log('onFinally', data, params, error);
      }
    })

    return () => (<Card title='生命周期' class='mt-2'>

    </Card>)
  }
})

const Demo4 = defineComponent({
  setup() {
    const { loading, data, run, refresh } = useReqest(imitateApi, {
      manual: true
    })
    
    onMounted(() => run('refresh'))
    
    // 修改数据
    const changeData = () => {
      data.value = Date.now()
    }

    return () => (
      <Card title='刷新（重复上一次请求）' class='mt-2'>
        <Spin spinning={true}>
          <Space>
            <div>username: { data.value }</div>
            <Button onClick={changeData}>Change Data</Button>
            <Button onClick={refresh}>Refresh</Button>
          </Space>
        </Spin>
      </Card>
    )
  }
})

const Demo5 = defineComponent({
  setup() {
    const { run, loading, cancel } = useReqest(imitateApi, { manual: true })

    return <Card title='取消响应' class='mt-2'>
      {/* 取消响应 */}
      <Space>
        <Input placeholder='Please enter username' />
        <Button type='primary'>Edit</Button>
        <Button type='dashed'>Cancel</Button>
      </Space>
    </Card>
  }
})

const Demo6 = defineComponent({
  setup() {
    const { } = useReqest(imitateApi, { 
      manual: true,
      defaultParams: ['test-params']
    })
    return <Card title='参数管理' class='mt-2'></Card>
  }
})

export default defineComponent({
  setup() {
    const headerContent = () => {
      return <Typography>
        <TParagraph>
          <TLink href="https://ahooks.js.org/zh-CN/hooks/use-request/index">ahooks </TLink>
          useRequest 的vue版本 是一个强大的异步数据管理的 Hooks
          <TParagraph>
            <ul>
              {
                ['自动请求/手动请求'].map(item => <li><TText>{item}</TText></li>)
              }
            </ul>
          </TParagraph>
        </TParagraph>
      </Typography>
    }

    return {
      headerContent
    }
  },
  
  render() {
    return (<PageWrapper v-slots={{ headerContent: this.headerContent }}>
      <Demo1 />
      <Demo2 />
      <Demo3 />
      <Demo4 />
      <Demo5 />
      <Demo6 />
    </PageWrapper>)
  }
})