<template>
  <div class="signIn__wrapper">
  <div class="signIn">
    <div class="signIn__image-content">
      <span class="signIn__title" v-if="!mobile">Bienvenido a</span>
      <img class="signIn__image" src="@/assets/web/Logo_promo_que_nos_une_modales.png">
    </div>
    <div class="signIn__content">
      <div class="signIn__section1">
        <span class="signIn__section1-text">
          Ingresa al portal para que puedas participar.
        </span>
          <Input
            field="idn"
            @handle-input="setValue($event)"
             placeholder="Número de cédula"
            :onlyNumbers="true"
            :error="error"
            maxlength="10"
          />
        <div class="signIn__section1-button">
           <Button text="Ingresar" type="primary" :isLoading="loading"  @handle-click="signIn()"/>
        </div>
      </div>
      <div class="signIn__line">

      </div>
      <div class="signIn__section2">
        <span class="signIn__section2-text">
          Para participar, completa tu registro.
        </span>
        <div class="signIn__section2-button">
          <Button text="Registrarme" type="primary" @handle-click="register()"/>
        </div>
      </div>
    </div>
  </div>
  <img class="signIn__image-login-bottom" src="@/assets/web/Caja_texto_login.png" alt="texto_login"/>
  </div>
</template>

<script>
import Button from '../components/Button'
import Input from '../components/Input'
import {Login} from '../api'

export default {
  name: 'SignIn',
  data() {
    return {
      loading: false,
      idn: "",
      error: "",
    };
  },
  mounted() {},
  components: {
    Button,
    Input
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
      if (this.idn) {
        if (!this.error) {
          this.loading = true;
          Login(this.idn)
            .then((resp) => {
              this.loading = false;
              this.$store.dispatch("setToken", resp.token);
              this.$store.dispatch("setUser", resp.user);
              this.$store.dispatch("loadBalance");
              this.goTo("/ingresar-codigo");
            })
            .catch(() => {
              this.loading = false;
              this.$store.dispatch("setAlert", {
                buttonLabel: "Aceptar",
                showClose: true,
                type:'INFO',
                message: "¡El número de cédula ingresado no se encuentra registrado!",
              });
            });
        }
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
          message: "¡Ingresa un número de cédula válido!.",
        });
      }
    },
    setValue(e) {
      this.idn = e.value;
      this.validate();
    },
    validate() {
      if (this.idn) this.idn = this.idn.trim();
      const idReq = /^([1-9]{1}[0-9]{6,9})$/;
      this.error =
        this.idn && !idReq.test(this.idn)
          ? "Ingresa un número de cédula válido."
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
  flex-direction: column;
  justify-content: center;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__image-login-bottom {
      display: none;

      @include xs() {
	display: initial;
	height: 80px;
	margin-bottom: 10px;
      }

  }
  &__image-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__image {
    height: 306px;
    @include mobile() {
      height: 230px;
    }
    @include xs() {
      height: 180px;
      margin-top: -20px;
    }
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 3px 6px #00000029;
    background-color: rgba(250,250,250,0.2);
    margin: 0 auto;
    padding: 18px 20px;
    border-radius: 20px;
    @include mobile() {
      flex-direction: column;
      margin: 10px;
    }

    @include xs() {
      margin-top: -15px;
    }
  }
  &__section1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__section1-text {
    font-family: NexaBold;
    color: #253E87;
    line-height: 12px;
    font-size: 12px;
    margin-bottom: 10px;
    text-align: center;
  }
  &__section1-button {
    margin-top: -25px;
  }
  &__section2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__section2-text {
    font-family: NexaBold;
    color: #253E87;
    line-height: 12px;
    font-size: 12px;
    margin-bottom: 15px;
    text-align: center;
  }
  &__title {
    font-family: NexaBold;
    font-size: 36px;
    margin-right: 60px;
    color: #131F45;
  }
  &__line {
    margin: 0 40px;
    height: 80px;
    border-right: 3px solid #131F45;
    @include mobile() {
      margin: 20px 0;
      height: 10px;
      width: 140px;
      border-right: none;
      border-top: 3px solid #131F45;
    }

    @include xs() {
      margin: 10px 0;
    }
  }
}
</style>
