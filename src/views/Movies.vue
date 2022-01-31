<template>
  <app-prompt @choose-movie="chooseMovie"></app-prompt>
  <div class="filters-container">
    <app-filter
      @change-filters="addFilters"
      :filterName="filterName"
      v-for="filterName in Object.keys($store.state.filters)"
    ></app-filter>
  </div>
  <app-searchbar></app-searchbar>
  <div class="movies-container" v-if="$store.state.moviesSearched.length !== 0">
    <app-movie-card
      v-for="movie in $store.state.moviesSearched"
      :url="movie.image_url"
      :title="movie.title"
      :id="movie._id"
      :plot="movie.plot"
      :key="movie._id"
    />
  </div>
  <div v-if="$store.state.moviesSearched.length === 0">No movies with this parameters</div>
</template>

<script>
import AppSearchbar from "../components/AppSearchbar";
import AppMovieCard from "../components/AppMovieCard";
import AppFilter from "../components/AppFilter";
import AppPrompt from "../components/AppPrompt";
import axios from "axios";
import qs from "querystring";

const propsMappings = {
  cinema: "cinemaId",
  city: "cityId",
  date: "dateId",
  timeslot: "timeslotId"
};

export default {
  async mounted() {
    this.sessions = this.$store.state.sessions;
    this.$store.state.moviesSearched = this.$store.state.movies;
    await this.$store.dispatch("getMovies");
  },
  data() {
    return {
      sessions: [],
      searchFocused: false,
      movieId: []
    };
  },
  methods: {
    async addFilters(filterName) {
      this.movieId = [];
      let movies = new Set();
      await axios
        .get(
          `https://cinema-tickets-back.herokuapp.com/session/all/list?${qs.stringify(
            this.$store.state.filters
          )}`
        )
        .then(result => {
          result.data.map(res => this.movieId.push(res.movie));
          this.movieId.map(movie => {
            movies.add(this.$store.state.movies.find(m => m._id === movie));
          });
        });
      this.$store.state.moviesSearched = Array.from(movies);
    },
    chooseMovie(movieId) {
      this.$store.commit(
        "SET_MOVIES_SEARCHED",
        this.$store.state.moviesSearched.filter(m => m._id === movieId)
      );
    }
  },
  components: {
    AppSearchbar,
    AppMovieCard,
    AppFilter,
    AppPrompt
  }
};
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
