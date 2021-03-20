<template>
  <div class="footer">
    
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
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 70px;
   z-index: 3;
   background: #131F45;
   padding: 0 100px;
}
</style>
