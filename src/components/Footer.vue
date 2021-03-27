<template>
  <div class="footer">
    <span>Noel - 2021</span>
    <div class="footer__facebook-content">
       <img
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text">galletassaltinnoel</span>
       <img
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text">ToquesMagicosDucales</span>
    </div>
    <div>
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
  height: 60px;
  z-index: 3;
  background: #131F45;
  padding: 0 100px;
  color: white;
  &__coljuegos {
    height: 40px;
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
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
