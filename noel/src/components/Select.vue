<template>
  <div class="select">
    <div class="select__main-box">
        <span class="select__label">
          {{ label }}
          <span v-if="required" class="select__required">*</span>
        </span>
        <div
          class="select__field"
          @click="focus()"
          :class="{
            select__focus: open
          }"
         >
          <span v-if="componentModel" class="select__text">{{ componentModel }}</span>
          <span class="select__placeholder" v-else>{{ placeholder }}</span>
          <span class="select__icon-content" @click="focus()">
            <i class="fas fa-caret-down select__icon"></i>
          </span>
          <div v-if="open" class="select__pre-box">
            <div class="select__box" :class="{ select__scroll: items.length > 6 }">
              <span
                @click.stop="select(item)"
                class="select__option"
                v-for="(item, i) in items"
                :key="i"
              >
              {{ item.text }}
              </span>
            </div>
          </div>
        </div>
    </div>
    <div class="select__messages">
       <div class="select__messages-box">
          <span class="select__error">{{ error || "" }}</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      componentModel: "",
      open: false
    };
  },
  mounted() {
    this.componentModel = "";
  },
  props: {
    field: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    model: {
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    focus() {
      this.open = true;
      this.$emit("close-all");
    },
    blur() {
      this.open = false;
    },
    select(item) {
      this.componentModel = item.text;
      this.$emit("handle-input", {
        key: this.field,
        value: item.value
      });
      this.blur();
    }
  },
  watch: {
    model: {
      handler(newVal) {
        this.componentModel = newVal;
      }
    },
    open: {
      handler(newVal) {
        console.log(newVal)
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.select {
  height: 68px;
  width: 360px;
  margin: 0 10px;
  margin-bottom: 10px;
  @include mobile() {
    width: 100% !important;
  }
  &__main-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__label-container {
    width: 140px;
    text-align: right;
    @include mobile() {
      width: 110px !important;
    }
  }
  &__field {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 34px;
    border-radius: 18px;
    font-size: 17px;
    padding: 4px 10px;
    cursor: pointer;
    position: relative;
    @include mobile() {
      height: 38px;
      padding-top: 8px;
    }
  }
  &__label {
    margin-left: 10px;
    font-family: BebasNeue;
    color: white;
    margin-right: 10px;
    @include mobile() {
      text-align: center;
    }
  }
  &__placeholder{
    color: #BCBCBC;
    font-family: MontserratItalic;
    font-size: 15px;
    @include mobile() {
      font-size: 14px;
    }
  }
  &__icon-content {
    position: absolute;
    right: 12px;
  }
  &__icon {
    color: #D72626;
    font-size: 16px;
  }
  &__pre-box {
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 36px;
    z-index: 4;
    cursor: pointer;
    border: 0.5px solid #9d9d9d;
    padding: 2px;
  }
  &__box {
    display: flex;
    flex-direction: column;
  }
  &__scroll {
    max-height: 200px;
    overflow-y: scroll;
  }
  &__option {
    font-size: 16px;
    color: black;
    padding: 3px 1px 1px 1px;
    font-family: MontserratItalic;
    @include mobile() {
      font-size: 14px;
    }
  }
  &__option:hover {
    background: #eee;
  }
  &__text {
    font-family: MontserratItalic;
    font-size: 18px;
    @include mobile() {
      font-size: 15px;
    }
    @include xs() {
      font-size: 12px;
    }
  }
  &__error {
    color: white;
    font-family: BebasNeueBold;
    font-size: 11px;
    @include mobile() {
      font-size: 12px;
    }
  }
  &__messages {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 11px !important;
    padding: 3px 0 0 10px;
  }
  &__messages-box {
    width: 100%;
  }
  &__required {
    color: #E31552;
  }
}
</style>
