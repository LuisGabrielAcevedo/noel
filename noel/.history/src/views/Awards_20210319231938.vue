<template>
  <div class="awards">
   
  </div>
</template> 

<script>
export default {
  name: 'Awards',
  data() {
    return {
      dialog: false, 
      type: 1
    };
  },
  mounted() {},
  components: {

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
    openModal(type) {
      this.type = type
      this.dialog = true
    }, 
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.awards {
  display: flex;
  justify-content: center;
  padding: 20px 0 70px 0;
  position: relative;
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
    padding: 30px 20px 0 20px;
    @include mobile() {
      width: 92%;
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
  &__images-item {
    display: flex;
    flex-direction: column;
  }
  &__title {
    color: white;
    font-family: BebasNeue;
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
  }
  &__image {
    height: 120px;
    margin-bottom: 30px;
  }
  &__images-container {
    display: flex;
    @include mobile() {
      flex-direction: column;
    }
  }
  &__images-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 16px;
    @include mobile() {
      margin-bottom: 0px;
    }
  }
  &__message {
    color: #FFD800;
    font-family: BebasNeueBold;
    font-size: 30px;
    line-height: 30px;
  }
  &__description {
    color: white;
    font-family: BebasNeue;
    font-size: 18px;
    line-height: 18px;
    margin-top: -5px;
  }
  &__box {
    background: linear-gradient(to bottom, #FFD800, #CF8301);
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-radius: 25px;
    margin: 26px;
    width: 150px;
    text-align: center;
    line-height: 14px;
    height: 46px;
    padding-top: 4px;

  }
  &__box-text {
    font-family: BebasNeueBold;
    font-size: 14px;
    line-height: 14px;
  }

  .cp {
    cursor: pointer;
  }
}
</style>
