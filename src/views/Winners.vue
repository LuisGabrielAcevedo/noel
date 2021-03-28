<template>
  <div class="winners">
    <img
      v-if="!mobile"
      class="title-views-global__web"
      src="@/assets/web/Titulo_ganadores.png"
      alt="Ganadores titulo"
    />
    <img
      v-if="mobile"
      class="title-views-global__mobile"
      src="@/assets/mobile/Titulo_ganadores_respons.png"
      alt="Ganadores titulo"
    />
    <div class="box-wrapper-views-global winners__table">
      <div class="winners__table-header">
        <div class="winners__table-header-item">
          {{ mobile ? "Nombre" : "Nombre del Participante" }}
        </div>
        <div v-if="!mobile" class="winners__table-header-item">Ciudad</div>
        <div class="winners__table-header-item">Premio</div>
      </div>
      <div
        class="winners__table-content-row"
        v-for="(item, index) in tableWinners"
        :key="index"
      >
        <div class="winners__table-header-item winners__color">
          {{ item.name }}
        </div>
        <div v-if="!mobile" class="winners__table-header-item winners__color">
          {{ item.city }}
        </div>
        <div class="winners__table-header-item winners__color-dark">
          {{ item.result }}
        </div>
      </div>
    </div>
    <button
      @click="dialog = true"
      v-if="tableWinners"
      class="winners__winners-button"
    >
      Ver lista de todos los ganadores
    </button>
    <modal width="850" :dialog="dialog">
      <div class="winners__modal-content" slot="component">
        <div class="winners__close-container">
          <img
            @click="dialog = false"
            class="winners__close-image"
            src="@/assets/web/btn_cerrar.png"
          />
        </div>
        <img
          class="winners__image"
          src="@/assets/web/Logo_promo_que_nos_une_modales.png"
        />
        <div class=" winners__table winners__table-modal">
          <div class="winners__table-header" style="margin-right: 20px;">
            <div class="winners__table-header-item">
              {{ mobile ? "Nombre" : "Nombre del Participante" }}
            </div>
            <div v-if="!mobile" class="winners__table-header-item">Ciudad</div>
            <div class="winners__table-header-item">Premio</div>
          </div>
          <div class="winners__wrapper-table-row" style="padding-right: 20px;">
            <div
              class="winners__table-content-row"
              v-for="(item, index) in tableWinnersModal"
              :key="index"
            >
              <div class="winners__table-header-item winners__color">
                {{ item.name }}
              </div>
              <div
                v-if="!mobile"
                class="winners__table-header-item winners__color"
              >
                {{ item.city }}
              </div>
              <div class="winners__table-header-item winners__color-dark">
                {{ item.result }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
  name: "Winners",
  data() {
    return {
      tableWinners: [],
      tableWinnersModal: [],
      dialog: false,
    };
  },
  mounted() {
    this.$store.dispatch("getWinners");
  },
  components: {
    Modal,
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.winners;
    },
    formatDate(date) {
      if (date) {
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return "";
      }
    },
    winners() {
      return this.$store.getters.winners;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {
    winners(data) {
      const strings = {
        bonus: "Tarjeta Regalo",
        computer: "Computador",
        phone: 'Celular',
        charge: "Recarga",
      };
      const dataTable = data.map(item => ({
        ...item,
        result: strings[item.result],
      }));

      this.tableWinners = dataTable.slice(0, 6);
      this.tableWinnersModal = dataTable;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.winners {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__wrapper-table-row {
    height: 220px;
    overflow-y: auto;
    @include mobile() {
      height: 250px;
    }
  }

  &__table {
    margin-top: 10px;
    flex: 1;
    width: 800px;
    padding: 0px !important;
    @include mobile() {
      width: 92%;
    }
  }

  &__table-header {
    display: flex;
    justify-content: space-around;
    padding: 5px 50px;
    background: #005aa7;
    border-radius: 30px;
    @include mobile() {
      padding: 5px 10px;
    }

    &-item {
      color: white;
      flex-basis: 33.3%;
      text-align: center;

      @include mobile() {
        flex-basis: 50%;
        /* padding: 5px 10px; */
        font-size: 12px;
      }
    }
  }

  &__table-content-row {
    display: flex;
    justify-content: space-around;
    padding: 5px 50px;
    border-bottom: 1px dashed #fff581;

    @include mobile() {
      padding: 5px 10px;
    }

    &:last-of-type {
      margin-bottom: 10px;
      border-bottom: none;
    }
  }

  &__color {
    color: #0057b7;
  }

  &__color-dark {
    color: #253e87;
  }

  &__reset-padding {
    padding: 5px 10px;
  }

  &__winners-button {
    background: transparent
      radial-gradient(closest-side at 50% 50%, #0079ff 0%, #0051aa 100%) 0% 0%
      no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000067;
    border-radius: 30px;
    color: white;
    padding: 10px 61px;
    margin: 20px;
  }

  &__modal-content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-height: 300px;
    padding: 10px 20px;
    height: 400px;
    margin-bottom: 20px;
    @include mobile() {
      padding: 10px;
    }
  }
  &__image {
    height: 220px;
    margin-top: -100px;
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
  /* width */
  ::-webkit-scrollbar {
    width: 8px !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #FFFFFF !important;
    border-radius: 10px !important;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white !important;
    border: 1px solid black;
  }
}
</style>
