<template>
  <div class="myCodesMobile">
    <h1>Hola mobile</h1>
  </div>
</template>

<script>
export default {
  name: "MyCodesMobile",
  data() {
    return {};
  },
  mounted() {
    console.log(this.tableData);
  },
  components: {},
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
}
</style>
