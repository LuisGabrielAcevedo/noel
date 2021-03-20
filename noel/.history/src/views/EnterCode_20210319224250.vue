<template>
  <div class="enterCode">
    <div class="values" v-if="!mobile">
      <Recharges/>
      <div class="netflix">
        <Netflix/>
      </div>
    </div>
    <div class="enterCode__content">
      <span class="enterCode__text1" v-if="!mobile">Bienvenido {{user.name}}</span>
      <span class="enterCode__title">Ingresar código</span>
      <span class="enterCode__text2">Escribe aquí el código que encontraste dentro del empaque.</span>
       <Input
          field="id"
          :model="id"
          @handle-input="setValue($event)"
          placeholder="Escribe aquí tu código"
          maxlength="8"
          :error="error"
        />
      <div class="enterCode__captcha">
        <vue-recaptcha
          sitekey="6LdGK30aAAAAAC9WXmdbuZyOGXNzvV4cvIENTCGB"
          :loadRecaptchaScript="true"
          @verify="verifyRecaptcha"
          @expired="expiredRecaptcha"
          size="100px"
          language="es"
          ref="recaptcha"
        ></vue-recaptcha>
      </div>
      <Button text="Registrar Código" type="primary" @handle-click="send()"/>
    </div>
    <RechargesMobile v-if="mobile"/>
  </div>
</template> 

<script>
import Input from '../components/Input'
import Button from '../components/Button'
import Recharges from '../components/Recharges'
import Netflix from '../components/Netflix'
import VueRecaptcha from "vue-recaptcha";
import {SaveCodes} from '../api'
import RechargesMobile from '../components/RechargesMobile'

export default {
  name: 'EnterCode',
  data() {
    return {
      loading: false,
      id: "",
      error: "",
      recaptchaCode: null,
      count: 0, 
    };
  },
  components: {
    Input,
    Button,
    VueRecaptcha,
    Netflix,
    Recharges, 
    RechargesMobile
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    send() {
      this.verifyCatptcha()
       if (this.id) {
        if (this.recaptchaCode) {
          this.save();
        } else {
          this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
            message:
              "¡Para poder continuar, debes marcar la casilla de verificación (No soy un robot)!.",
          });
        }
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
          message: "¡Ingresa un código válido!.",
        });
      }
    }, 
    save() {
      this.loading = true;
      SaveCodes({
        code: this.id,
      })
        .then((resp) => {
           this.id = "";
            this.loading = false;
            this.$refs.recaptcha.reset()
            this.recaptchaCode = null;
            this.count = 0
            this.$store.dispatch("loadBalance");
            this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            showClose: true,
            codesButton: resp.data?.res === 'bonus' || resp.data?.res === 'charge',
            message: resp.data.message,
          });
        })
        .catch((err) => {
          if (err.response.status !== 401) {
            this.id = "";
            this.loading = false;
            this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type:'INFO',
            showClose: true,
            message: err.response.data.message.mensaje || "",
          });
          }
        });
    },
    verifyRecaptcha(token) {
      this.recaptchaCode = token;
    },
    expiredRecaptcha() {
      this.recaptchaCode = null;
    },
    setValue(e) {
      this.id = e.value;
    },
    verifyCatptcha() {
      if (this.count === 3) {
        this.$refs.recaptcha.reset()
        this.recaptchaCode = null;
        this.count = 0
      } else {
        this.count = this.count + 1;
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.enterCode {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  padding: 20px 0 70px 0;
  position: relative;
  @include mobile() {
    flex-direction: column;
    padding: 0px;
    height: auto;
  }
  &__content {
    background-color: rgba(32, 40, 58, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 30px 60px 40px 60px;
    @include mobile() {
      width: 92%;
      padding: 10px 30px 20px 30px;
      margin-top: 10px;
    }
  }
  &__text1 {
    color: white;
    font-family: BebasNeueBold;
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
    @include mobile () {
      font-size: 20px;
    }
  }
  &__text2 {
    color: white;
    font-family: BebasNeueBold;
    font-size: 22px;
    text-align: center;
    margin-bottom: 10px;
    @include mobile () {
      font-size: 18px;
    }
  }
  &__title {
    color: #FFC609;
    font-family: BebasNeueBold;
    font-size: 24px;
    margin-bottom: 10px;
    @include mobile () {
      font-size: 20px;
    }
  }
  &__captcha {
    margin-top: -10px;
    transform: scale(0.9);
    margin-bottom: 10px;
    @include mobile() {
      margin-top: -20px;
      transform: scale(0.8);
    }
  }
  &__image {
    height: 100px;
  }
}
</style>
