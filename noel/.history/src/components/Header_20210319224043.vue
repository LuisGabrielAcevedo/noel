<template>
  <div class="header">
    <img
      v-if="this.mobile"
      @click="toggle()"
      class="header__image-menu"
      src="@/assets/mobile/menu_cabezote_respons.png"
    />
    <img
      v-if="this.mobile"
      class="header__logos-mobile"
      src="@/assets/mobile/Logos_marcas.png"
    />
    <img
      v-if="!this.mobile && this.token"
      @click="logoClick()"
      class="header__image"
      src="@/assets/web/logo_hinchas.png"
    />
    <img
      v-if="!this.mobile && !this.token"
      @click="logoClick()"
      class="header__image"
      src="@/assets/web/logo_yupi.png"
    />
    <div class="header__web-routes" v-if="!this.mobile">
      <div v-for="(route, k) in webRoutes" :key="k">
        <div 
          v-if="route.isVisible()" 
          class="header__web-route"
          :class="{
            'header--web-route-selected':
            route.path === selectedRoute
          }"
        >
          <span
            class="header__web-route-text"
            @click="click(route)"
            :class="{
              'header--web-route-text-selected':
              route.path === selectedRoute
            }"
            >{{ route.name }}
          </span>
        </div>
      </div>
    </div>
    <v-navigation-drawer
      class="header__drawer"
      v-model="drawer"
      absolute
      temporary
      width="260px"
    >
    <div class="drawer__container">
      <div class="drawer__close-icon-container">
        <i class="fas fa-times drawer__close-icon" @click="toggle()"></i>
      </div>
      <img
        class="drawer__logo"
        src="@/assets/web/logo_hinchas.png"
      />
      <div class="drawer__content">
        <div v-for="(route, k) in webRoutes" :key="k">
          <div 
            v-if="route.isVisible()" 
            class="drawer__web-route"
            :class="{
              'drawer--web-route-selected':
              route.path === selectedRoute
            }"
          >
            <span
              class="drawer__web-route-text"
              @click="click(route)"
              :class="{
                'drawer--web-route-text-selected':
                route.path === selectedRoute
              }"
              >{{ route.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="drawer__footer">
       <img
          class="drawer__coljuegos"
          src="@/assets/web/logo_autoriza_coljuegos.png"
        />
        <div class="drawer__images-content">
          <img
            @click="gotoInstagram()"
            class="drawer__image1"
            src="@/assets/web/instagram.png"
          />
          <img
            @click="gotoYoutube()"
            class="drawer__image1"
            src="@/assets/web/youtube.png"
          />
          <img
            @click="gotoFacebook()"
            class="drawer__image1"
            src="@/assets/web/facebook.png"
          />
        </div>
      </div>
    </div>
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
  align-items: flex-end;
  justify-content: space-between;
  background: linear-gradient(to bottom, #901036, #E31552);
  height: 80px;
  padding: 0 100px;
  @include mobile() {
    align-items: center;
    padding: 0 14px;
    height: 70px;
  }
  &__image {
    height: 70px;
    margin-bottom: 4px;
    cursor: pointer;
  }
  &__logos-mobile {
    height: 50px;
    @include xs() {
      height: 46px;
    }
  }
  &__image-menu {
    height: 50px;
    cursor: pointer;
    @include xs() {
      height: 46px;
    }
  }
  &__web-routes {
    display: flex;
  }
  &__web-route {
    padding: 10px 10px 20px 10px;
  }
  &--web-route-selected {
    background-color: #FFC609;
  }
  &__web-route-text {
    color: #FFC609;
    font-family: BebasNeueBold;
    font-size: 20px;
    cursor: pointer;
  }
  &--web-route-text-selected {
    color: #E31552;
  }
}

.drawer {
  &__container {
    background: linear-gradient(to bottom, #901036, #E31552);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__logo {
    height: 100px;
    margin-top: -20px;
    @include xs() {
      height: 80px;
    }
  }
  &__close-icon-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 8px 14px;
  }
  &__close-icon {
    color: #FFD800;
    font-size: 30px;
    cursor: pointer;
  }
  &__content {
    flex: 1;
    width: 100%;
    margin-top: 20px;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 14px;
    width: 100%;
  }
  &__images-content {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0 20px;
    margin-top: 14px;
  }
  &__image1 {
    height: 26px;
    margin-right: 10px;
    cursor: pointer;
    @include xs() {
      height: 20px;
    }
  }
  &__coljuegos {
    height: 40px;
    @include xs() {
      height: 34px;
    }
  }
  &__web-route {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    @include xs() {
      padding: 3px;
    } 
  }
  &--web-route-selected {
    background-color: #FFD800;
  }
  &__web-route-text {
    color: #FFC609;
    font-family: BebasNeueBold;
    font-size: 20px;
    cursor: pointer;
    margin-top: 4px;
    @include xs() {
      font-size: 17px;
    }
  }
  &--web-route-text-selected {
    color: #E31552;
  }
}
</style>
