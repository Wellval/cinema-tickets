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
      <app-session-description
        @deleteSession="getSessions"
        v-for="(session, index) in sessions"
        :key="session._id"
        :index="index"
        :movieId="movieId"
        :sessions="sessions"
        :session="session"
      ></app-session-description>
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import axios from "axios";
import AppSessionDescription from "../components/AppSessionDescription";

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
        .get(`https://cinema-tickets-back.herokuapp.com/session/${this.movieId}`)
        .then(sessions => (this.sessions = sessions.data));
    },
    async asyncData() {
      const { data } = await axios.get(
        `https://cinema-tickets-back.herokuapp.com/movie/${this.pageId}`
      );
      this.movie = data;
    }
  },
  components: {
    AppButton,
    AppSessionDescription
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

@media (max-width: 600px) {
  .movie-sessions-container {
    flex-direction: column;

    .info-container {
      margin: 0;
    }
  }
}
</style>
