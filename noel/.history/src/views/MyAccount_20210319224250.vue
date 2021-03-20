<template>
  <div class="myAccount">
     <div class="values" v-if="!mobile">
      <Recharges/>
      <div class="netflix">
        <Netflix/>
      </div>
    </div>
    <div class="myAccount__content">
        <span class="myAccount__text1">¡Bienvenido {{name}}!</span>
        <span class="myAccount__text1">
          Celular para premios: {{formatedNumber}}
        </span>
        <span class="myAccount__text2">Este es el estado de tus códigos en este momento:</span>
       <div class="table">
        <div class="table__header">
          <span class="table__header-item">CÓDIGO</span>
          <span class="table__header-item">FECHA</span>
          <span class="table__header-item" v-if="!mobile">Vía de Registro</span>
          <span class="table__header-item">PREMIO</span>
        </div>
        <div class="table__data myAccount__table">
          <div class="myAccount__scroll">
            <div class="table__data-row" v-for="(item, i) in paginatedCodes" :key="i">
            <div class="table__data-row-item">
              <span>{{item.code}}</span>
            </div>
            <div class="table__data-row-item">
              <span>{{formatDate(item.created_at)}}</span>
            </div>
            <span class="table__data-row-item" v-if="!mobile">{{item.channel}}</span>
            <span class="table__data-row-item"><span class="myAccount__yellow">{{formatResult(item.result)}}</span></span>
          </div>
          </div>
        </div>
        <div class="myAccount__paginator">
          <Paginator
            @changePage="changePage($event)"
            :pagination="{
              page: page,
              perPage: itemsPerPage,
              total: total
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import Recharges from '../components/Recharges'
import Netflix from '../components/Netflix'
import Paginator from '../components/Paginator'
import { GetCodes } from "@/api";
export default {
  name: 'MyAccount',
  data() {
    return {
      data: [],
      loading: false,
      codes: [],
      page: 1,
      itemsPerPage: 6,
      total: 0,
      paginatedCodes: [],
    };
  },
  mounted() {
    this.getCodes();
  },
  components: {
    Recharges,
    Netflix,
    Paginator
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    user() {
      return this.$store.getters.user;
    },
    name() {
      return this.user ? this.user.name : "";
    },
    formatedNumber() {
      return this.user ? this.user.phone.substr(2) : "";
    }
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
        charge: "Ganador Recarga",
        bonus: "GANADOR CÓDIGO NETFLIX",
        none: "Sigue intentando"
      };
      return options[value] || "-";
    },
    formatDate(date) {
      if (date) {
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return "";
      }
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.myAccount {
  display: flex;
  justify-content: center;
  padding: 20px 0 70px 0;
  position: relative;
  &__content {
    background-color: rgba(32, 40, 58, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 20px 20px 0 20px;
    @include mobile() {
      width: 96%;
    }
  }
  &__text1 {
    color: #FFD800;
    font-family: BebasNeueBold;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    @include mobile() {
      font-size: 18px;
      line-height: 20px;
    }
  }
  &__text2 {
    color: white;
    font-family: BebasNeueBold;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    @include mobile() {
      font-size: 18px;
      line-height: 20px;
    }
  }
  &__column {
    display: flex;
    flex-direction: column;
  }
  &__yellow {
    color: #FFD800;
  }
  &__date {
    font-size: 10px;
  }
  &__paginator {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
}


.circle {
  background-color: #E31552;
  border-radius: 50%;
  color: #FFD800;
  height: 22px;
  width: 22px;
  margin: 0 auto;
  font-size: 14px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
