<template>
  <div class="filter-container" v-click-outside="onClickOutside">
    <button class="filter" @click="isOpen = !isOpen">{{ filterName }}</button>
    <form v-if="isOpen">
      <div
        @input="changeHandler"
        class="checkbox"
        v-for="item in $store.state[filterName]"
        :key="item.id"
      >
        <label>
          <input v-model="options" type="checkbox" :value="item.id" name="options" />
          {{item.name}}
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'

export default {
  data () {
    return {
      options: [],
      isOpen: false
    }
  },
  props: ['filterName'],
  emits: ['change-filters'],
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    changeHandler () {
      this.$store.state.filters[this.filterName] = this.options
      this.$emit('change-filters');
    },
    onClickOutside () {
      this.isOpen = false
    }
  },
  mounted () {
    this.$store.dispatch('getCities')
    this.$store.dispatch('getCinemas')
    this.$store.dispatch('getDates')
    this.$store.dispatch('getTimeslots')
  }
}
</script>

<style lang="scss">
.filter-container {
  position: relative;
  height: 30px;

  form {
    z-index: 2;
    position: relative;
  }

  .filter {
    width: 200px;
    height: 30px;
    color: white;
    background-color: #1e1e1e;
    border: white 2px solid;
    align-items: center;
    display: flex;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .form-checkbox {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    background: white;
    border: none;
    color: #1e1e1e;
    outline: none;
  }

  .checkbox {
    background: white;
    color: #1e1e1e;
  }
}
</style>
