import Vue from 'vue'
import Tabs from './components/Tabs.vue'
import Tab from './components/Tab.vue'

export default {
    install(app: Vue.App) {
        // @ts-ignore
        app.component('Tabs', Tabs)
        // @ts-ignore
        app.component('Tab', Tab)
    },
};

export { Tabs, Tab }