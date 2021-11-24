<template>
  <div
    class="prompt-container"
    v-if="moviesSearched.length !== 0
      && moviesSearched.length !== 1
      && moviesSearched.length !== $store.state.movies.length"
  >
    <div
      class="prompt"
      @click="$emit('choose-movie', movie.title)"
      v-for="movie in moviesSearched"
      :key="movie.title"
    >{{ movie.title }}</div>
  </div>
</template>

<script>
export default {
  props: ['moviesSearched'],
  emits: ['choose-movie']
}
</script>

<style lang="scss">
.prompt-container {
  position: absolute;
  width: auto;
  min-width: 150px;
  min-height: 50px;
  max-height: 200px;
  overflow-y: auto;
  top: 58px;
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
</style>
