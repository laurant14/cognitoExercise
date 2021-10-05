import Vue from "vue";
import Quiz from "./Quiz.vue";
import questions from "./questions";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import BootstrapVue from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

Vue.use(VueMaterial);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Quiz, { props: { questions } })
}).$mount("#quiz");
