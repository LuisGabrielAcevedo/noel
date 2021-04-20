<template>
  <div class="register-code-confirm">
    <div class="register-code-confirm__close-container">
      <img
        @click="close()"
        class="register-code-confirm__close-image"
        src="@/assets/web/btn_cerrar.png"
      />
    </div>
    <img
      class="register-code-confirm__image"
      src="@/assets/web/Logo_promo_que_nos_une_modales.png"
    />
    <div class="register-code-confirm__section">
      <img
        v-if="savedSaltin && !awardDucales && (mobile ? !savedDucales: !ducales)"
        class="register-code-confirm__saltin-image"
        src="@/assets/web/Taco_Saltin.png"
        alt="premio"
      />
      <img
        v-if="savedDucales && !awardSaltin && (mobile ? !savedSaltin : !saltin)"
        class="register-code-confirm__ducales-image"
        src="@/assets/web/Taco_Ducales.png"
        alt="premio"
      />
    </div>

    <span
      class="register-code-confirm__text"
      v-if="savedSaltin && !awardDucales && (mobile ? !savedDucales: !ducales) && user"
    >
      ¡{{ user.name }}! Tu código de
      <span class="text-1">Saltín Noel</span> es
      válido.
    </span>
    <span
      class="register-code-confirm__text"
      v-if="savedDucales && !awardSaltin && (mobile ? !savedSaltin : !saltin) && user"
    >
      ¡{{ user.name }}! Tu código de
      <span class="text-1">Ducales</span> es
      válido.
    </span>

    <div
      v-if="!mobile && ((savedSaltin && !validDucales) || (savedDucales && !validSaltin))"
      class="register-code-confirm__errors"
    >
      <span class="register-code-confirm__text">{{saltinMsg}}</span>
      <span class="register-code-confirm__text">{{ducalesMsg}}</span>
    </div>

    <span class="register-code-confirm__text" v-if="message()">{{ message() }}</span>
    <div v-else>
      <div v-if="!mobile" class="register-code-confirm__errors">
        <span class="register-code-confirm__text" v-if="!validSaltin && !savedDucales">{{saltinMsg}}</span>
        <span class="register-code-confirm__text" v-if="!validDucales && !savedSaltin">{{ducalesMsg}}</span>
        <span class="register-code-confirm__text">{{status}}</span>
      </div>
      <div v-else>
        <span
          v-if="!validSaltin && !validDucales && !savedDucales && !savedSaltin"
        >{{mobileErrorMessage()}}</span>
        <div v-else class="register-code-confirm__errors">
          <span class="register-code-confirm__text" v-if="!validSaltin && !savedDucales">{{saltinMsg}}</span>
          <span class="register-code-confirm__text" v-if="!validDucales && !savedSaltin">{{ducalesMsg}}</span>
          <span class="register-code-confirm__text">{{status}}</span>
        </div>
      </div>
    </div>

    <div class="signup-confirm__buttons">
      <div style="margin-bottom: 10px">
        <Button text="Aceptar" type="primary" @handle-click="close()"/>
      </div>

      <Button
        v-if="(savedSaltin && !awardDucales) || (savedDucales && !awardSaltin)"
        text="Ver mis códigos"
        type="secondary"
        @handle-click="goToMyCodes()"/>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button'
export default {
  name: "RegisterCodeConfirm",
  components: {
    Button
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    saltin: {
      type: String,
      required: ""
    },
    ducales: {
      type: String,
      required: ""
    },
    saltinMsg: {
      type: String,
      required: ""
    },
    ducalesMsg: {
      type: String,
      required: ""
    },
    status: {
      type: String,
      required: ""
    }
  },
  computed: {
    validSaltin() {
      return this.saltin !== "error";
    },
    validDucales() {
      return this.ducales !== "error";
    },
    savedSaltin() {
      return this.saltin && this.saltin === "saved";
    },
    savedDucales() {
      return this.ducales && this.ducales === "saved";
    },
    awardSaltin() {
      return ["charge", "computer", "bonus", "phone", "none"].includes(this.saltin);
    },
    awardDucales() {
      return ["charge", "computer", "bonus","phone", "none"].includes(this.ducales);
    },
    mobile() {
      return this.$store.getters.mobile;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    goToMyCodes() {
      this.$router.push("/mis-codigos");
    },
    message() {
      if (this.awardSaltin || this.awardDucales) {
        if (this.awardSaltin) return this.saltinMsg;
        if (this.awardDucales) return this.ducalesMsg;
      } else {
        return '';
      }
    },
    mobileErrorMessage() {
      if (this.saltinMsg.includes("utilizado")) return this.saltinMsg;
      if (this.ducalesMsg.includes("utilizado")) return this.ducalesMsg;
      return "¡Lo sentimos! tu código es incorrecto.";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.register-code-confirm {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 10px 20px;
  @include mobile() {
    padding: 10px;
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
      margin-top: -50px;
      margin-bottom: -10px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;

    @include xs() {
      margin-bottom: -40px;
      margin-top: -40px;
    }
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    margin-top: -20px;
    @include mobile() {
      height: 28px;
    }
  }
  &__ducales-image {
      height: 100px;

      @include xs() {
	height: 60px;
      }
  }
  &__saltin-image {
      height: 100px;

      @include xs() {
	height: 60px;
      }
  }
  &__text {
    font-family: NexaBold;
    color: #253E87;
    font-size: 16px;

    @include xs() {
      font-size: 13px;
    }
  }
  &__buttons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 30px;
    padding: 0px 40px;
    @include mobile() {
      padding: 0px 10px;
    }
  }
  &__errors {
    display: flex;
    flex-direction: column;
  }
}
</style>
