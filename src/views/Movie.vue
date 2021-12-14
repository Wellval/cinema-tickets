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
    <div class="session-container" v-if="sessions">
      <session-description
        @deleteSession="getSessions"
        v-for="(session, index) in sessions"
        :key="session._id"
        :index="index"
        :movieId="movieId"
        :sessions="sessions"
        :session="session"
      ></session-description>
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import axios from "axios";
import sessionDescription from "../components/sessionDescription";

export default {
  props: ["movieId"],
  data() {
    return {
      sessions: [],
      movie: ""
    };
  },
  computed: {
    pageId() {
      return this.$route.params.movieId;
    }
  },
  mounted() {
    this.asyncData();
    this.getSessions();
  },

  methods: {
    async getSessions() {
      await axios
        .get(`http://localhost:5500/session/${this.movieId}`)
        .then(sessions => (this.sessions = sessions.data));
    },
    async asyncData() {
      const { data } = await axios.get(
        `http://localhost:5500/movie/${this.pageId}`
      );
      this.movie = data;
    }
  },
  components: {
    AppButton,
    sessionDescription
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
