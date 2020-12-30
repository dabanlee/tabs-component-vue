import { defineComponent, reactive, provide, watch, onMounted, toRefs, pushScopeId, popScopeId, openBlock, createBlock, createVNode, Fragment, renderList, toDisplayString, renderSlot, withScopeId, ref, inject, onBeforeMount, onBeforeUnmount, withDirectives, vShow } from 'vue';

var script = defineComponent({
    name: `Tabs`,
    props: {
        setting: {
            type: Object,
        },
    },
    setup(props, { slots, emit }) {
        const state = reactive({
            tabs: [],
            currentIndex: 0,
            id: '',
            count: 0,
        });
        const switchTab = (index) => {
            state.currentIndex = index;
        };
        const onTab = (tab, index) => {
            switchTab(index);
        };
        provide('TabsProvider', state);
        watch(() => state.count, () => {
            if (slots.default)
                state.tabs = slots.default().filter((tab) => tab.type.name === 'Tab');
        });
        onMounted(() => {
            switchTab(0);
        });
        return { ...toRefs(state), onTab };
    },
});

const _withId = /*#__PURE__*/withScopeId("data-v-bdda1ea4");

pushScopeId("data-v-bdda1ea4");
const _hoisted_1 = { class: "tabs-component-vue" };
const _hoisted_2 = { class: "tabs-component-content" };
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("ul", {
      class: ["tabs-component-header", { [_ctx.setting.tabHeaderFlex]: true }]
    }, [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tabs, (tab, index) => {
        return (openBlock(), createBlock("li", {
          class: ["tab-name", { 'tab-name-active': index === _ctx.currentIndex }],
          key: index,
          onClick: $event => (_ctx.onTab(tab, index))
        }, toDisplayString(tab.props.name), 11 /* TEXT, CLASS, PROPS */, ["onClick"]))
      }), 128 /* KEYED_FRAGMENT */))
    ], 2 /* CLASS */),
    createVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]))
});

script.render = render;
script.__scopeId = "data-v-bdda1ea4";
script.__file = "src/components/Tabs.vue";

var script$1 = defineComponent({
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
        const tab = ref(null);
        const index = ref(0);
        const isActive = ref(false);
        const state = inject('TabsProvider');
        watch(() => state.currentIndex, () => {
            isActive.value = (index.value === state.currentIndex);
        });
        onBeforeMount(() => {
            index.value = state.count;
            state.count++;
            isActive.value = (index.value === state.currentIndex);
        });
        onBeforeUnmount(() => state.count--);
        onMounted(() => {
            //
        });
        return { tab, isActive };
    },
});

const _withId$1 = /*#__PURE__*/withScopeId("data-v-bc09d9d6");

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  return withDirectives((openBlock(), createBlock("div", {
    class: "tab-component-vue",
    ref: "tab",
    id: _ctx.id
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, ["id"])), [
    [vShow, _ctx.isActive]
  ])
});

script$1.render = render$1;
script$1.__scopeId = "data-v-bc09d9d6";
script$1.__file = "src/components/Tab.vue";

var index = {
    install(app) {
        // @ts-ignore
        app.component('Tabs', script);
        // @ts-ignore
        app.component('Tab', script$1);
    },
};

export default index;
export { script$1 as Tab, script as Tabs };
