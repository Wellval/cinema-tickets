<template>
<div class="tickets-poster__container">
<img class="tickets-poster" :src="movie.image_url" alt="" srcset="">
  <h2>{{movie ? movie.title : ''}}</h2>
</div>
  <the-booking v-if="hall && seats && !payment" :hall="hall" :session="session" :seats="seats"></the-booking>
  <div v-else></div>
</template>

<script>
import AppRecliner from "../components/seats/AppRecliner";
import AppLoveSeat from "../components/seats/AppLoveSeat";
import AppSofa from "../components/seats/AppSofa";
import AppButton from "../components/AppButton";
import TheBooking from "../components/TheBooking";
import axios from "axios";

export default {
  props: ["movieId", "sessionId"],
  data() {
    return {
      tickets: [],
      payment: false,
      card: ""
    };
  },
  async created() {
    await this.$store.dispatch("getSessions");
    await this.$store.dispatch("getSeats");
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
    AppSofa,
    AppButton,
    TheBooking,
  }
};
</script>

<style lang="scss">
.seat-icon {
  width: 30px;
  height: 30px;
}

.tickets-poster__container {
  display: flex;
  align-items: flex-start;

  h2 {
    margin-top: 0;
    margin-left: 20px;
  }

.tickets-poster {
  width: 100px;
  height: 140px;
}
}

.seat-name {
  width: 130px;
  display: flex;
  justify-content: space-between;

  i {
    cursor: pointer;
  }
}

.seats-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    max-width: 10%;

    svg {
      width: 60px;
      height: 30px;
    }
  }
}

@media (max-width: 700px) {
  .seats-wrapper {

  div {
    svg {
      width: 40px;
    }
  }
}
}

@media (max-width: 460px) {
  .seats-wrapper {

  div {
    svg {
      width: 30px;
    }
  }
}
}
</style>