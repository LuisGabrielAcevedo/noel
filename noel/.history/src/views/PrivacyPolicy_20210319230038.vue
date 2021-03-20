<template>
  <div class="privacyPolicy">
    <div class="privacyPolicy__close-container">
      <!-- <img
        @click="close()"
        class="privacyPolicy__close-image"
        src="@/assets/web/btn_cerrar.png"
      /> -->
    </div>
      <img
        class="privacyPolicy__image"
        src="@/assets/web/logo_hinchas.png"
      />
  </div>
</template> 

<script>
export default {
  name: 'PrivacyPolicy',
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
.privacyPolicy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__image {
    height: 120px;
    margin-top: -40px;
    margin-bottom: 10px;
    @include mobile() {
      height: 80px;
      margin-top: -20px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 20px;
    }
  }
}
</style>
