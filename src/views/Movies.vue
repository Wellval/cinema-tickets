<template>
  <app-searchbar @input-changed="addFilters"></app-searchbar>
  <app-prompt @choose-movie="chooseMovie" :moviesSearched="moviesSearched"></app-prompt>
  <div class="filters-container">
    <app-filter
      @change-filters="addFilters"
      :filterName="filterName"
      v-for="filterName in Object.keys($store.state.filters)"
      :key="filterName"
    ></app-filter>
  </div>
  <div class="movies-container">
    <app-movie-card
      v-for="movie in moviesSearched"
      :url="movie.image_url"
      :title="movie.title"
      :id="movie._id"
      :plot="movie.plot"
      :key="movie.title + Math.random()"
    />
  </div>
  <div v-if="moviesSearched.length === 0">No movies with this parameters</div>
</template>

<script>
import AppSearchbar from '../components/AppSearchbar'
import AppMovieCard from '../components/AppMovieCard'
import AppFilter from '../components/AppFilter'
import AppPrompt from '../components/AppPrompt'

const propsMappings = {
  cinemas: 'cinemaId',
  cities: 'cityId',
  dates: 'dateId',
  timeslots: 'timeslotId'
}

export default {
  async mounted () {
    await this.$store.dispatch('getMovies')
    await this.$store.dispatch('getSessions')
    this.moviesFiltered = this.$store.state.movies
    this.sessions = this.$store.state.sessions
  },
  updated () {
    console.log('upd')
  },
  data () {
    return {
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
    verifySession (session, filters) {
      for (const key of Object.keys(propsMappings)) {
        if (
          filters[key].length > 0 &&
          !filters[key].includes(session[propsMappings[key]])
        ) {
          return false
        }
      }
      return true
    },
    addFilters () {
      this.sessions = this.$store.state.sessions.filter(session =>
        this.verifySession(session, this.$store.state.filters)
      )
      const movies = [
        ...new Set(this.sessions.map(session => session.movieTitle))
      ]
      if (
        Object.keys(propsMappings).some(
          x => this.$store.state.filters[x].length !== 0
        )
      ) {
        this.moviesFiltered = this.$store.state.movies.filter(movie =>
          movies.includes(movie.title)
        )
      } else this.moviesFiltered = this.$store.state.movies
    },
    chooseMovie (movieId) {
      this.moviesFiltered = this.moviesFiltered.filter(
        m => m.title === movieId
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
