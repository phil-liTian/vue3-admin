import { ref } from "vue";

const footerHeightRef = ref(0)
export function useLayoutHeight() {
  const setFooterHeight = (val) => {
    footerHeightRef.value = val
  }


  return { setFooterHeight, footerHeightRef }
}
