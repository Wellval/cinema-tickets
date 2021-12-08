<template>
  <div>
    <div class="movie-sessions-container">
      <img class="main-poster" :src="url" alt srcset />
      <div class="info-container">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.plot }}</p>
        <p>Rating: {{ movie.rating }}</p>
      </div>
    </div>
    <div class="session-container">
      <div class="session" v-for="session in sessions" :key="session.cityId + Math.random()">
        <div class="session-info">
          <div>
            <p>
              {{ ['date', 'hall', 'timeslot']
              .map(x => this[x + 's'].find(y => y.id === session[x + 'Id']).name).join(' ') }}
            </p>
            <p>{{ this.cinemas.find(cinema => cinema.id == session.cinemaId).name }}</p>
            <p>{{ this.cities.find(city => city.id == session.cityId).name }}</p>
          </div>
          <app-button @click="buyTicket" :sessions="sessions">Buy tickets</app-button>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import axios from "axios";

export default {
  props: ["movieId"],
  data() {
    return {
      timeslots: [],
      sessions: [],
      movie: "",
      url: "",
      dates: [],
      cinemas: [],
      halls: [],
      cities: []
    };
  },
  computed: {
    pageId() {
      return this.$route.params.movieId;
    }
  },
  async created() {
    await this.$store.dispatch("getSessions");
    await this.$store.dispatch("getDates");
    await this.$store.dispatch("getCinemas");
    await this.$store.dispatch("getHalls");
    await this.$store.dispatch("getTimeslots");
    await this.$store.dispatch("getCities");
    this.sessions = this.$store.state.sessions.filter(
      session => session.movieId === this.movie._id
    );
    ["cinemas", "dates", "halls", "timeslots", "cities"].map(
      x => (this[x] = this.$store.state[x])
    );
    this.url = this.movie.image_url;
  },
  mounted() {
    this.asyncData();
  },

  methods: {
    async asyncData() {
      const { data } = await axios.get(
        `http://localhost:5500/movie/${this.pageId}`
      );
      this.movie = data;
    },
    async buyTicket() {
      const { data } = await axios.get(`http://localhost:5500/movie/tickets`);
    }
  },
  components: {
    AppButton
  }
};
</script>

<style lang="scss">
h2 {
  font-size: 35px;
}

.movie-sessions-container {
  display: flex;
}

.info-container {
  width: 100%;
  margin-left: 50px;
}

.session-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-container {
  width: 100%;
  margin-top: 50px;
}

.main-poster {
  width: 270px;
  height: 370px;
}
</style>
