<template>
  <div class="contactUs">
    <div class="title-views-global">
      <img
        v-if="!mobile"
        class="title-views-global__web"
        src="@/assets/web/Titulo_contactanos.png"
        alt="Titulo premios"
      />
      <img
        v-if="mobile"
        class="title-views-global__mobile"
        src="@/assets/mobile/Titulo_contactanos_respons.png"
        alt="Titulo premios"
      />
    </div>
    <div class="contactUs__content">
       <span class="contactUs__text">Para comunicarte con nosotros completa el siguiente formulario.</span>
       <Select
        field="topic"
        ref="topic"
        :model="message.topic"
        label="Tema por el cuál nos contactas"
        placeholder="Seleccionar un tema"
        :items="formattedTopics"
        @handle-input="setValue($event)"
        :required="true"
      />
      <Textarea
        field="message"
        label="Mensaje"
        @close-all="$refs.topic.open = false"
        :model="message.message"
        @handle-input="setValue($event)"
        placeholder="Ingresar mensaje"
        :required="true"
        :error="error"
        class="mt-0"
      />
      <div style="margin-top: 70px">
        <Button text="Enviar" type="primary" @handle-click="send()"/>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "../components/Select";
import Textarea from "../components/Textarea";
import { SaveMessage } from "@/api";
import Button from '../components/Button'
export default {
  name: "ContactUs",
  components: {
    Textarea,
    Select,
    Button
  },
  filters: {
    amount(value) {
      if (value) {
        const req = /(\d)(?=(\d{3})+(?!\d))/g;
        const formattedValue = value.toString();
        let endValue = formattedValue.replace(req, "$1.");
        return endValue;
      }
      return "0.00";
    },
  },
  methods: {
    send() {
      if (!this.message.message || !this.message.topic) {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          showClose: true,
          message: "¡Debes completar los campos requeridos!.",
        });
      } else {
        if (!this.error) {
          this.loading = true;
          const topic = this.topics.find((t) => t.text === this.message.topic);
          SaveMessage({
            ...this.message,
            title: topic.text,
            topic: topic.value,
          })
            .then(() => {
              this.loading = false;
              this.$store.dispatch("setAlert", {
                buttonLabel: "Aceptar",
                showClose: true,
                messages:
                  ["¡El mensaje fue enviado exitosamente!.", "Te responderemos al correo electrónico registrado.", "No olvides consultar el spam."]
              });
              this.message = {
                title: "",
                message: "",
                topic: "",
              };
            })
            .catch(() => {
              this.loading = false;
              this.$store.dispatch("setAlert", {
                buttonLabel: "Aceptar",
                showClose: true,
                message: "¡Hubo un problema!",
              });
            });
        }
      }
    },
    setValue(e) {
      this.message[e.key] = e.value;
      this.validate();
    },
    validate() {
      this.error =
        this.message.message && !(this.message.message.length > 10)
          ? "El mensaje debe tener mas de 10 carácteres."
          : "";
    },
    openPrivacyPolicy() {
      this.$store.dispatch("setPrivacyPolicy", true);
    },
  },
  computed: {
    formattedTopics() {
      return this.topics.map((s) => ({
        value: s.text,
        text: s.text,
      }));
    },
    mobile() {
      return this.$store.getters.mobile;
    },
  },
  data() {
    return {
      message: {},
      privacy: false,
      loading: false,
      error: "",
      topics: [
        {
          text: "Consulta general",
          value: 1,
        },
        {
          text: 'Problema con mi sticker',
          value: 2
        },
        {
          text: "Cambio de operador",
          value: 3,
        },
        {
          text: "Corrección de número o correo",
          value: 4,
        },
        {
          text: "Problema con mi recarga",
          value: 5,
        },
        {
          text: "Ganador de premio",
          value: 6,
        },
        {
          text: "Otros",
          value: 7,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.contactUs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__content {
    box-shadow: 0px 3px 6px #00000029;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 10px 20px 10px 20px;
    @include mobile() {
      width: 92%;
    }

    @include xs() {
      padding: 5px 20px;
    }
  }
  &__text {
    font-family: NexaBold;
    color: #253E87;
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 20px;
    text-align: center;

    @include xs() {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
