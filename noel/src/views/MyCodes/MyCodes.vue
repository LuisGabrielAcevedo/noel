<template>
  <div>
    <MyCodesMobile v-if="mobile" :tableData="tableData" />
    <MyCodesWeb v-if="!mobile" :tableData="tableData" />
  </div>
</template>

<script>
import MyCodesMobile from "./MyCodesMobile";
import MyCodesWeb from "./MyCodesWeb";

export default {
  name: "MyCodes",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.$store.dispatch("getCodes");
  },
  components: {
    MyCodesMobile,
    MyCodesWeb,
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    codes() {
      return this.$store.getters.codes;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    formatDate(date) {
      if (date) {
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return "";
      }
    },
    formatData(data) {
      console.log("data", data);

      const newData = data.map((item, index) => ({
        cant: index + 1,
        saltinNoel:
          item.code && item.saltin_at
            ? {
                titleOne: item.code,
                titleTwo: this.formatDate(item.saltin_at),
              }
            : { titleOne: "", titleTwo: "" },
        ducales:
          item.code_2 && item.ducales_at
            ? {
                titleOne: item.code_2,
                titleTwo: this.formatDate(item.ducales_at),
              }
            : { titleOne: "", titleTwo: "" },
        award: item.code && item.code_2 ? item.result : "-",
      }));
      return newData;
    },
  },
  watch: {
    codes(data) {
      console.log("watch", data);
      this.tableData = this.formatData(data);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.myCodes {
  display: flex;
  justify-content: center;
}
</style>
