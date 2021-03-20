<template>
  <div class="howToTakePart">
    <div class="howToTakePart__title">
      <img
        v-if="!mobile"
        class="image__title"
        src="@/assets/web/Titulo_como_participar.png"
        alt="Como participar titulo"
      />
      <img
        v-if="mobile"
        class="image__title__mobile"
        src="@/assets/mobile/Titulo_como_participar_respons.png"
        alt="Como participar"
      />
    </div>
    <div class="howToTakePart__content">
      <div class="contentBox">
        <h2 class="contentBox__title">
          ¡Participar es muy fácil! Solo sigue estos sencillos pasos:
        </h2>
        <img
          v-if="!mobile"
          class="image__content"
          src="@/assets/web/Como_participar_web.png"
          alt="Como participar contenido"
        />
        <img
          v-if="mobile"
          class="image__content__mobile"
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

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.howToTakePart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @include mobile() {
    margin: 30px;
  }

  &__title {
    width: 100%;
    text-align: center;
  }

  &__content {
    flex: 1;
    flex-basis: 70%;
    border-radius: 26px;
    box-shadow: 0px 3px 6px #00000029;
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 60px;

    @include mobile() {
      padding: 5px 0px;
    }
  }
}

.contentBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px 0 37px 0;

  @include mobile() {
    margin: 10px;
  }

  &__title {
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

.image__title {
  height: 70px;
}

.image__title__mobile {
  width: 100%;
}

.image__content {
  margin: 25px 0;
  height: 400px;
}

.image__content__mobile {
  width: 100%;
}
</style>
