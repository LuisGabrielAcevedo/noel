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
          <span class="enterCode-web__mini-text">
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
              field="saltin"
              :model="saltin"
              :error="errors.saltin"
              @handle-input="setValue($event)"
              maxlength="9"
              placeholder="Ingresar código Saltín Noel"
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
              field="ducales"
              :model="ducales"
              :error="errors.ducales"
              maxlength="9"
              @handle-input="setValue($event)"
              placeholder="Ingresar código Ducales"
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
            ref="recaptcha"
          ></vue-recaptcha>
        </div>
        <div>
          <Button text="Registrar Código" type="primary" @handle-click="send()"/>
        </div>
      </div>
    </div>
    <div v-if="mobile" class="enterCode-mobile">
      <img
        class="enterCode-mobile__title"
        src="@/assets/web/Titulo_bienvenido.png"
      />
    </div>
    <modal :dialog="dialog" @close="dialog = false;reset();" 
      width="550">
      <register-code-confirm
        v-if="dialog"
        :user="user"
        :saltin="respStatus.saltin"
        :ducales="respStatus.ducales"
        :saltinMsg="respStatus.saltinMsg"
        :ducalesMsg="respStatus.ducalesMsg"
        slot="component"
        @close="dialog = false"
      ></register-code-confirm>
    </modal>
  </div>
</template> 

<script>
import Input from '../components/Input'
import Button from '../components/Button'
import VueRecaptcha from "vue-recaptcha";
import {SaveCodes} from '../api'
import RegisterCodeConfirm from "../components/RegisterCodeConfirm";
import Modal from "../components/Modal";


export default {
  name: 'EnterCode',
  data() {
    return {
      loading: false,
      errors: {},
      recaptchaCode: null,
      count: 0, 
      ducales: "",
      saltin: "",
      userStatus: "",
      respStatus: {
        ducales: "",
        saltin: "",
        saltinMsg: "",
        ducalesMsg: ""
      },
      dialog: false
    };
  },
  components: {
    Input,
    Button,
    VueRecaptcha,
    RegisterCodeConfirm, 
    Modal
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    total() {
      return this.$store.getters.total;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    send() {
      this.verifyCatptcha()
       if (this.saltin || this.ducales) {
        if (this.recaptchaCode) {
          this.save(this.saltin, this.ducales);
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
          message: "¡Ingresa un código de Saltín Noel o Ducales válido!."
        });
      }
    }, 
    save(saltin, ducales) {
      this.loading = true;
      SaveCodes({
        code_saltin: saltin,
        code_ducales: ducales
      })
        .then((resp) => {
          this.loading = false;
          this.respStatus = {
            ducales: resp.data.ducales.res,
            saltin: resp.data.saltin.res,
            saltinMsg: resp.data.saltin.message,
            ducalesMsg: resp.data.ducales.message
          };
          this.dialog = true;
          this.$store.dispatch("loadBalance");
          this.ducales = "";
          this.saltin = "";
        })
        .catch((err) => {
          if (err.response.status !== 401) {
            this.ducales = "";
            this.saltin = "";
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
      e.key === "saltin" ? (this.saltin = e.value) : (this.ducales = e.value);
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
    font-family: NexaBold;
    color: #253E87;
    font-size: 16px;
  }
  &__rec {
    transform: scale(0.9);
  }
  &__mini-text {
    font-family: NexaBold;
    color: #253E87;
    font-size: 16px;
    line-height: 20px;
  }
  &__more {
    height: 40px;
    margin: 10px;
  }
}

.enterCode-mobile {
  &__title {
    height: 50px;
  }
}

</style> 
