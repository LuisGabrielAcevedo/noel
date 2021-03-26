import Vue from "vue";
import Router from "@/router";
import store from "@/store";

export default class AxiosInterceptor {
  constructor() {
    this.request();
    this.response();
  }

  request() {
    Vue.axios.interceptors.request.use(
      config => {
        config.headers["Accept"] = "application/json, text/plain, */*";
        config.headers["Content-Type"] = "application/json";
        const token = store.state.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
  }

  response() {
    Vue.axios.interceptors.response.use(
      async response => {
        return response;
      },
      err => {
        if (err.response.status === 401) {
          store.dispatch("logout");
          Router.push("/ingresar");
        }
        return Promise.reject(err);
      }
    );
  }

  async delay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("delay");
      }, 1000);
    });
  }
}