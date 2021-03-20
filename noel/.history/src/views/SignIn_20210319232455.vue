<template>
  <div class="signIn">
    
  </div>
</template> 

<script>
// import Button from '../components/Button'
// import Input from '../components/Input'
import {Login} from '../api'

export default {
  name: 'SignIn',
  data() {
    return {
      loading: false,
      phone: "",
      error: "",
    };
  },
  mounted() {},
  components: {
    // Button,
    // Input
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    register() {
      this.goTo('/registrarse')
    },
    signIn() {
      if (this.phone) {
        if (!this.error) {
          this.loading = true;
          Login(this.phone)
            .then((resp) => {
              this.loading = false;
              this.$store.dispatch("setToken", resp.token);
              this.$store.dispatch("setUser", resp.user);
              this.$store.dispatch("loadBalance");
              this.goTo("/ingresar-codigo");
            })
            .catch((err) => {
              console.log(err)
              this.loading = false;
              this.$store.dispatch("setAlert", {
                buttonLabel: "Aceptar",
                showClose: true,
                type:'INFO',
                message: "¡El número ingresado no se encuentra registrado!.",
              });
            });
        }
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
          message: "¡Ingresa un número de teléfono válido!.",
        });
      }
    },
    setValue(e) {
      this.phone = e.value;
      this.validate();
    },
    validate() {
      if (this.phone) this.phone = this.phone.trim();
      const idReq = /^(300|301|302|304|305|310|311|312|313|314|315|316|317|318|319|320|321|322|323|324|350|351){1}[0-9]{1}[0-9]{6}$/;
      this.error =
        this.phone && !idReq.test(this.phone)
          ? "Ingresa un número de teléfono válido."
          : "";
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.signIn {
  display: flex;
  justify-content: center;
  padding: 20px 0 70px 0;
  @include mobile() {
    flex-direction: column;
    padding: 0px;
    height: 100%;
    @media only screen and(max-height: 510px) {
      height: auto;
    }
  }
  &__content {
    background-color: rgba(32, 40, 58, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 0 80px 20px 80px;
    @media only screen and(max-width: 900px) {
      height: 100%;
      border-radius: 0px;
    }
    @media only screen and(max-width: 400px) {
      padding: 0 30px 20px 30px;
    }
  }
  &__image {
    height: 170px;
    @include mobile() {
      height: 120px;
    }
    @include xs() {
      height: 90px;
    }
  }
  &__text1 {
    color: #FFC609;
    font-family: BebasNeue;
    font-size: 18px;
    margin-bottom: 10px;
  }
  &__button {
    margin-top: -10px;
  }
  &__text2 {
    color: white;
    font-family: BebasNeue;
    font-size: 18px;
    margin-bottom: 20px;
    @include xs() {
      margin-bottom: 10px;
    }
  }
  &__line {
    border-bottom: 1.5px solid white;
    width: 160px;
    margin: 20px 0;
    @include xs() {
      margin: 20px 0 16px 0;
    }
  }
}
</style>
