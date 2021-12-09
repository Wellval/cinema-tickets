<template>
  <div>
    <div class="movie-sessions-container">
      <img class="main-poster" :src="movie.image_url" alt srcset />
      <div class="info-container">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.plot }}</p>
        <p>Rating: {{ movie.rating }}</p>
      </div>
    </div>
    <div class="session-container" v-if="sessions.length > 0">
      <div class="session" v-for="(session, index) in sessions" :key="session.city + Math.random()">
        <div class="session-info">
          <div>
            <p>{{cinemas[index] ? cinemas[index].name : ''}}</p>
            <p>{{cities[index] ? cities[index].name : ''}}</p>
            <p>{{halls[index] ? halls[index].name : ''}}</p>
            <p>{{dates[index] ? dates[index].name : ''}} {{timeslots[index] ? timeslots[index].name : ''}}</p>
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
    await axios
      .get(`http://localhost:5500/session/${this.movieId}`)
      .then(sessions => (this.sessions = sessions.data));
    for (let session of this.sessions) {
      await axios.get(`http://localhost:5500/cinema/${session.cinema}`).then(result => this.cinemas.push(result.data));
      await axios.get(`http://localhost:5500/city/${session.city}`).then(result => this.cities.push(result.data));
      await axios.get(`http://localhost:5500/hall/${session.hall}`).then(result => this.halls.push(result.data));
      await axios.get(`http://localhost:5500/timeslot/${session.timeslot}`).then(result => this.timeslots.push(result.data));
      await axios.get(`http://localhost:5500/date/${session.date}`).then(result => this.dates.push(result.data))
    }
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
