<template>
  <div class="termsAndConditions">
    <div class="termsAndConditions__close-container">
      <img
        @click="close()"
        class="termsAndConditions__close-image"
        src="@/assets/web/btn_cerrar.png"
      />
    </div>
    <img
      class="termsAndConditions__image"
      src="@/assets/web/Logo_promo_que_nos_une_modales.png"
    />
    <div class="termsAndConditions__content">
      <div class="termsAndConditions__box">
        <div class="termsAndConditions__scroll">
          <div class="termsAndConditions__text">
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {},
  props: {},
  computed: {},
  methods: {
    close() {
      this.$emit('close')
    }
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.termsAndConditions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__content {
    width: 100%;
    height: 300px;
    position: relative;
  }
  &__box {
    position: absolute;
    top: 20px;
    left: 30px;
    right: 30px;
    bottom: 20px;
    @include mobile () {
      top: 10px;
      left: 15px;
      right: 15px;
      bottom: 10px;
    }
  }
  &__scroll {
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
    height: 100%;
    padding-right: 30px;
    text-align: center;
    @include mobile () {
      padding-right: 15px;
    }
  }
  &__text {
    font-family: BebasNeue;
    font-size: 16px;
    line-height: 16px;
    text-align: justify;
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
    padding: 10px;
    margin-top: -56px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }
}
</style>
