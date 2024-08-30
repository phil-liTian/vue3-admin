<template>
  <PBasicModal
    :title="t('exportModalTitle')"
    @ok="handleOk">
    <PBasicForm 
      @register="registerForm"
      :labelWidth="100"
      :showActionButtonGroup="false"
      :schemas="schemas" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { FormSchema } from '@/components/PBase/Form';
  import { useI18n } from '@h/web/useI18n';
  import { useForm } from '@c/PBase/Form/index'

  const { t } = useI18n('component.excel')
  const emits = defineEmits(['success'])

  const schemas: FormSchema[] = [
    {
      field: 'fileName',
      component: 'Input',
      label: t('fileName'),
      required: true,
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: t('filenamePlaceholder')
      }
    },
    {
      field: 'bookType',
      component: 'Select',
      label: t('bookType'),
      defaultValue: 'xlsx',
      colProps: {
        span: 24
      },
      componentProps: {
        options: [
          {
            label: 'xlsx',
            value: 'xlsx'
          },
          {
            label: 'csv',
            value: 'csv'
          },
          {
            label: 'html',
            value: 'html'
          },
          {
            label: 'txt',
            value: 'txt'
          }
        ]
      }
    }
  ]

  const [ registerForm, { validateFields } ] = useForm()

  const handleOk = () => {
    validateFields().then(values => {
      emits('success', {
        fileName: `${values.fileName}.${values.bookType}`,
        bookType: values.bookType
      })
    })
  }

</script>
  
<style lang='less' scoped>
  
</style>