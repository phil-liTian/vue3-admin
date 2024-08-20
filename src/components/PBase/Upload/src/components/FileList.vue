<script lang='tsx'>
  import { defineComponent } from 'vue';
  import { fileListProps } from '../props'
  import { FileBasicColumn } from '../types/typing';

  export default defineComponent({
    props: fileListProps,
    setup(props) {
      return () => {
        const { columns, actionColumns, dataSource } = props
        
        const columnList = [ ...columns, ...actionColumns ]
        return <div class='overflow-x-auto'>
          <table class='file-table'>
            <colgroup>
              {
                columnList.map((item: FileBasicColumn) => {
                  const { width } = item
                  const style = {
                    width: `${width}px`,
                    minWidth: `${width}px`
                  }
                  return <col style={ width ? style : null } />
                })
              }
            </colgroup>

            <thead>
              <tr class='file-table-tr'>
                {
                  columnList.map((item: FileBasicColumn) => {
                    const { title, align = 'center', width } = item
                    return <th class={['file-table-th', align]}>{title}</th>
                  })
                }
              </tr>
            </thead>

            <tbody>
              {
                dataSource.map(record => {
                  return <tr class='file-table-tr'>
                    {
                      columnList.map((item: FileBasicColumn) => {
                        const { dataIndex, customRender, width, align } = item
                        const render = customRender
                        return <td class={['file-table-td', align]}>{render ? render({ text: record[dataIndex], record }) : record[dataIndex]}</td>
                      })
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      }
    }
  })
</script>
  
<style lang='less' scoped>
  .file-table {
    width: 100%;

    .center {
      text-align: center;
    }

    .left {
      text-align: left;
    }

    .right {
      text-align: right;
    }

    &-th,
    &-td {
      padding: 12px 8px;
    }

    thead {
      background-color: @app-content-background;
    }

    table,
    td,
    th {
      border: 1px solid @border-color-base;
    }

  }
</style>