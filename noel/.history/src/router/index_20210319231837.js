import Vue from 'vue'
import VueRouter from 'vue-router'
import Awards from "../views/Awards.vue";
import EnterCode from "../views/EnterCode.vue";
import HowToTakePart from "../views/HowToTakePart.vue";
import MyAccount from "../views/MyAccount.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ContactUs from "../views/ContactUs.vue";
import EditAccount from '../views/UpdateAccount.vue'
import store from "@/store";

const authGuard = async (to, from, next) => {
  const isAuthenticated = !!store.state.token;
  isAuthenticated ? next() : next("/ingresar");
};

const authGuardNot = async (to, from, next) => {
  const isAuthenticated = !!store.state.token;
  !isAuthenticated ? next() : next("/ingresar-codigo");
};


Vue.use(VueRouter)

const routes = [
  {
    path: "/ingresar",
    name: "signIn",
    component: SignIn,
    beforeEnter: authGuardNot,
  },
  {
    path: "/editar-cuenta",
    name: "editar-cuenta",
    beforeEnter: authGuard,
    component: EditAccount,
  },
  {
    path: "/registrarse",
    name: "signUp",
    component: SignUp,
    beforeEnter: authGuardNot,
  },
  {
    path: "/mi-cuenta",
    name: "myAccount",
    component: MyAccount,
    beforeEnter: authGuardWithData,
  },
  {
    path: "/como-particiar",
    name: "howToTakePart",
    component: HowToTakePart,
  },
  {
    path: "/ingresar-codigo",
    name: "enterCode",
    component: EnterCode,
    beforeEnter: authGuardWithData,
  },
  {
    path: "/premios",
    name: "awards",
    component: Awards,
  },
  {
    path: "/contactenos",
    name: "contactUs",
    component: ContactUs,
    beforeEnter: authGuardWithData,
  },
  {
    path: "*",
    redirect: "/ingresar",
  },
  {
    path: "",
    redirect: "/ingresar",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
