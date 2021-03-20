<template>
  <div class="awards">
   
  </div>
</template> 

<script>
export default {
  name: 'Awards',
  data() {
    return {
      dialog: false, 
      type: 1
    };
  },
  mounted() {},
  components: {},
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
    openModal(type) {
      this.type = type
      this.dialog = true
    }, 
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.awards {
  display: flex;
  justify-content: center;
  padding: 20px 0 70px 0;
  position: relative;
  @include mobile() {
  }
}
</style>
