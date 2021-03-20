<template>
  <div class="signIn">
    <div>
      <span>Bienvenido a</span>
      <img class="header__image" src="@/assets/web/Logo_inicio_txt.png">
    </div>
    <div class="signIn__content">
      <div class="signIn__section1">
        <span class="signIn__section1-text">
          Ingresa al portal para que puedas participar
        </span>
        <Input
          field="phone"
          @handle-input="setValue($event)"
          placeholder="Número celular"
          :onlyNumbers="true"
          :error="error"
          maxlength="10"
        />
        <div>
           <Button text="Ingresar" type="primary" @handle-click="signIn()"/>
        </div>
      </div>
      <div class="signIn__line">

      </div>
      <div class="signIn__section2">
        <span class="signIn__section2-text">
          Para participar, completa tu registro.
        </span>
        <Button text="Registrarme" type="secondary" @handle-click="register()"/>
      </div>
    </div>
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
      phone: "",
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
  &__content {
    display: flex;
    align-items: center;
    box-shadow: 0px 3px 6px #00000029;
    background-color: rgba(250,250,250,0.4);
  }
  &__image-content {
    
  }
  &__image {

  }
  &__section1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__section2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}
</style>
