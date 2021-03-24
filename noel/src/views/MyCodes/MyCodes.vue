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
      tableData: [
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
        {
          cant: 1,
          saltinNoel: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          ducales: {
            titleOne: "ARFT5005",
            titleTwo: "14/06/2020",
          },
          award: "¡RECARGA!",
        },
      ],
    };
  },
  mounted() {},
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
.myCodes {
  display: flex;
  justify-content: center;
}
</style>
