<template>
  <div class="header">
    <v-navigation-drawer
      class="header__drawer"
      v-model="drawer"
      absolute
      temporary
      width="260px"
    >
    </v-navigation-drawer>
  </div>
</template> 

<script>
import {ClearSession} from '../api'
export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    routes: [],
    selectedRoute: ""
  }),
  watch: {
    "$route.path": {
      handler: function(path) {
        this.selectedRoute = path;
      },
      deep: true,
      immediate: true
    },
    mobile(old) {
      if (!old) this.drawer = false
    }
  },
  mounted() {
    this.routes = [
      {
        name: "INICIAR SESIÓN",
        path: "/ingresar",
        isVisible: () => !this.token && this.mobile
      },
      {
        name: "REGISTRARME",
        path: "/registrarse",
        isVisible: () => !this.token && this.mobile
      },
      {
        name: "INGRESAR CÓDIGO",
        path: "/ingresar-codigo",
        isVisible: () => this.token
      },
      {
        name: "¿CÓMO PARTICIPAR?",
        path: "/como-particiar",
        isVisible: () => true
      },
      {
        name: "PREMIOS",
        path: "/premios",
        isVisible: () => true
      },
      {
        name: "TÉRMINOS Y CONDICIONES",
        path: "/terminos-y-condiciones",
        isVisible: () => !this.token,
        clickAction: () => this.$store.dispatch("setTermsAndConditions", true)
      },
      {
        name: "MIS CÓDIGOS",
        path: "/mi-cuenta",
        isVisible: () => this.token
      },
      {
        name: "CONTÁCTENOS",
        path: "/contactenos",
        isVisible: () => this.token && this.mobile && this.show
      },
      {
        name: "CERRAR SESIÓN",
        clickAction: () => {this.logout()},
        isVisible: () => this.token
      }
    ];
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    webRoutes() {
      return this.routes.filter(r => r.isVisible())
    }, 
    user() {
      return this.$store.getters.user;
    },
    show() {
      const idn = this.user.identification || this.user.idn;
      return this.selectedRoute !== '/editar-cuenta' && this.user.name && idn
    }
  },
  methods: {
    logout() {
      ClearSession().then(() => {
        this.$store.dispatch("logout");
        this.goTo("/ingresar");
      });
    },
    logoClick() {
      this.token ? this.goTo("/ingresar-codigo"): this.goTo("/ingresar");
    },
    toggle() {
      this.drawer = !this.drawer;
    },
    goTo(path) {
      if (this.$route.path !== `${path}`) this.$router.push(path);
    },
    click(item) {
      if (item.clickAction) {
        item.clickAction();
      } else {
        this.goTo(item.path);
      }
    },
    gotoYoutube() {
      window.open(
        `https://yupi.com.co/`,
        "_blank"
      );
    },
    gotoInstagram() {
      window.open(
        `https://yupi.com.co/`,
        "_blank"
      );
    },
    gotoFacebook() {
      window.open(
        `https://yupi.com.co/`,
        "_blank"
      );
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #131F44;
  height: 70px;
  border-radius: 30px;
  padding: 0 20px;
  margin-top: 10px;
  &__web-routes {
    
  }
  &__web-route {
   
  }
  &--web-route-selected {
    
  }
  &__web-route-text {
    
  }
  &--web-route-text-selected {

  }
}

.drawer {
  &__web-route {

  }
  &--web-route-selected {
    
  }
  &__web-route-text {

  }
  &--web-route-text-selected {

  }
}
</style>
