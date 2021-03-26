<template>
  <div class="myAccount">
  </div>
</template> 

<script>
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
  components: {},
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
}
</style>
