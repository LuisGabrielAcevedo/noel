<template>
  <div class="howToTakePart">
    <div class="howToTakePart__icon-content" v-if="mobile && !token" @click="goTo('/ingresar')">
        <img
          class="howToTakePart__icon"
          src="@/assets/web/btn_volver.png"
        />
        <span class="howToTakePart__icon-text">volver</span>
      </div>
    <div class="values" v-if="token && !mobile">
      <Recharges/>
      <div class="netflix">
        <Netflix/>
      </div>
    </div>
    <div class="howToTakePart__content">
      <span class="howToTakePart__text1">
        Es muy fácil participar en
      </span>
       <img
        class="howToTakePart__image"
        src="@/assets/web/logo_hinchas.png"
      />
      <span class="howToTakePart__text2">
        Solo sigue estos sencillos pasos:
      </span>
      <img
        v-if="!mobile"
        class="howToTakePart__image2"
        src="@/assets/web/Como_Funciona_Yupi_web_21.jpg"
      />
    </div>
    <img
        v-if="mobile"
        class="howToTakePart__image2"
        src="@/assets/mobile/Como_Funciona_Yupi_respons_21.jpg"
      />
  </div>
</template> 

<script>
import Recharges from '../components/Recharges'
import Netflix from '../components/Netflix'
export default {
  name: 'HowToTakePart',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {
    Recharges,
    Netflix
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.howToTakePart {
  display: flex;
  position: relative;
  justify-content: center;
  padding: 20px 0 70px 0;
  @include mobile() {
    flex-direction: column;
    align-items: center;
    padding: 10px 0 70px 0;
  }
  &__content {
    background-color: rgba(32, 40, 58, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 30px 40px 40px 40px;
    @include mobile() {
      width: 92%;
      padding: 20px 20px 0px 20px;
      margin-bottom: 20px;
    }
  }
  &__icon-content {
    width: 92%;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-start;
    cursor: pointer;
  }
  &__icon {
    height: 35px;
  }
  &__icon-text {
    color: white;
    font-family: BebasNeueBold;
    margin-left: 10px;
  }
  &__text1 {
    color: white;
    font-family: BebasNeueBold;
    font-size: 16px;
  }
  &__text2 {
    color: white;
    font-family: BebasNeueBold;
    font-size: 18px;
    margin-bottom: 20px;
  }
  &__image {
    height: 120px;
  }
  &__image2 {
    height: 900px;
  }
}
</style>
