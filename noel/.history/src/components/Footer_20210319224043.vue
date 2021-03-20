<template>
  <div class="footer">
    <div class="footer__item">
      <span v-if="token" class="footer__text" @click="gotoTerms()">TÉRMINOS Y CONDICIONES</span>
      <span v-if="token && show" class="footer__text" @click="gotoContacts()">Contáctenos</span>
    </div>
    <div class="footer__item">
      <img
        class="footer__coljuegos"
        src="@/assets/web/logo_autoriza_coljuegos.png"
      />
    </div>
    <div class="footer__item2">
      <img
        @click="gotoInstagram()"
        class="footer__image"
        src="@/assets/web/instagram.png"
      />
      <img
        @click="gotoYoutube()"
        class="footer__image"
        src="@/assets/web/youtube.png"
      />
      <img
        @click="gotoFacebook()"
        class="footer__image"
        src="@/assets/web/facebook.png"
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
    show() {
      const idn = this.user.identification || this.user.idn;
      return this.selectedRoute !== '/editar-cuenta' && this.user.name && idn
    }
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
   position: absolute;
   bottom: 0;
   right: 0;
   left: 0;
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 70px;
   z-index: 3;
   background: linear-gradient(to bottom, transparent 5%, #20283A 95%);
   padding: 0 100px;
   &__coljuegos {
     height: 40px;
   }
   &__image {
     height: 26px;
     margin-right: 10px;
     cursor: pointer;
   }
   &__text {
    color: #FFC609;
    font-family: BebasNeueBold;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
    margin-right: 20px;
   }
   &__item {
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   &__item2 {
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: flex-end;
   }
}
</style>
