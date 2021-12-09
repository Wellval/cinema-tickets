<template>
  <div class="movie-card_wrapper">
    <div class="poster">
      <img :src="url" />
    </div>
    <div class="title">{{ title }}</div>
    <p class="movie-card_plot">{{plot}}</p>
    <div
      class="timeslots"
      v-for="session in sessions"
      :key="session.timeslotId + Math.random()"
    >{{ session.timeslotId }}</div>
    <router-link :sessions="sessions" :to="{name: 'Movie', params: {movieId: id}}">
      <app-button>Tickets</app-button>
    </router-link>
    <app-button @click="deleteMovie" v-if="admin">Delete movie</app-button>
  </div>
</template>

<script>
import AppButton from "./AppButton";
import axios from "axios";

export default {
  props: ["url", "title", "plot", "id"],
  emits: ["movieDeleted"],
  computed: {
    sessions() {
      return this.$store.state.sessions.filter(
        session => session.movieId === this.id
      );
    },
    admin() {
      return this.$store.state.admin;
    }
  },
  methods: {
    async deleteMovie() {
      await axios
        .delete(`http://localhost:5500/movie/${this.id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(response => {
          this.$store.state.moviesSearched.splice(
            this.$store.state.moviesSearched.indexOf(
              this.$store.state.moviesSearched.find(
                movie => movie._id === this.id
              )
            ),
            1
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    AppButton
  }
};
</script>

<style lang="scss">
.timeslots {
  margin-bottom: 20px;
}
</style>
