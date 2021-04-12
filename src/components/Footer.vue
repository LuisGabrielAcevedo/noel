<template>
  <div class="footer">
    <span class="footer__text" v-if="!token">Noel - 2021</span>
    <div class="footer__facebook-content">
      <img
        @click="gotoSaltin()"
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text" @click="gotoSaltin()">galletassaltinnoel</span>
       <img
        @click="gotoDucales()"
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text" @click="gotoDucales()">ToquesMagicosDucales</span>
    </div>
    <div class="footer__routes">
      <span v-if="token" style="margin: 20px" class="footer__text cp" @click="gotoContacts()">Contáctanos</span>
      <span v-if="token"  style="margin: 20px" class="footer__text cp" @click="gotoTerms()">Términos y Condiciones</span>
      <img
        class="footer__coljuegos"
        src="@/assets/web/Logo_coljuegos.png"
      />
    </div>
  </div>
</template> 

<script>
export default {
  name: 'Footer',
  data() {
    return {
      selectedRoute: ''
    };
  },
  mounted() {},
  components: {},
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    gotoContacts() {
      this.goTo('/contactenos')
    },
    gotoTerms() {
      this.$store.dispatch("setTermsAndConditions", true);
    },
    gotoSaltin() {
      window.open(
        `https://www.facebook.com/galletassaltinnoel/?epa=SEARCH_BOX`,
        "_blank"
      );
    },
    gotoDucales() {
      window.open(
        `https://www.facebook.com/ducalesgruponutresa/`,
        "_blank"
      );
    },
  },
  watch: {
    "$route.path": {
      handler: function(path) {
        this.selectedRoute = path;
      },
      deep: true,
      immediate: true
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  z-index: 3;
  background-color: #131F45;
  padding: 0 100px;
  &__coljuegos {
    height: 46px;
    margin-top: 8px;
  }
  &__facebook {
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  &__facebook-content {
    display: flex;
    align-items: center;
  }
  &__facebook-text {
    color: white;
    font-size: 13px;
    margin-right: 20px;
    cursor: pointer;
  }
  &__text {
    font-size: 13px;
    color: white;
    text-align: center;
  }
  .cp {
    cursor: pointer;
  }
  &__routes {
    display: flex;
    align-items: center;
  }
}
</style>
