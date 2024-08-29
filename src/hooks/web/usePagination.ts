
import { computed, ref, Ref, unref } from 'vue'

function pagination(list: any[], pageNo: number, pageSize: number) {
  const offset = (pageNo - 1) * pageSize
  const total = list.length
  return offset + pageSize > total ? list.slice( offset, total ) : list.slice(offset, offset + pageSize)
}

export function usePagination<T = any>(list: Ref<T[]>, pageSize: number) {
  const currentPage = ref(1)
  const currentPageSize = ref(pageSize)


  const getPaginationList = computed(() => {
    return pagination(unref(list), unref(currentPage), unref(currentPageSize))
  })

  const getTotal = computed(() => unref(list).length)

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  return { getPaginationList, getTotal, setCurrentPage }
}

