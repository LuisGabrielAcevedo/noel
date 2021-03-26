import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
const baseURL = "http://3.128.54.222/api";
axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);
