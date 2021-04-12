<template>
  <div class="header">
    <img
      class="header__menu"
      src="@/assets/mobile/btn_menu.png"
      v-if="mobile"
      @click="onClickDrawer"
    />
    <img
      class="header__logo"
      @click="logoClick()"
      src="@/assets/web/Logos_marcas_cabezote.png"
    />
    <div class="header__web-routes" v-if="!this.mobile">
      <div v-for="(route, k) in webRoutes" :key="k">
        <div
          v-if="route.isVisible()"
          @click="click(route)"
          class="header__web-route"
          :class="{
            'header--web-route-selected': route.path === selectedRoute,
          }"
        >
          <span
            class="header__web-route-text"
            :class="{
              'header--web-route-text-selected': route.path === selectedRoute,
            }"
            >{{ route.name }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="dialog" class="modal-mobile-navigator">
      <div class="modal-mobile-navigator__content">
        <div class="modal-mobile-navigator__modal-content">
          <img
            class="modal-mobile-navigator__image"
            src="@/assets/web/Logo_promo_que_nos_une_modales.png"
          />
          <div class="modal-mobile-navigator__close-container">
            <img
              @click="dialog = false"
              class="modal-mobile-navigator__close-image"
              src="@/assets/web/btn_cerrar.png"
            />
          </div>
          <div class="container-routes-mobile">
            <div v-for="(route, k) in webRoutes" :key="k">
              <div
                v-if="route.isVisible()"
                @click="click(route)"
                class="header__web-route header__web-route-mobile"
                :class="{
                  'header--web-route-selected': route.path === selectedRoute,
                }"
              >
                <span
                  class="header__web-route-text"
                  :class="{
                    'header--web-route-text-selected':
                      route.path === selectedRoute,
                  }"
                  >{{ route.name }}
                </span>
              </div>
            </div>
          </div>
          <img
            class="modal-mobile-navigator__col-juegos"
            src="@/assets/web/Logo_coljuegos.png"
            alt="Col juegos"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClearSession } from "../api";
export default {
  name: "Header",
  data: () => ({
    drawer: false,
    routes: [],
    selectedRoute: "",
    dialog: false,
  }),
  watch: {
    "$route.path": {
      handler: function(path) {
        this.selectedRoute = path;
      },
      deep: true,
      immediate: true,
    },
    mobile(old) {
      if (!old) this.dialog = false;
    },
  },
  mounted() {
    this.routes = [
      {
        name: "Iniciar Sesión",
        path: "/ingresar",
        isVisible: () => !this.token,
      },
      {
        name: "Registrarme",
        path: "/registrarse",
        isVisible: () => !this.token && this.mobile,
      },
      {
        name: "Ingresar código",
        path: "/ingresar-codigo",
        isVisible: () => this.token,
      },
      {
        name: "Cómo Participar",
        path: "/como-particiar",
        isVisible: () => true,
      },
      {
        name: "Ganadores",
        path: "/ganadores",
        isVisible: () => this.token,
      },
      {
        name: "Premios",
        path: "/premios",
        isVisible: () => true,
      },
      {
        name: "Mis Códigos",
        path: "/mis-codigos",
        isVisible: () => this.token,
      },
      {
        name: "Términos y Condiciones",
        path: "/terminos-y-condiciones",
        isVisible: () => !this.token || this.mobile,
        clickAction: () => {
          this.dialog = false
          this.$store.dispatch("setTermsAndConditions", true)
        },
      },
      {
        name: "Contáctanos",
        path: "/contactenos",
        isVisible: () => this.token && this.mobile,
      },
      {
        name: "Cerrar Sesión",
        clickAction: () => {
          this.dialog = false
          this.logout();
        },
        isVisible: () => this.token,
      },
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
      return this.routes.filter(r => r.isVisible());
    },
    user() {
      return this.$store.getters.user;
    },
    show() {
      const idn = this.user.identification || this.user.idn;
      return this.selectedRoute !== "/editar-cuenta" && this.user.name && idn;
    },
  },
  methods: {
    logout() {
      ClearSession().then(() => {
        this.$store.dispatch("logout");
        this.goTo("/ingresar");
      });
    },
    logoClick() {
      this.token ? this.goTo("/ingresar-codigo") : this.goTo("/ingresar");
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
        this.dialog = false;
      }
    },
    gotoYoutube() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    gotoInstagram() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    gotoFacebook() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    onClickDrawer() {
      this.dialog = true;
      console.log("Click");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: radial-gradient(#253e87, #131f44);
  height: 70px;
  border-radius: 30px;
  padding: 0 80px;
  margin: 0 10px;
  margin-top: 10px;
  @include tablet() {
    padding: 0 40px;
  }
  @include mobile() {
    padding: 0 20px;
  }
  &__logo {
    height: 60px;
    cursor: pointer;
    @include mobile() {
      height: 40px;
    }
  }
  &__menu {
    height: 30px;
  }
  &__web-routes {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-left: 60px;
    @include tablet() {
      margin-left: 20px;
    }
  }
  &__web-route {
    cursor: pointer;
    border-radius: 25px;
    padding: 4px 10px 2px 10px;
    text-align: center;
    line-height: 14px;
  }

  &__web-route-mobile {
    margin: 5px 0px 10px 0px;
  }
  &--web-route-selected {
    background-color: white;
  }
  &__web-route-text {
    color: white;
    font-family: NexaBold;
    font-size: 14px;
    text-align: center;
  }
  &--web-route-text-selected {
    color: #253e87;
  }
}

.modal-mobile-navigator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10 !important;
  background-color: rgba(0, 0, 0, 0.7);
  &__content {
    flex-grow: 1;
    max-height: 70%;
    width: 600px;
    background: transparent
      radial-gradient(closest-side at 50% 50%, #253e87 0%, #131f44 100%) 0% 0%
      no-repeat padding-box;
    box-shadow: 0px 0px 15px #0000004d;
    border-radius: 15px;
    @include mobile() {
      width: 90% !important;
    }
  }

  &__modal-content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-height: 300px;
    padding: 10px 20px;
    @include mobile() {
      padding: 10px;
    }
  }
  &__image {
    height: 220px;
    margin-top: -100px;
    margin-bottom: 10px;
    @include mobile() {
      height: 160px;
      margin-top: -80px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px 0px;
    margin-top: -100px;
    margin-bottom: 20px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }

  &__col-juegos {
    margin-top: 0px;
    height: 40px;
  }
}

.container-routes-mobile {
  margin-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
