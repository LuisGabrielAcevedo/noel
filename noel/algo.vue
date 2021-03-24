<template>
  <div class="my-codes">
    <img
      class="my-codes__logo"
      src="@/assets/images/logo_promo_2020@2x.png"
      alt="recargas"
    />
    <div class="my-codes__info">
      <div class="my-codes__couples">
        <span class="hideMobile my-codes__message"
          >Tus parejas completadas:</span
        >
        <span class="onlyMobile my-codes__message">Completadas:</span>
        <span class="my-codes__couples-number">{{ couples }}</span>
      </div>
      <div class="my-codes__user-info">
        <span v-if="user" class="my-codes__name hideMobile">
          ¡Bienvenido {{ user.name }}!
        </span>
        <span class="my-codes__name onlyMobile">¡Bienvenido</span>
        <span class="my-codes__name onlyMobile" v-if="user">
          {{ user.name }}!
        </span>
        <span class="my-codes__phone hideMobile">
          Celular para premios:
          <span class="my-codes__name" v-if="user">{{ formatedNumber }}</span>
        </span>

        <span class="my-codes__phone onlyMobile">Celular para premios:</span>
        <span class="my-codes__name onlyMobile" v-if="user">
          {{ formatedNumber }}
        </span>
        <span class="my-codes__codes hideMobile hideMobile"
          >Este es el estado de tus códigos en este momento:</span
        >
      </div>
    </div>
    <span class="my-codes__codes mb-2 onlyMobile"
      >Este es el estado de tus códigos en este momento:</span
    >
    <!-- Loading -->
    <!-- Tabla -->
    <span v-if="!loading && !paginatedCodes.length" class="text-2"
      >No tienes códigos registrados</span
    >
    <div
      v-if="!loading && paginatedCodes.length"
      class="my-codes-table hideMobile"
    >
      <div class="my-codes-table__headers">
        <span class="my-codes-table__action">Cant.</span>
        <span class="my-codes-table__item">Saltín Noel</span>
        <span class="my-codes-table__action"></span>
        <span class="my-codes-table__item hideMobile">Ducales</span>
        <span class="my-codes-table__action"></span>
        <span class="my-codes-table__item">Premio</span>
      </div>
      <div class="my-codes-table__data">
        <div
          class="my-codes-table__row"
          v-for="(item, i) in paginatedCodes"
          :key="i"
        >
          <span class="my-codes-table__action">
            <span class="my-codes__index">{{ i + 1 }}</span>
          </span>
          <span class="my-codes-table__item">
            <div class="my-codes-table__options">
              <span
                class="text-3"
                :class="{ 'my-codes__inactive': !item.code_2 }"
                >{{ item.code || "-" }}</span
              >
              <span
                v-if="item.code"
                class="my-codes-table__date"
                :class="{ 'my-codes__inactive': !item.code_2 }"
                >{{ formatDate(item.saltin_at) }}</span
              >
            </div>
          </span>
          <span class="my-codes-table__action">
            <span class="my-codes-table__circle">+</span>
          </span>
          <span class="my-codes-table__item">
            <div class="my-codes-table__options">
              <span
                class="text-3"
                :class="{ 'my-codes__inactive': !item.code }"
                >{{ item.code_2 || "-" }}</span
              >
              <span
                v-if="item.code_2"
                class="my-codes-table__date"
                :class="{ 'my-codes__inactive': !item.code }"
                >{{ formatDate(item.ducales_at) }}</span
              >
            </div>
          </span>
          <span class="my-codes-table__action">
            <span class="my-codes-table__circle">=</span>
          </span>
          <span class="my-codes-table__item text-2">
            {{ formatResult(item.result) }}
          </span>
        </div>
      </div>
    </div>
    <div class="my-codes-table__paginator hideMobile">
      <Paginator
        @changePage="changePage($event)"
        :pagination="{
          page: page,
          perPage: itemsPerPage,
          total: total,
        }"
      />
    </div>
    <!-- cards -->
    <div v-if="!loading">
      <div class="my-codes-card onlyMobile" v-for="(item, i) in codes" :key="i">
        <div class="my-codes-card__header">
          <span class="my-codes__index">{{ i + 1 }}</span>
          <span>{{ formatCouple(item) }}</span>
          <span></span>
        </div>
        <div class="my-codes-card__content">
          <img
            class="my-codes-card__image"
            :src="selectImage(item.result)"
            alt
          />
          <span
            class="mb-1 my-codes-card__text"
            :class="{ 'my-codes__inactive': inactive(item.result) }"
            >{{ formatResult(item.result) }}</span
          >
          <v-btn @click="openDetails(item)" class="my-codes-card__button">
            <span class="my-codes-card__button-text">Ver detalle</span>
          </v-btn>
        </div>
      </div>
      <modal :dialog="dialog" @close="dialog = false" width="500">
        <code-details
          v-if="dialog"
          :data="codeSelected"
          slot="component"
          @close="dialog = false"
        ></code-details>
      </modal>
    </div>
  </div>
</template>

<script>
import { GetCodes } from "@/api";
import { Paginator, Modal } from "@/components/common";
import CodeDetails from "./code-details";
const image1 = require("@/assets/images/gift-card.svg");
const image2 = require("@/assets/images/phone.svg");
const image3 = require("@/assets/images/Cara_falta_1_codigo.png");
const image4 = require("@/assets/images/Cara_sigue_intentando.png");
export default {
  name: "MyCodes",
  components: { Paginator, CodeDetails, Modal },
  mounted() {
    this.getCodes();
  },
  data() {
    return {
      loading: false,
      codes: [],
      page: 1,
      itemsPerPage: 10,
      total: 0,
      paginatedCodes: [],
      dialog: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    couples() {
      let cont = 0;
      this.codes.forEach(c => {
        if (c.code && c.code_2) cont++;
      });
      return cont;
    },
    formatedNumber() {
      return this.user ? this.user.phone.substr(2) : "";
    },
  },
  methods: {
    getCodes() {
      this.resetPagination();
      this.loading = true;
      GetCodes()
        .then(resp => {
          this.codes = resp.data;
          this.total = this.codes.length;
          this.loading = false;
          this.setPagination();
        })
        .catch((this.loading = false));
    },
    openDetails(item) {
      this.codeSelected = item;
      this.dialog = true;
    },
    setPagination() {
      const offset = (this.page - 1) * this.itemsPerPage;
      const data = this.codes.slice(offset, offset + this.itemsPerPage);
      this.paginatedCodes = data;
    },
    changePage(p) {
      this.page = p.page;
      this.setPagination();
    },
    resetPagination() {
      this.page = 1;
      this.paginatedCodes = [];
      this.setPagination();
    },
    formatResult(value) {
      const options = {
        charge: "¡RECARGA!",
        bonus: "¡TARJETA REGALO!",
        pending_ducales: "FALTA LA PAREJA",
        pending_saltin: "FALTA LA PAREJA",
        none: "¡Sigue intentando!",
      };
      return options[value] || "-";
    },
    inactive(value) {
      return ["pending_saltin", "pending_ducales", "none"].includes(value);
    },
    selectImage(value) {
      const options = {
        charge: image2,
        bonus: image1,
        pending_ducales: image3,
        pending_saltin: image3,
        none: image4,
      };
      return options[value] || image1;
    },
    formatDate(date) {
      if (date) {
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return "";
      }
    },
    formatCouple(item) {
      return item.code && item.code_2 ? "Pareja Completa" : "Pareja Incompleta";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.my-codes {
  @include column();
  @include center();
  &__logo {
    height: 130px;
  }
  &__info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &__couples {
    @include column();
    align-items: center;
    border: 4px solid $tertiary;
    padding: 4px;
    border-radius: 10px;
    width: 100px;
    text-align: center;
    @include mobile() {
      border: 2px solid $tertiary;
    }
  }
  &__couples-number {
    font-size: 50px !important;
    color: $tertiary;
    line-height: 50px;
    margin: 0;
  }
  &__user-info {
    @include column();
    padding-left: 10px;
  }
  &__name {
    @include primary-new-june-bold();
    color: $tertiary;
    font-size: 16px !important;
    @include mobile() {
      font-size: 14px !important;
    }
  }
  &__phone {
    @include primary-new-june-medium();
    color: $tertiary;
  }
  &__codes {
    @include secondary-new-june-bold();
    color: $tertiary;
    @include mobile() {
      font-size: 14px !important;
      text-align: center;
    }
  }
  &__message {
    @include secondary-new-june-bold();
    color: $tertiary;
    @include mobile() {
      font-size: 12px !important;
    }
  }
  &__index {
    border: 1px solid blue;
    background-color: red;
    color: $secondary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26px !important;
    width: 26px !important;
    font-size: 12px;
    font-weight: 500;
  }
  &__inactive {
    color: red !important;
  }
}
.my-codes-table {
  width: 540px;
  background-color: rgba(250, 250, 250, 0.3);
  border-radius: 4px;
  &__headers {
    @include secondary-new-june-bold();
    @include primary-background-color();
    @include row();
    @include primary-background-color();
    color: $secondary;
    align-items: center;
    height: 36px;
    padding: 0 20px;
    border-radius: 4px;
  }
  &__data {
    margin-bottom: 10px;
  }
  &__row {
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 0.5px solid orange;
    padding: 0 20px;
  }
  &__item {
    flex: 1 1 0%;
    text-align: center;
  }
  &__options {
    @include column();
    align-items: center;
  }
  &__date {
    font-size: 10px;
    color: $tertiary;
  }
  &__action {
    width: 60px !important;
    @include row();
    justify-content: center;
  }
  &__loading {
    display: flex;
    @include center();
    margin: 10px 0;
  }
  &__circle {
    background-color: $primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    width: 22px;
    font-size: 20px;
    font-weight: 500;
    color: #fee88c;
  }
  &__paginator {
    @include row();
    justify-content: center;
  }
}
.my-codes-card {
  width: 300px;
  background-image: linear-gradient(#fee88c, #fdd425) !important;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000040;
  &__header {
    display: flex;
    @include secondary-new-june-bold();
    justify-content: space-between;
    align-items: center;
    height: 40px;
    @include primary-background-color();
    padding: 0 20px;
    color: $secondary;
    border-radius: 4px;
    font-size: 14px !important;
  }
  &__content {
    padding: 0 10px 10px 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__image {
    margin: 6px;
    height: 50px;
  }
  &__text {
    color: $tertiary;
    @include primary-new-june-medium();
    font-size: 14px !important;
  }
  &__button {
    @include button();
    width: 160px !important;
  }
  &__button-text {
    @include button-text();
  }
}
</style>
