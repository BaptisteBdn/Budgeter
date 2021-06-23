/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from 'vee-validate';
import Vue2TouchEvents from 'vue2-touch-events'
import RouterPrefetch from 'vue-router-prefetch'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from "./App";
import router from "./router/index";
import store from './store';

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'

Vue.use(BlackDashboard);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter);
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
Vue.use(Vue2TouchEvents)
Vue.use(RouterPrefetch);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
