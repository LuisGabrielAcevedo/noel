<template>
  <div class="signup-confirm">
    <div class="signup-confirm__close-container">
      <img
        @click="close()"
        class="signup-confirm__close-image"
        src="@/assets/web/btn_cerrar.png"
      />
    </div>
    <img
      class="signup-confirm__image"
      src="@/assets/web/Logo_promo_que_nos_une_modales.png"
    />
    <div class="signup-confirm__content">
      <span class="signup-confirm__text1" style="margin-bottom: 10px">
        Por favor confirma que tus datos estén correctos, especialmente tu número celular y operador al cual perteneces; recuerda que las recargas se realizarán a este número celular.
      </span>
      <span class="signup-confirm__text">Nombre: {{ capitalize(user.name) }}</span>
      <span class="signup-confirm__text">Cédula: {{ user.idn }}</span>
      <span class="signup-confirm__text">
        N° Celular: {{ number }}
      </span>
      <span class="signup-confirm__text">
       Operador: {{ user.operator }}
      </span>
    </div>
    <div class="signup-confirm__buttons">
      <div style="margin-bottom: 10px">  
        <Button text="Editar Datos" type="secondary" @handle-click="close()" />
      </div>
      <Button text="Registrarme" type="primary" :isLoading="loading"  @handle-click="preRegister()"/>
    </div>
  </div>
</template>

<script>
import { Register, UpdateUser } from "@/api";
import Button from '../components/Button'
export default {
  name: "SignupConfirm",
  components: {
    Button
  },
  props: {
    user: {
      type: Object,
      required: true
    }, 
    edit: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    name() {
       return this.user.firstName + ' ' + this.user.lastName;
    }, 
    number() {
      return `${this.user.phone.substring(0,3)}-${this.user.phone.substring(3,6)}-${this.user.phone.substring(6,10)}`
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeSuccess(resp) {
      this.$emit("close-success", resp);
    },
    preRegister() {
      this.loading = true;
      this.edit ? this.update() : this.register();
    },
    capitalize(val, onlyFirstLetter = true) {
      const replacer = match => match.toUpperCase()
      if (typeof val !== 'string') return ''
      const acronymRegex = /(([a-zA-Z]\.){2,})/g
      const inLowerCase = val.toLowerCase()
      const capitalized = onlyFirstLetter
        ? inLowerCase.charAt(0).toUpperCase() + inLowerCase.slice(1)
        : inLowerCase.replace(/\b(\w)/g, s => s.toUpperCase())
      return capitalized.replace(acronymRegex, replacer)
    },
    register() {
      Register({ ...this.user, adult_registration: 1, name: this.capitalize(this.user.name) })
        .then(resp => {
          this.loading = false;
          this.closeSuccess(resp);
          this.$store.dispatch("setAlert", {
            buttonLabel: "CONTINUAR",
            type:'SUCCESS',
            showClose: true,
            title: "¡TU REGISTRO HA SIDO EXITOSO!",
            message: "¡Ya puedes comenzar a ingresar códigos!."
          });
        })
        .catch(err => {
          this.loading = false;
          this.close();
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type:'INFO',
            showClose: true,
            messages: err.response.data.errors
          });
        });
    }, 
    update() {
      UpdateUser({ ...this.user, adult_registration: 1, name: this.capitalize(this.user.name) })
        .then(resp => {
          this.loading = false;
          this.closeSuccess(resp);
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            title: "¡Felicitaciones!",
            message: "¡El registro se ha realizado exitosamente!"
          });
        })
        .catch(err => {
          this.loading = false;
          this.close();
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            messages: err.response.data.errors
          });
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.signup-confirm {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 300px;
  padding: 10px 20px;
  @include mobile() {
    padding: 10px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: -20px;
    @include mobile() {
      overflow-y: auto;
      max-height: 300px;
    }

    @include xs() {
      margin-bottom: -6px;
    }
  }
  &__text1 {
    color: #253E87;
    font-family: NexaBold;
    font-size: 16px;
    margin-bottom: 20px;
    @include mobile() {
      font-size: 14px;
    }
    @include mobile() {
      font-size: 12px;
    }
  }
  &__text {
    color: #253E87;
    margin: 0 !important;
    font-family: NexaBold;
    text-transform: capitalize;
    @include mobile() {
      font-size: 14px;
    }
    @include mobile() {
      font-size: 12px;
    }
  }
  &__image {
    height: 220px;
    margin-top: -100px;
    margin-bottom: 10px;
    @include mobile() {
      height: 160px;
      margin-top: -80px;
    }
    @include xs() {
      height: 140px;
      margin-top: -70px;
      margin-bottom: -1px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    padding: 0px 40px;
    @include mobile() {
      padding: 0px 10px;
    }

    @include xs() {
      margin-top: 10px;
    }
  }
}
</style>
