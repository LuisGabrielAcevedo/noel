<template>
  <v-app>
    <div class="app">
      <div class="app__image-content">
    <img
      v-if="!mobile"
      class="app__image"
      src="@/assets/web/Fondo_web_final.jpg"
    />
    <img
      v-if="mobile"
      class="app__image"
      src="@/assets/mobile/Fondo_saltin_ducales_response.jpg"
    />
    </div>
    <div class="app__content">
      <Header/>
      <div class="app__routes">
        <Footer v-if="!mobile"/>
        <div class="app__box">
          <div class="app__scroll" ref="div">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
    <Alert :show="show" @close="show = false" :data="alert" />
    <modal :dialog="termsAndConditions" width="600" @close="closeConditions()" :permanent="false">
      <terms-and-conditions slot="component" @close="closeConditions()"></terms-and-conditions>
    </modal>
    <modal :dialog="privacyPolicy" width="600" @close="closePrivacyPolicy()" :permanent="false">
      <privacy-policy slot="component" @close="closePrivacyPolicy()"></privacy-policy>
    </modal>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Alert from './components/Alert'
import Footer from './components/Footer'
import TermsAndConditions from './views/TermsAndConditions'
import PrivacyPolicy from './views/PrivacyPolicy'
import Modal from './components/Modal'
export default {
  name: 'App',
  data() {
    return {
      show: false,
      selectedRoute: ''
    };
  },
  mounted() {
    if (this.token) this.$store.dispatch("loadBalance");
    window.addEventListener("resize", this.onResize);
    this.$store.dispatch("setMobile", window.innerWidth <= 900);
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.document.addEventListener(
        "touchmove",
        e => {
          if (e.scale !== 1) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    Header,
    Footer,
    Alert,
    TermsAndConditions,
    Modal, 
    PrivacyPolicy, 
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    alert() {
      return this.$store.getters.alert;
    },
    termsAndConditions() {
      return this.$store.getters.termsAndConditions;
    },
    privacyPolicy() {
      return this.$store.getters.privacyPolicy;
    }
  },
  methods: {
    onResize() {
      this.$store.dispatch("setMobile", window.innerWidth <= 900);
    },
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    closeConditions() {
      this.$store.dispatch("setTermsAndConditions", false);
    },
    closePrivacyPolicy() {
      this.$store.dispatch("setPrivacyPolicy", false);
    }
  },
  watch: {
    "$route.path": {
      handler: function(path) {
        this.selectedRoute = path;
        if (this.$refs.div) {
          this.$refs.div.scrollTop = 0
        }
      },
      deep: true,
      immediate: true
    },
    alert() {
      this.show = true;
    }
  }
}
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &__image-content {
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  &__image {
    height: 100vh;
    width: 100%;
    transform: scale(1.05);
  }
  &__content {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
  &__routes {
    flex: 1;
    position: relative;
  }
  &__box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__scroll {
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
    height: 100%;
  }
}
</style>
