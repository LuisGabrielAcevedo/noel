<template>
  <div class="myCodesWeb">
    <div class="title-views-global">
      <img
        class="title-views-global__web"
        src="@/assets/web/Titulo_mis_codigos.png"
        alt="Mis codigos titulo"
      />
    </div>

    <div class="box-wrapper-views-global">
      <div class="myCodesWeb__title">
        <h1 class="myCodesWeb__title-one">
          ¡Bienvenido FELIPE TORRES ARÉVALO!
        </h1>
        <h2 class="myCodesWeb__title-two">
          Celular para premios: 316 233 4060
        </h2>
        <h3 class="myCodesWeb__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesWeb__table">
        <div class="myCodesWeb__table-header">
          <p class="myCodesWeb__table-header-titles">Cant.</p>
          <p class="myCodesWeb__table-header-titles">Saltin Noel</p>
          <p class="myCodesWeb__table-header-titles">Ducales</p>
          <p class="myCodesWeb__table-header-titles">Premios</p>
        </div>

        <div
          class="myCodesWeb__table-content"
          v-for="(item, index) in tableData"
          v-bind:key="index"
        >
          <div class="myCodesWeb__table-content-element">
            <p class="myCodesWeb__table-cant">{{ item.cant }}</p>
          </div>
          <div class="myCodesWeb__table-content-element myCodesWeb__text-row">
            <div class="myCodesWeb__table-text-content">
              <p class="myCodesWeb__table-text-content-one">
                {{ item.saltinNoel.titleOne }}
              </p>
              <p class="myCodesWeb__table-text-content-two">
                {{ item.saltinNoel.titleTwo }}
              </p>
            </div>
            <button class="myCodesWeb__table-btn-action ">
              <p>
                +
              </p>
            </button>
          </div>
          <div class="myCodesWeb__table-content-element myCodesWeb__text-row">
            <div class="myCodesWeb__table-text-content">
              <p class="myCodesWeb__table-text-content-one">
                {{ item.ducales.titleOne }}
              </p>
              <p class="myCodesWeb__table-text-content-two">
                {{ item.ducales.titleTwo }}
              </p>
            </div>
            <button class="myCodesWeb__table-btn-action">
              <p>=</p>
            </button>
          </div>
          <div class="myCodesWeb__table-content-element">
            <p
              class="myCodesWeb__table-text-content-award myCodesWeb__alignmentText"
            >
              {{ item.award }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCodesWeb",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
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

* {
  font-family: "NexaBold";
}

.myCodesWeb {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    margin-top: 10px;
    text-align: center;
    line-height: 15px;

    &-one {
      font-size: 15px;
    }

    &-two {
      font-size: 10px;
      margin-bottom: 5px;
    }

    &-three {
      font-size: 14px;
    }
  }

  &__table {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    &-header {
      background: #005aa7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1px 10px;
      border-radius: 50px;
    }

    &-header-titles {
      margin: 0 !important;
      color: white;
      margin: 0px 60px !important;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 20px 0px 20px;
      border-bottom: 1px dashed black;

      &:last-of-type {
        margin-bottom: 20px;
      }
    }

    &-content-element {
      flex-basis: 20%;
      padding: 0px 0px 2px 0px;
      display: flex;
      justify-content: center;
    }

    &-cant {
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px 0px 0px 10px !important;
      background: #005aa7;
      color: white;
      padding-top: 7px;
      border-radius: 50px;
      font-size: 10px;
    }

    &-text-content {
      margin-left: 20px;
      line-height: 14px;
      margin-right: 25px;
      margin-top: 5px;
      text-align: center;

      &-one {
        color: #131f45;
        font-size: 12px;
        margin: 0px !important;
      }

      &-two {
        color: #ff0000;
        font-size: 12px;
        font-family: "MyriadProRegular";
        margin: 0px !important;
      }

      &-award {
        text-align: start;
        color: #131f45;
        font-size: 12px;
        margin: 0px !important;
      }
    }

    &-btn-action {
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px !important;
      background: #005aa7;
      padding: 0px;
      border-radius: 50px;

      p {
        margin: 0px !important;
        margin-top: -1px !important;
        font-size: 20px !important;
        color: white;
      }
    }
  }

  &__text-row {
    margin-left: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__alignmentText {
    margin-right: 25px !important;
  }
}
</style>
