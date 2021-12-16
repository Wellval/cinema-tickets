<template>
  <h2>{{movie ? movie.title : ''}}</h2>
  <p>{{hall ? hall.name : ''}}</p>
  <div>
      <component v-for="seat of seats" :is="`app-${seat.category}`"></component>
  </div>
</template>

<script>
import AppRecliner from "../components/seats/AppRecliner";
import AppLoveSeat from "../components/seats/AppLoveSeat"
import AppSofa from "../components/seats/AppSofa"

export default {
  props: ["movieId", "sessionId"],
  async created() {
    await this.$store.dispatch("getMovies");
    await this.$store.dispatch("getSessions");
    await this.$store.dispatch("getHalls");
  },
  data() {
    return {};
  },
  computed: {
    movie() {
      let movie = this.$store.state.movies.find(
        movie => movie._id === this.movieId
      );
      return movie;
    },
    session() {
      return this.$store.state.sessions.find(
        session => session._id === this.sessionId
      );
    },
    hall() {
      if (this.session) {
        let sessionHall = this.session.hall;
        let hall = this.$store.state.halls.find(
          hall => hall._id === sessionHall
        );
        return hall;
      }
    },
    seats() {
        if (this.hall) {
            return this.hall.seats
        }
    }
  },
  components: {
      AppRecliner,
      AppLoveSeat,
      AppSofa
  }
};
</script>

<style lang="scss">
.seat-icon {
  width: 30px;
  height: 30px;
}
</style>