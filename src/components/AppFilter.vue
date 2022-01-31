<template>
  <div class="filter-container" v-click-outside="onClickOutside">
    <button class="filter" @click="isOpen = !isOpen">{{ filterName }}</button>
    <form v-if="isOpen">
      <div v-for="item in $store.state[filterName]" class="checkbox">
        <label>
          <input
            :value="item._id"
            @change="changeHandler"
            type="checkbox"
            name="options"
            v-model="options"
          />
          {{item.name}}
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {
  data() {
    return {
      filters: {
        cinemas: this.$store.state.cinemas,
        cities: "cities",
        dates: "dates",
        timeslots: "timeslots"
      },
      options: [],
      isOpen: false
    };
  },
  props: ["filterName"],
  emits: ["change-filters"],
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    changeHandler() {
      this.$store.commit("SET_FILTERS", {
        filterName: this.filterName,
        value: this.options
      });
      this.$emit("change-filters", this.filterName);
    },
    onClickOutside() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss">
.filter-container {
  position: relative;
  height: 30px;

  form {
    z-index: 2;
    position: relative;
    max-height: 80px;
    height: 80px;
    overflow: scroll;
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
    z-index: 1;
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
