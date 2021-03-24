<template>
  <div class="myCodesMobile">
    <div class="title-views-global">
      <img
        class="title-views-global__mobile"
        src="@/assets/mobile/Titulo_mis_codigos_respons.png"
        alt="Mis codigos titulo"
      />
    </div>

    <div class="box-wrapper-views-global myCodesMobile__margin-wrapper">
      <div class="myCodesMobile__title">
        <h1 class="myCodesMobile__title-one">
          ¡Bienvenido FELIPE TORRES ARÉVALO!
        </h1>
        <h2 class="myCodesMobile__title-two">
          Celular para premios: 316 233 4060
        </h2>
        <h3 class="myCodesMobile__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesMobile__content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCodesMobile",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  props: {
    tableData: [],
  },
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
.myCodesMobile {
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__margin-wrapper {
    margin: 10px;
  }

  &__title {
    margin-top: 10px;
    text-align: center;
    line-height: 18px;

    &-one {
      font-size: 15px;
    }

    &-two {
      font-size: 15px;
    }

    &-three {
      font-size: 15px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;

    &-item {
      flex-basis: 20%;
    }
  }
}
</style>
