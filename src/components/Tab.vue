<template>
  <div class="tab-component-vue" v-show="isActive" ref="tab" :id="id">
      <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onBeforeUnmount, inject, watch, onMounted } from 'vue'

export default defineComponent({
  name: `Tab`,
  props: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  setup() {
    const tab = ref<Element>(null)
    const index = ref(0)
    const isActive = ref(false)
    const state = inject<{
      id: number,
      count: number,
      currentIndex: number,
    }>('TabsProvider')

    watch(() => state.currentIndex, () => {
      isActive.value = (index.value === state.currentIndex)
    })

    onBeforeMount(() => {
      index.value = state.count
      state.count++
      isActive.value = (index.value === state.currentIndex)
    })
    onBeforeUnmount(() => state.count--)

    onMounted(() => {
      //
    })
    return { tab, isActive }
  },
})
</script>

<style scoped>
.tab-component-vue {
  color: #333;
}
</style>