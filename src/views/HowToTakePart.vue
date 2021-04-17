<template>
  <div class="howToTakePart">
    <div class="title-views-global">
      <img
        v-if="!mobile"
        class="title-views-global__web"
        src="@/assets/web/Titulo_como_participar.png"
        alt="Como participar titulo"
      />
      <img
        v-if="mobile"
        class="title-views-global__mobile"
        src="@/assets/mobile/Titulo_como_participar_respons.png"
        alt="Como participar"
      />
    </div>
    <div class="box-wrapper-views-global">
      <div class="howToTakePart__contentBox">
        <h2 class="howToTakePart__contentBox-title">
          ¡Participar es muy fácil! Solo sigue estos sencillos pasos:
        </h2>
        <img
          v-if="!mobile"
          class="howToTakePart__image-content"
          src="@/assets/web/Como_participar_web.png"
          alt="Como participar contenido"
        />
        <img
          v-if="mobile"
          class="howToTakePart__image-content-mobile"
          src="@/assets/mobile/Como_participar_response.png"
          alt="Como participar contenido"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowToTakePart",
  data() {
    return {};
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
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.howToTakePart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    width: 100%;
    text-align: center;
  }

  &__contentBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px 0 10px 0;

    @include mobile() {
      margin: 10px;
    }

    &-title {
      font-size: 16px;
      line-height: 16px;
      color: #253e87;
      font-family: "NexaBold";

      @include mobile() {
        font-size: 15px;
        line-height: 15px;
        text-align: center;
        margin-bottom: 5px;
      }

      @include xs() {
        font-size: 15px;
        line-height: 15px;
        margin-bottom: 5px;
      }
    }
  }

  &__image {
    &-title {
      height: 70px;
      &-mobile {
        height: 70px;
      }
    }
  }

  &__image-content {
    margin: 10px 0;
    height: 400px;

    &-mobile {
      height: 640px;

      @include xs() {
	height: 650px;
      }
    }
  }
}
</style>
