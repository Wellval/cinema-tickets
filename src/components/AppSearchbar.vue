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
  emits: ["input-changed", "focus-input", "unfocus"],
  methods: {
    inputHandler() {
      this.$emit("input-changed");
      const config = { headers: { "Content-Type": "application/json" } };
      const movies = axios
        .post(
          "https://cinema-tickets-back.herokuapp.com/movie/searched/list",
          { input: this.$store.state.search },
          config
        )
        .then(result => this.$store.commit("SET_MOVIES_SEARCHED", result.data));
    }
  }
};
</script>
