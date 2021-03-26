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
  </div>
</template>

<script>
export default {
  name: "Winners",
  data() {
    return {
      tableWinners: [],
    };
  },
  mounted() {
    this.$store.dispatch("getWinners");
  },
  components: {},
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
      this.tableWinners = data;
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

  &__table {
    margin-top: 21px;
    flex: 1;
    width: 700px;
    padding: 0px !important;

    @include mobile() {
      width: 92%;
    }
  }

  &__table-header {
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    background: #005aa7;
    border-radius: 30px;

    &-item {
      color: white;
      flex-basis: 33.3%;
      text-align: center;

      @include mobile() {
        font-size: 12px;
      }
    }
  }

  &__table-content-row {
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    border-bottom: 1px dashed #fff581;

    &:last-of-type {
      margin-bottom: 30px;
    }
  }

  &__color {
    color: #0057b7;
  }

  &__color-dark {
    color: #253e87;
  }
}
</style>
