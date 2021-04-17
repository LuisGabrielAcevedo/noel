<template>
  <div class="awards">
    <div class="title-views-global">
      <img
        v-if="!mobile"
        class="title-views-global__web"
        src="@/assets/web/Titulo_premios.png"
        alt="Titulo premios"
      />
      <img
        v-if="mobile"
        class="title-views-global__mobile"
        src="@/assets/mobile/Titulo_premios_respons.png"
        alt="Titulo premios"
      />
    </div>

    <div class="box-wrapper-views-global awards__margin">
      <div class="awards__contentBox">
        <h2 class="awards__contentBox-title">
          ¡Estos son los premios que tenemos para ti!
        </h2>

        <div class="awards__contentBox-content">
          <div class="awards__contentImage">
            <img
              class="awards__contentImage-image awards__resizeImage"
              src="@/assets/mobile/Premio_compus_mis_codigos_respons.png"
              alt="Compu"
            />
            <p class="awards__contentImage-title">COMPUTADORES PORTÁTILES</p>
          </div>

          <div class="awards__contentImage">
            <img
              class="awards__contentImage-image awards__resizeImageTwo"
              src="@/assets/mobile/Premio_celulares_mis_codigos_respons.png"
              alt="Compu"
            />
            <p class="awards__contentImage-title">CELULARES</p>
          </div>

          <div class="awards__contentImage">
            <img
              class="awards__contentImage-image awards__resizeImage"
              src="@/assets/mobile/Premio_recargas_mis_codigos_respons.png"
              alt="Compu"
            />
            <p class="awards__contentImage-title awards__borderBottom">
              RECARGAS
            </p>
            <p class="awards__titleTwo">Minutos y Datos</p>
          </div>
          <div class="awards__contentImage">
            <img
              class="awards__contentImage-image"
              src="@/assets/mobile/Premio_tarjetas_mis_codigos_respons.png"
              alt="Compu"
            />
            <p class="awards__contentImage-title awards__moveText">
              TARJETAS DÉBITO
            </p>
          </div>
        </div>

        <div class="awards__helperImage">
          <img
            class="awards__helperImage-image"
            src="@/assets/web/Caja_texto_login.png"
            alt="Apoyo premio"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Awards",
  data() {
    return {
      dialog: false,
      type: 1,
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
    winners() {
      return this.$store.getters.winners;
    },
  },
  methods: {
    openModal(type) {
      this.type = type;
      this.dialog = true;
    },
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.awards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__margin {
    margin: 0px 15px;
  }

  &__title {
    width: 100%;
    text-align: center;
    margin: 0 15px;
  }

  &__contentBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px 0 10px 0;

    @include mobile() {
      margin: 0px;
    }
    &-title {
      font-size: 20px;
      text-align: center;
      line-height: 16px;
      color: #253e87;
      font-family: "NexaBold";
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__contentImage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 10%;
    flex: 1;

    @include tablet() {
      flex-basis: 50%;
    }

    @include mobile() {
      flex-basis: 10%;
    }

    @include xs() {
      flex-basis: 100%;
    }

    &-title {
      margin: 20px 0;
      width: 190px;
      text-align: center;
      font-size: 17px;
      line-height: 17px;
      color: white;
      line-height: 17px;
      font-family: "NexaBold";
    }

    &-image {
      height: 130px;
    }
  }

  &__image {
    &-title {
      height: 80px;

      &-mobile {
        width: auto;
        height: 50px;
      }
    }
  }

  &__titleTwo {
    font-size: 15px;
    color: white;
    font-family: "NexaBold";
  }

  &__helperImage {
    margin-top: 10px;

    &-image {
      height: 80px;
      @include xs() {
        height: 80px;
      }
    }
  }

  &__borderBottom {
    border-bottom: 1px solid white;
    margin-bottom: 2px;
    padding-bottom: 5px;
  }

  &__resizeImage {
    padding: 20px 20px 0 20px;
  }

  &__resizeImageTwo {
    padding: 15px 15px 0 15px;
  }

  &__awards__moveText {
    text-align: start;
  }
}
</style>
