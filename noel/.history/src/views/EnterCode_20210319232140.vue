<template>
  <div class="enterCode">
    
  </div>
</template> 

<script>
// import Input from '../components/Input'
// import Button from '../components/Button'
// import Recharges from '../components/Recharges'
// import Netflix from '../components/Netflix'
// import VueRecaptcha from "vue-recaptcha";
import {SaveCodes} from '../api'
// import RechargesMobile from '../components/RechargesMobile'

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
    // Input,
    // Button,
    // VueRecaptcha,
    // Netflix,
    // Recharges, 
    // RechargesMobile
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
}
</style>
