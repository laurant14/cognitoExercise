import Vue from "vue";
import Quiz from "./Quiz.vue";
import questions from "./questions";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(VueMaterial);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Quiz, { props: { questions } })
}).$mount("#quiz");
