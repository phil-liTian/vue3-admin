/*
 * @Date: 2024-06-18 19:27:26
 * @LastEditors: phil_litian
 */
import { defineComponent, onMounted, ref, unref } from "vue";
import { Card, Typography, Spin, Space, Button, Input, message } from 'ant-design-vue'
import { PageWrapper } from '@c/page/index'
import { useReqest } from '@phil/hooks'
import { imitateApi } from './mock-api'
const TLink = Typography.Link
const TParagraph = Typography.Paragraph
const TText = Typography.Text

const Demo1 = defineComponent({
  setup() {
    const { data, loading, error } = useReqest(imitateApi)
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
    const { run, loading } = useReqest(imitateApi, { 
      manual: true,
      onSuccess: (data, params) => {
        console.log('data--->', data, params)
        setSearch('')
        message.success(`The username was changed to "${params[0]}" !`);
      }
    })

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

        <Space class='mt-4'>
          <Input v-model={[search.value, 'value']} placeholder='Please enter username' />
          <Button disabled={loading.value} onClick={() => run(search.value)}>{ loading.value ? 'Loading' : 'Edit' }</Button>
        </Space>
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
      <Typography>
        <TParagraph>
          <TText type="danger">useReqest</TText>
          提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。
        </TParagraph>

        <TParagraph>
          <TText code>onBefore</TText>请求之前触发
        </TParagraph>

        <TParagraph>
          <TText code>onSuccess</TText>请求成功触发
        </TParagraph>

        <TParagraph>
          <TText code>onError</TText>请求失败触发
        </TParagraph>

        <TParagraph>
          <TText code>onFinally</TText>请求完成触发
        </TParagraph>
      </Typography>
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
        <Typography>
          <TParagraph>
            <TText type="danger">useRequest</TText>
            提供了两个方法 <TText code>refresh</TText> 和 <TText code>refreshAsync</TText>，
            分别用来刷新上一次请求，和异步刷新上一次请求。
          </TParagraph>
        </Typography>

        <Spin spinning={loading.value}>
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
    const search = ref('')
    const { run, loading, cancel } = useReqest(imitateApi, { 
      manual: true,
      onSuccess: (data, params) => {
        message.success(`The username was changed to "${params[0]}" !`)
      }
    })

    return () => <Card title='取消响应' class='mt-2'>
      <Typography>
        <TParagraph>
          <TText type="danger"> useReqest </TText>提供了
          <TText type="danger"> cancel </TText>函数，用于忽略当前 promise
          返回的数据和错误
        </TParagraph>
      </Typography>
      {/* 取消响应 */}
      <Space>
        <Input v-model={[search.value, 'value']} placeholder='Please enter username' />
        <Button type='primary' onClick={() => run(search.value)} disabled={loading.value}>{ loading.value ? 'Loading' : 'Edit' }</Button>
        <Button type='dashed' onClick={cancel}>Cancel</Button>
      </Space>
    </Card>
  }
})

const Demo6 = defineComponent({
  setup() {
    const search = ref('')

    
    const { loading, run, params, data: username } = useReqest(imitateApi, { 
      manual: true,
      defaultParams: ['test-params']
    })

    const onChange = () => {
      run(search.value)
    }
    return () => <Card title='参数管理' class='mt-2'>
      <Typography>
        <TParagraph>
          <TText type="danger"> useRequest </TText>返回的
          <TText type="danger"> params </TText>会记录当次调用
          <TText type="danger"> service </TText>的参数数组。比如你触发了
          <TText code>run(1, 2, 3)</TText>,则
          <TText type="danger"> params </TText> 等于
          <TText code> [1, 2, 3] </TText>
        </TParagraph>
        <TParagraph>
          如果我们设置了
          <TText type="danger"> options.manual = false </TText>，则首次调用
          <TText type="danger"> service </TText>
          的参数可以通过<TText type="danger"> options.defaultParams </TText>
          来设置。
        </TParagraph>

        <Space>
          <Input v-model={[search.value, 'value']} placeholder="Please enter username" />
          <Button disabled={loading.value} onClick={onChange}>
            {loading.value ? 'Loading' : 'Edit'}
          </Button>
        </Space>

        <div>
          <div>UserId: {unref(params)?.[0]}</div>
          <div>Username: {unref(username)}</div>
        </div>
      </Typography>
    </Card>
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
                ['自动请求/手动请求', '轮询', '防抖', '节流', '屏幕聚焦重新请求', '错误重试', 'loading delay', 'SWR(stale-while-revalidate)', '缓存'].map(item => <li><TText>{item}</TText></li>)
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