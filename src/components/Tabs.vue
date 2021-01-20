<template>
  <div class="tabs-component-vue">
    <ul class="tabs-component-header" :class="{ [setting.tabHeaderFlex]: true }">
      <li
        class="tab-name"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="onTab(tab, index)"
        :class="{ 'tab-name-active': index === currentIndex }"
      >
        {{ tab.props.name }}
      </li>
    </ul>
    <div class="tabs-component-content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, onMounted, onBeforeMount, SetupContext, ComponentOptionsBase, VNode, toRefs, provide, watch } from 'vue'

type TypeSetting = {
  tabHeaderFlex?: `flex-start` | `flex-end` | `center` | `space-between` | `space-around`
}

type TypeTab = {
  // name: string,
}

export default defineComponent({
  name: `Tabs`,
  props: {
    setting: {
      type: Object as PropType<() => TypeSetting>,
    },
  },
  setup(props: { [key: string]: any }, { slots, emit }: SetupContext) {
    const state = reactive({
      tabs: [] as VNode<TypeTab>[],
      currentIndex: 0,
      id: '',
      count: 0,
    })

    const switchTab = (index: number) => {
      state.currentIndex = index
    }

    const onTab = (tab: any, index: number) => {
      switchTab(index)
    }

    provide('TabsProvider', state)

    watch(() => state.count, () => {
      if (slots.default) state.tabs = slots.default().filter((tab: any) => tab.type.name === 'Tab')
    })

    onMounted(() => {
      switchTab(0)
    })

    return { ...toRefs(state), onTab, switchTab }
  },
})
</script>

<style scoped>
.tabs-component-vue {
  color: #333;
}
.tabs-component-header {
  padding: 0;
  list-style: none;
  display: flex;
}
.tabs-component-header.flex-start {
  justify-content: flex-start;
}
.tabs-component-header.flex-end {
  justify-content: flex-end;
}
.tabs-component-header.center {
  justify-content: center;
}
.tabs-component-header.space-between {
  justify-content: space-between;
}
.tabs-component-header.space-around {
  justify-content: space-around;
}
.tab-name {
  cursor: pointer;
  width: 100%;
}
.tab-name.tab-name-active {
  background: #ddd;
}
</style>