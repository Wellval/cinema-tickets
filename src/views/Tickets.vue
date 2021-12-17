<template>
  <h2>{{movie ? movie.title : ''}}</h2>
  <p>{{hall ? hall.name : ''}}</p>
  <div v-if="hall && seats">
    <div class="seats-wrapper" v-for="(row, index) of hall.rows">
      <div v-for="item of row">
        <component
          v-if="seats.find(seat => seat._id === item.seat._id)"
          :is="`app-${item.seat.category}`"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import AppRecliner from "../components/seats/AppRecliner";
import AppLoveSeat from "../components/seats/AppLoveSeat";
import AppSofa from "../components/seats/AppSofa";

export default {
  props: ["movieId", "sessionId"],
  async created() {
    await this.$store.dispatch("getSessions");
    await this.$store.dispatch("getSeats");
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
        return this.$store.state.seats;
      }
    },
    rows() {
      if (this.hall) {
        return this.hall.rows;
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

.seats-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>