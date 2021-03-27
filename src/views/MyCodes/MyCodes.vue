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
      //computer
      //charges

      console.log(data);

      const newData = data.map((item, index) => {
        const saltinCodeEmpty = !item.code && "Saltín";
        const ducalesCodeEmpty = !item.code_2 && "Ducales";

        const emptyCode = saltinCodeEmpty ? saltinCodeEmpty : ducalesCodeEmpty;

        const image = {
          noComplete: require(`@/assets/mobile/Pareja_incompleta_mis_codigos_respons.png`),
          primeCompu: require(`@/assets/mobile/Premio_compus_mis_codigos_respons.png`),
          tacoSaltin: require("@/assets/web/Taco_Saltin.png"),
          tacoDucales: require("@/assets/web/Taco_Ducales.png"),
          tacoSaltinDisabled: require("@/assets/mobile/taco_faltante_saltin-respons.png"),
          tacoDucalesDisabled: require("@/assets/mobile/taco_faltante_ducales_respons.png"),
        };

        return {
          cant: index + 1,
          saltinNoel: item.code &&
            item.saltin_at && {
              titleOne: item.code,
              titleTwo: this.formatDate(item.saltin_at),
            },
          ducales: item.code_2 &&
            item.ducales_at && {
              titleOne: item.code_2,
              titleTwo: this.formatDate(item.ducales_at),
            },
          award: item.code && item.code_2 ? item.result : "-",
          titleMobile:
            item.code && item.code_2 ? "Pareja Completa" : "Pareja Incompleta",
          resultCouple:
            item.code && item.code_2
              ? "No"
              : `¡Te falta un código de ${emptyCode}!`,
          complete: item.code && item.code_2,
          image: image["noComplete"],
          prime: "",
          saltinTacoImage: item.code
            ? image["tacoSaltin"]
            : image["tacoSaltinDisabled"],
          ducalesTacoImage: item.code_2
            ? image["tacoDucales"]
            : image["tacoDucalesDisabled"],
        };
      });
      return newData;
    },
  },
  watch: {
    codes(data) {
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
