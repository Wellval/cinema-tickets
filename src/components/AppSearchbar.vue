<template>
  <form id="search-bar" @submit.prevent="onSubmit">
    <button class="btn-search">
      <i class="fas fa-search"></i>
    </button>
    <input
      @input="inputHandler"
      v-model="$store.state.search"
      type="text"
      class="input-search"
      placeholder="Search by title..."
    />
  </form>
</template>

<script>
import axios from "axios";

export default {
  emits: ["input-changed"],
  methods: {
    inputHandler() {
      this.$emit("input-changed");
      const { data } = axios.get(
        "http://localhost:5500/all/searched",
        this.$store.state.search
      );
    }
  }
};
</script>
