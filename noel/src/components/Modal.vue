<template>
  <div v-if="dialog" class="modal" @click="permanentAction()">
    <div class="modal__content" :style="{ width: `${width}px` }" @click.stop>
      <div>
        <slot name="component"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "500"
    },
    permanent: {
      type: Boolean,
      false: true
    }
  },
  methods: {
    permanentAction() {
      console.log("aqui");
      this.$emit("close");
      if (!this.permanent) {
        this.close();
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10 !important;
  background-color: rgba(0, 0, 0, 0.7);
  &__content {
    background-color: white;
    box-shadow: 7px 7px 7px #00000059;
    border-radius: 25px;
    @include mobile() {
      width: 90% !important;
    }
  }
}
</style>