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

      <div class="myCodesMobile__content">
        <div class="myCodesMobile__content-items myCodesMobile__boxItem">
          <div class="myCodesMobile__content-items-header">
            <span class="myCodesMobile__content-items-header-index">1</span>
            <p class="myCodesMobile__content-items-header-title">
              Pareja Completa
            </p>
          </div>
          <div class="myCodesMobile__content-items-content">
            <img
              class="myCodesMobile__content-items-content-image"
              src="@/assets/mobile/Premio_celulares_mis_codigos_respons.png"
              alt="celular"
            />
            <div class="myCodesMobile__content-items-content-action">
              <p class="myCodesMobile__content-items-content-action-text">
                ¡Ganaste celular!
              </p>
              <img
                class="myCodesMobile__content-items-content-action-arrow"
                src="@/assets/mobile/Flecha_ir_detalle_codigo.png"
                alt="flecha"
              />
            </div>
          </div>
        </div>
        <div class="myCodesMobile__content-items myCodesMobile__boxItem">
          <div class="myCodesMobile__content-items-header">
            <span class="myCodesMobile__content-items-header-index">1</span>
            <p class="myCodesMobile__content-items-header-title">
              Pareja Completa
            </p>
          </div>
          <div class="myCodesMobile__content-items-content">
            <img
              class="myCodesMobile__content-items-content-image"
              src="@/assets/mobile/Premio_celulares_mis_codigos_respons.png"
              alt="celular"
            />
            <div class="myCodesMobile__content-items-content-action">
              <p class="myCodesMobile__content-items-content-action-text">
                ¡Ganaste celular!
              </p>
              <img
                class="myCodesMobile__content-items-content-action-arrow"
                src="@/assets/mobile/Flecha_ir_detalle_codigo.png"
                alt="flecha"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal width="600" :dialog="dialog">
      <div slot="component">
        <h1>Hola</h1>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../../components/Modal";
export default {
  name: "MyCodesMobile",
  data() {
    return {
      dialog: true,
    };
  },
  mounted() {},
  components: {
    Modal,
  },
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
  }

  &__content-items {
    margin-top: 10px;
    flex-basis: 20%;
    margin: 10px;

    &-header {
      display: flex;
      background: #005aa7;
      border-radius: 20px;

      height: 38px;
      align-items: center;

      &-index {
        flex-basis: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px !important;
        color: white;
        border: 3px solid white;
        border-radius: 50%;
        height: 42px;
        font-size: 25px;
      }

      &-title {
        margin: 0px !important;
        flex-basis: 90%;
        color: white;
        text-align: center;
      }
    }
  }

  &__content-items-content {
    padding: 5px 10px 5px 25px;
    display: flex;
    justify-content: space-between;
    &-image {
      margin: 10px 0px 10px 0px;
      height: 70px;
      flex-basis: 20%;
    }

    &-action {
      flex-basis: 80%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &-text {
        margin: 0px !important;
      }

      &-arrow {
        height: 20px;
      }
    }
  }

  &__boxItem {
    background: transparent linear-gradient(180deg, #ffdd5d 0%, #ffb000 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 30px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    opacity: 1;
  }
}
</style>
