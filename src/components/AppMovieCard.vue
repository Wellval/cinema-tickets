<template>
  <div class="movie-card_wrapper">
    <div class="poster">
      <img :src="url" />
    </div>
    <div class="title">{{ title }}</div>
    <p class="movie-card_plot">{{plot}}</p>
    <router-link :to="{name: 'Movie', params: {movieId: id}}">
      <app-button>Tickets</app-button>
    </router-link>
    <app-button @click="deleteMovie" v-if="admin">Delete movie</app-button>
  </div>
</template>

<script>
import AppButton from "./AppButton";
import axios from "axios";

export default {
  data() {
    return {
      sessions: []
    };
  },
  props: ["url", "title", "plot", "id"],
  emits: ["movieDeleted"],
  computed: {
    admin() {
      return this.$store.state.user.admin || false;
    }
  },
  methods: {
    async deleteMovie() {
      await axios
        .delete(`https://cinema-tickets-back.herokuapp.com/movie/${this.id}`, {
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
          this.deleteMovieSessions();
        })
        .catch(error => {
          console.log(error);
        });
    },
    async deleteMovieSessions() {
      await axios
        .get("https://cinema-tickets-back.herokuapp.com/session/all/list")
        .then(sessions => (this.sessions = sessions.data));
      let movieSessions = this.sessions.filter(
        session => session.movie === this.id
      );
      movieSessions.map(movieSession => {
        axios
          .delete(`https://cinema-tickets-back.herokuapp.com/session/${movieSession._id}`, {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          })
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
