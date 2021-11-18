<template>
  <div class="filters-container">
    <app-filter v-for="filter in $store.state.filters" :name="filter.name" :key="filter.naem + Math.random()"></app-filter>
  </div>
  <app-searchbar></app-searchbar>
  <div class="movies-container">
    <app-movie-card
      v-for="movie in $store.state.movies"
      :url="movie.info.image_url"
      :title="movie.title"
      :plot="movie.info.plot"
      :key="movie.title"
    />
  </div>
</template>

<script>
import AppSearchbar from '../components/AppSearchbar'
import AppMovieCard from '../components/AppMovieCard'
import AppFilter from '../components/AppFilter'

export default {
  mounted () {
    this.$store.commit('getMovies')
  },
  components: {
    AppSearchbar,
    AppMovieCard,
    AppFilter
  }
}
</script>

<style lang="scss">
.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.filters-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}
</style>
