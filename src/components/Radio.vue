<template>
  <div class="radio" @click="click()">
    <div v-if="value" class="radio__value">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    click() {
        this.$emit('handle-click')
    }
  }
}
</script>

<style lang="scss">
.radio {
    background-color: white;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-top: 2px;
    cursor: pointer;
    &__value {
        background-color: #EC2C8D;
        height: 8px;
        width: 8px;
        border-radius: 50%;
    } 
}
</style>
