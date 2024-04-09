/*
 * @Date: 2024-03-27 21:35:27
 * @LastEditors: phil_litian
 */
import { defineComponent, ref } from "vue";
import { Tooltip } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@h/web/useI18n'
import AppSearchModal from "./AppSearchModal.vue";

export default defineComponent({
  setup() {
    const showModal = ref(false)
    const { t } = useI18n()

    function handleChangeModal(show: boolean) {
      showModal.value = show
    }

    return () => {
      return <div>
        <Tooltip onClick={handleChangeModal.bind(null, true)}>
          { {
            title: () => t('common.searchText'),
            default: () => <SearchOutlined />
          } }
        </Tooltip>

        <AppSearchModal onClose={handleChangeModal.bind(null, false)} visible={showModal.value} />
      </div>
    }
  }
})