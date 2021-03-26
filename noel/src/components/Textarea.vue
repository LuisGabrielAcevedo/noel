<template>
  <div class="textarea" :style="{'width': label ? '360px': '300px'}">
    <div class="textarea__main-box">
        <div class="textarea__label-container" v-if="label">
          <span class="textarea__label">
          {{ label }}
          <span v-if="required" class="textarea__required">*</span>
          </span>
        </div>
        <textarea
        v-model="componentModel"
        @input="input()"
        class="textarea__field"
        :type="type"
        :placeholder="placeholder"
        @focus="focus()"
        :maxlength="maxlength"
        autocomplete="off"
        :disabled="disabled"
        />
    </div>
    <div class="textarea__messages">
       <div class="textarea__messages-box">
            <span class="textarea__error">{{ error || "" }}</span>
            <span v-if="hint && !error" class="textarea__hint">{{ hint }}</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
    data() {
    return {
      componentModel: ""
    };
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
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      required: false
    },
    error: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    model: {
      type: [String, Number],
      default: ""
    },
    onlyNumbers: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: "160"
    }
  },
  methods: {
    input() {
      this.$emit("handle-input", {
        key: this.field,
        value: this.componentModel
      });
    },
    focus() {
      this.$emit("close-all");
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  watch: {
    model: {
      immediate: true,
      handler(newVal) {
        this.componentModel = newVal;
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.textarea {
    height: 68px;
    width: 310px;
    margin: 0 10px;
    margin-bottom: 10px;
    textarea::placeholder {
      color: #BCBCBC;
      font-family: MontserratItalic;
      font-size: 14px;
    }
    @include mobile() {
      width: 100% !important;
    }
    &__main-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    &__field {
      border-style: none;
      background-color: white;
      width: 100%;
      height: 34px;
      border-radius: 18px;
      font-size: 14px;
      padding: 2px 10px;
      text-align: center;
      font-family: MontserratItalic !important;
      @include mobile() {
        font-size: 14px;
        height: 38px;
      }
    }
    textarea:focus {
      outline: 0;
    }
    &__messages {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      line-height: 11px !important;
      padding: 3px 0 0 10px;
    }
   &__error {
      color: #253E87;
      font-family: NexaBold;
      font-size: 11px;
      @include mobile() {
        font-size: 12px;
      }
    }
    &__hint {
        color: #253E87;
        font-family: NexaBold;
        font-size: 11px;
        @include mobile() {
          font-size: 12px;
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
    &__messages-box {
        width: 100%;
    }
    &__required {
      color: #E31552;
    }
}

</style>
