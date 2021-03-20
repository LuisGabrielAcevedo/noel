<template>
  <div 
    class="button"
    @click="click()"    
    :style="{
      'background': background,
      'color': color
    }">
    <span class="button__text" >{{text}}</span>
  </div>
</template> 

<script>
export default {
  name: 'Button',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {},
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    text: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
      background() {
          let value = 'linear-gradient(to bottom, #FFD800, #CF8301)'
          if (this.type === 'primary') {
            value = 'linear-gradient(to bottom, #FFD800, #CF8301)'
          } else if(this.type === 'secondary') {
            value = 'linear-gradient(to bottom, #E31552, #901036)'
          } else if(this.type === 'tertiary') {
            value = 'linear-gradient(to bottom, #FF7109, #C65400)'
          }
          return value
      },
      color() {
          let value = 'black'
          if (this.type === 'primary') {
            value = 'primary'
          } else if(this.type === 'secondary') {
            value = 'white'
          } else if(this.type === 'tertiary') {
            value = '#FFED89'
          }
          return value
      }
  },
  methods: {
    click() {
        if (!this.isLoading) {
            this.$emit('handle-click')
        }
    }
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 36px;
  border-radius: 25px;
  cursor: pointer;
  padding-top: 2px;
  &__text {
    font-family: BebasNeueBold;
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
