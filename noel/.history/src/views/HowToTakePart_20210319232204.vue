<template>
  <div class="howToTakePart">
  
  </div>
</template> 

<script>
import Recharges from '../components/Recharges'
import Netflix from '../components/Netflix'
export default {
  name: 'HowToTakePart',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {
    Recharges,
    Netflix
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
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.howToTakePart {
  display: flex;
  justify-content: center;
}
</style>
