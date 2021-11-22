<template>
  <app-searchbar @input-changed="addFilters"></app-searchbar>
  <app-prompt @choose-movie="chooseMovie" :moviesSearched="moviesSearched"></app-prompt>
  <div class="filters-container">
    <app-filter
      @change-filters="addFilters"
      :filterName="filterName"
      v-for="filterName in $store.state.filters.names"
      :key="filterName"
    >{{ $store.state.cityFilter }}</app-filter>
  </div>
  <div class="movies-container">
    <app-movie-card
      v-for="movie in moviesSearched"
      :url="movie.info.image_url"
      :title="movie.title"
      :plot="movie.info.plot"
      :key="movie.title + Math.random()"
    />
  </div>
</template>

<script>
import AppSearchbar from '../components/AppSearchbar'
import AppMovieCard from '../components/AppMovieCard'
import AppFilter from '../components/AppFilter'
import AppPrompt from '../components/AppPrompt'

export default {
  async mounted () {
    await this.$store.dispatch('getMovies')
    this.$store.commit('getSessions')
    this.moviesFiltered = this.$store.state.movies
    this.sessions = this.$store.state.sessions
  },
  data () {
    return {
      movieTitles: [],
      moviesFiltered: [],
      sessions: []
    }
  },
  computed: {
    moviesSearched () {
      return this.moviesFiltered.filter(movie =>
        movie.title
          .toLowerCase()
          .toLowerCase()
          .includes(this.$store.state.search.toLowerCase())
      )
    }
  },
  methods: {
    addFilters () {
      this.sessions = this.$store.state.sessions.filter(session =>
        [
          session.cinemaId,
          session.cityId,
          session.dateId,
          session.timeslotId
        ].some(x => this.$store.state.filters.options.some(y => x === y))
      )
      const movies = []
      this.sessions.map(session => movies.push(session.movieTitle))
      if (this.$store.state.filters.options.length !== 0) {
        this.moviesFiltered = this.$store.state.movies.filter(movie =>
          movies.includes(movie.title)
        )
      } else this.moviesFiltered = this.$store.state.movies
    },
    chooseMovie (movieTitle) {
      this.moviesFiltered = this.moviesFiltered.filter(
        m => m.title === movieTitle
      )
    }
  },
  components: {
    AppSearchbar,
    AppMovieCard,
    AppFilter,
    AppPrompt
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
