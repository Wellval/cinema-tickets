<template>
  <div class="filters-container">
    <app-filter>{{ $store.state.cityFilter }}</app-filter>
  </div>
  <app-searchbar></app-searchbar>
  <div class="movies-container">
    <app-movie-card
      v-for="movie in dataFiltered"
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
    this.$store.commit('getSessions')
  },
  computed: {
    dataFiltered () {
      return this.$store.state.movies.filter(movie =>
        (movie.title + movie.info.plot)
          .toLowerCase()
          .includes(this.$store.state.search.toLowerCase())
      )
    }
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
