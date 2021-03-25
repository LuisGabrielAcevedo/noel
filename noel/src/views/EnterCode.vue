<template>
  <div class="enterCode">
    <div v-if="!mobile" class="enterCode-web">
      <div class="enterCode-web__section-1">
        <img
          class="enterCode-web__logo"
          src="@/assets/web/Logo_promo_que_nos_une_sin_brillo.png"
        />
        <div class="enterCode-web__counter-content">
          <img
            class="enterCode-web__counter"
            src="@/assets/web/Contador_premios.png"
          />
          <span class="enterCode-web__counter-text">{{total}}</span>
        </div>
      </div>
      <div class="enterCode-web__section-2">
        <img
          class="enterCode-web__title"
          src="@/assets/web/Titulo_bienvenido.png"
        />
        <div class="enterCode-web__subtitle-box">
          <img
            class="enterCode-web__mini"
            src="@/assets/web/miniaturas_stickers.png"
          />
          <span>
            Ingresa aquí los códigos que encontraste en los stickers dentro de los empaques de Saltín Noel y Ducales.
          </span>
        </div>
        <div class="enterCode-web__box">
          <div class="enterCode-web__box-item">
            <img
              class="enterCode-web__saltin-image"
              src="@/assets/web/ejemplo_codigo_Saltin.png"
            />
            <Input
              field="id"
              :model="id"
              @handle-input="setValue($event)"
              placeholder="Escribe aquí tu código"
              maxlength="10"
              :error="error"
            />
          </div>
          <img
            class="enterCode-web__more"
            src="@/assets/web/simbolo_mas.png"
          />
          <div class="enterCode-web__box-item">
            <img
              class="enterCode-web__ducales-image"
              src="@/assets/web/ejemplo_codigo_ducales.png"
            />
            <Input
              field="id"
              :model="id"
              @handle-input="setValue($event)"
              placeholder="Escribe aquí tu código"
              maxlength="10"
              :error="error"
            />
          </div>
        </div>
        <span class="enterCode-web__box-text">
          Recuerda guardar los stickers que registraste.
        </span>
        <div  class="enterCode-web__rec">
          <vue-recaptcha
            sitekey="6LeepLgZAAAAAOEFbUH1LNlh-gpy4OfKV4zTIuoK"
            :loadRecaptchaScript="true"
            @verify="verifyRecaptcha"
            @expired="expiredRecaptcha"
            class="mb-1"
            language="es"
          ></vue-recaptcha>
        </div>
        <div>
          <Button text="Registrar Código" type="primary" @handle-click="send()"/>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import Input from '../components/Input'
import Button from '../components/Button'
import VueRecaptcha from "vue-recaptcha";
import {SaveCodes} from '../api'

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
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    user() {
      return this.$store.getters.user;
    },
    total() {
      return this.$store.getters.total;
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
}
.enterCode-web{
  display: flex;
  &__section-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__logo {
    height: 360px;
    margin-top: -40px;
  }
  &__counter-content {
    position: relative;
    margin-top: -50px;
  }
  &__counter-text {
    position: absolute;
    bottom: 62px;
    text-align: center;
    right: 0;
    left: 0;
  }
  &__counter {
    height: 160px;
  }
  &__section-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__title {
    height: 70px;
    margin-bottom: 10px;
  }
  &__box {
    display: flex;
    align-items: center;
  }
  &__mini {
    height: 54px;
    margin: 10px;
  }
  &__subtitle-box {
    display: flex;
    align-items: center;
    width: 500px;
  }
  &__box-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__saltin-image {
    height: 100px;
  }
  &__ducales-image {
    height: 100px;
  }
  &__box-text {
    margin-top: -24px;
  }
  &__rec {
    transform: scale(0.9);
  }
}
</style> 
