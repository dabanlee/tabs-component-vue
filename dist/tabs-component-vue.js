(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tabs = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  var script = vue.defineComponent({
      name: `Tabs`,
      props: {
          setting: {
              type: Object,
          },
      },
      setup(props, { slots, emit }) {
          const state = vue.reactive({
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
          vue.provide('TabsProvider', state);
          vue.watch(() => state.count, () => {
              if (slots.default)
                  state.tabs = slots.default().filter((tab) => tab.type.name === 'Tab');
          });
          vue.onMounted(() => {
              switchTab(0);
          });
          return { ...vue.toRefs(state), onTab };
      },
  });

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-bdda1ea4");

  vue.pushScopeId("data-v-bdda1ea4");
  const _hoisted_1 = { class: "tabs-component-vue" };
  const _hoisted_2 = { class: "tabs-component-content" };
  vue.popScopeId();

  const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.createVNode("ul", {
        class: ["tabs-component-header", { [_ctx.setting.tabHeaderFlex]: true }]
      }, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.tabs, (tab, index) => {
          return (vue.openBlock(), vue.createBlock("li", {
            class: ["tab-name", { 'tab-name-active': index === _ctx.currentIndex }],
            key: index,
            onClick: $event => (_ctx.onTab(tab, index))
          }, vue.toDisplayString(tab.props.name), 11 /* TEXT, CLASS, PROPS */, ["onClick"]))
        }), 128 /* KEYED_FRAGMENT */))
      ], 2 /* CLASS */),
      vue.createVNode("div", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ]))
  });

  script.render = render;
  script.__scopeId = "data-v-bdda1ea4";
  script.__file = "src/components/Tabs.vue";

  var script$1 = vue.defineComponent({
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
          const tab = vue.ref(null);
          const index = vue.ref(0);
          const isActive = vue.ref(false);
          const state = vue.inject('TabsProvider');
          vue.watch(() => state.currentIndex, () => {
              isActive.value = (index.value === state.currentIndex);
          });
          vue.onBeforeMount(() => {
              index.value = state.count;
              state.count++;
              isActive.value = (index.value === state.currentIndex);
          });
          vue.onBeforeUnmount(() => state.count--);
          vue.onMounted(() => {
              //
          });
          return { tab, isActive };
      },
  });

  const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-bc09d9d6");

  const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
    return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
      class: "tab-component-vue",
      ref: "tab",
      id: _ctx.id
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 8 /* PROPS */, ["id"])), [
      [vue.vShow, _ctx.isActive]
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

  exports.Tab = script$1;
  exports.Tabs = script;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
