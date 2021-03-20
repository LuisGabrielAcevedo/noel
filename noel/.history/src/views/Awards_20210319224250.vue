<template>
  <div class="awards">
    <div class="awards__icon-content" v-if="mobile && !token" @click="goTo('/ingresar')">
        <img
          class="awards__icon"
          src="@/assets/web/btn_volver.png"
        />
        <span class="awards__icon-text">volver</span>
      </div>
    <div class="values" v-if="token && !mobile">
      <Recharges/>
      <div class="netflix">
        <Netflix/>
      </div>
    </div>
    <div class="awards__content">
      <span class="awards__title">¡Estos premios está esperando por ti!</span>
      <div class="awards__images-container">
        <div class="awards__images-item">
           <img
            class="awards__image"
            src="@/assets/web/Premio_recargas.png"
           />
           <span class="awards__message">150.000 RECARGAS</span>
           <span class="awards__description">PARA CELULARES</span>
           <div class="awards__box cp" @click="openModal(1)">
             <span class="awards__box-text">¿Cómo RECIBO MI RECARGA? haz clic aquí</span>
           </div>
        </div>
        <div class="awards__images-item">
           <img
            class="awards__image"
            src="@/assets/web/Premio_big-pass.png"
           />
           <span class="awards__message">100 TARJETAS</span>
           <span class="awards__description">BIG PASS DE $1.000.000*</span>
           <div class="awards__box cp" @click="openModal(2)">
             <span class="awards__box-text">¿Cómo RECIBO MI TARJETA BIG PASS? haz clic aquí</span>
           </div>
        </div>
        <div class="awards__images-item">
           <img
            class="awards__image"
            src="@/assets/web/Premio_netflix.png"
           />
           <span class="awards__message">2.500 CÓDIGOS</span>
           <span class="awards__description">DE REGALO NETFLIX</span>
           <div class="awards__box cp" @click="openModal(3)">
             <span class="awards__box-text">¿Cómo ACTIVO MI CÓDIGO DE REGALO DE NETFLIX? haz clic aquí</span>
           </div>
        </div>
      </div>
    </div>
     <modal :dialog="dialog" @close="dialog = false" width="600">
      <awards-modal
        v-if="dialog"
        slot="component"
        :type="type"
        @close="dialog = false"
      ></awards-modal>
    </modal>
  </div>
</template> 

<script>
import Recharges from '../components/Recharges'
import Netflix from '../components/Netflix'
import Modal from '../components/Modal'
import AwardsModal from '../views/AwardsModal'
export default {
  name: 'Awards',
  data() {
    return {
      dialog: false, 
      type: 1
    };
  },
  mounted() {},
  components: {
    Recharges,
    Netflix, 
    Modal, 
    AwardsModal
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    openModal(type) {
      this.type = type
      this.dialog = true
    }, 
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.awards {
  display: flex;
  justify-content: center;
  padding: 20px 0 70px 0;
  position: relative;
  @include mobile() {
    flex-direction: column;
    align-items: center;
    padding: 10px 0 70px 0;
  }
  &__content {
    background-color: rgba(32, 40, 58, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 30px 20px 0 20px;
    @include mobile() {
      width: 92%;
    }
  }
  &__icon-content {
    width: 92%;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-start;
    cursor: pointer;
  }
  &__icon {
    height: 35px;
  }
  &__icon-text {
    color: white;
    font-family: BebasNeueBold;
    margin-left: 10px;
  }
  &__images-item {
    display: flex;
    flex-direction: column;
  }
  &__title {
    color: white;
    font-family: BebasNeue;
    font-size: 18px;
    margin-bottom: 10px;
    text-align: center;
  }
  &__image {
    height: 120px;
    margin-bottom: 30px;
  }
  &__images-container {
    display: flex;
    @include mobile() {
      flex-direction: column;
    }
  }
  &__images-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 16px;
    @include mobile() {
      margin-bottom: 0px;
    }
  }
  &__message {
    color: #FFD800;
    font-family: BebasNeueBold;
    font-size: 30px;
    line-height: 30px;
  }
  &__description {
    color: white;
    font-family: BebasNeue;
    font-size: 18px;
    line-height: 18px;
    margin-top: -5px;
  }
  &__box {
    background: linear-gradient(to bottom, #FFD800, #CF8301);
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-radius: 25px;
    margin: 26px;
    width: 150px;
    text-align: center;
    line-height: 14px;
    height: 46px;
    padding-top: 4px;

  }
  &__box-text {
    font-family: BebasNeueBold;
    font-size: 14px;
    line-height: 14px;
  }

  .cp {
    cursor: pointer;
  }
}
</style>
