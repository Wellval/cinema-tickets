<template>
  <h2>{{movie ? movie.title : ''}}</h2>
  <the-booking v-if="hall && seats && !payment" :hall="hall" :session="session" :seats="seats"></the-booking>
  <div v-else></div>
</template>

<script>
import AppRecliner from "../components/seats/AppRecliner";
import AppLoveSeat from "../components/seats/AppLoveSeat";
import AppSofa from "../components/seats/AppSofa";
import AppButton from "../components/AppButton";
import TheBooking from "../components/TheBooking";
import VCreditCard from "v-credit-card";
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
  methods: {
    async bookSeat() {
      await axios
        .put(
          `http://localhost:5500/session/${this.session._id}/book`,
          {
            hallRows: this.session.hallRows
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          axios
            .get(`http://localhost:5500/session/${this.session._id}`)
            .then(res => console.log(res));
        });
    }
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
    VCreditCard
  }
};
</script>

<style lang="scss">
.seat-icon {
  width: 30px;
  height: 30px;
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
}
</style>