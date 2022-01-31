<template>
  <div
    class="prompt-container"
    v-if="$store.state.moviesSearched.length !== $store.state.movies.length
  && $store.state.moviesSearched.length > 2"
  >
    <div
      class="prompt"
      @click="$emit('choose-movie', movie._id)"
      v-for="movie in $store.state.moviesSearched"
      :key="movie.id"
    >{{ movie.title }}</div>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {
  emits: ["choose-movie"]
};
</script>

<style lang="scss">
.prompt-container {
  position: absolute;
  width: auto;
  min-width: 150px;
  min-height: 50px;
  max-height: 200px;
  overflow-y: auto;
  top: 123px;
  background: white;
  z-index: 2;
  color: #1e1e1e;

  .prompt {
    margin-bottom: 6px;
    transition: 0.3s;

    &:hover {
      color: #ff4545;
      cursor: pointer;
    }
  }
}

.input-search:focus ~ .prompt {
  color: yellowgreen;
}

@media (max-width: 1038px) {
  .prompt-container {
    top: 160px;
  }
}

@media (max-width: 512px) {
  .prompt-container {
    top: 241px;
  }
}
</style>
