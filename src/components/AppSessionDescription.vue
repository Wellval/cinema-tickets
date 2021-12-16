<template>
  <div class="session">
    <div class="session-info">
      <div>
        <p>{{cinema[index] ? cinema[index].name : ''}}</p>
        <p>{{city[index] ? city[index].name : ''}}</p>
        <p>{{hall[index] ? hall[index].name : ''}}</p>
        <p>{{date[index] ? date[index].name : ''}} {{timeslot[index] ? timeslot[index].name : ''}}</p>
      </div>
      <div class="buttons-wrapper">
          <router-link :to="{name: 'Tickets', params: {movieId: movieId, sessionId: session._id}}">
            <app-button>Buy tickets</app-button>
          </router-link>
        <app-button v-if="this.$store.state.user.admin" @click="removeSession">Delete session</app-button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
import AppButton from "../components/AppButton";

export default {
  props: ["movieId", "sessions", "session", "index"],
  data() {
    return {
      timeslot: [],
      date: [],
      cinema: [],
      hall: [],
      city: [],
      params: ["city", "cinema", "hall", "timeslot", "date"]
    };
  },
  emits: ["deleteSession"],
  computed: {
    pageId() {
      return this.$route.params.movieId;
    }
  },
  async mounted() {
    for (let session of this.sessions) {
      this.params.map(param => {
        axios
          .get(`http://localhost:5500/${param}/${session[param]}`)
          .then(result => this[param].push(result.data));
      });
    }
  },
  methods: {
    async removeSession() {
      await axios.delete(`http://localhost:5500/session/${this.session._id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      });
      this.$emit("deleteSession");
    }
  },
  components: {
    AppButton
  }
};
</script>

<style lang="scss">
.buttons-wrapper {
  display: flex;
  flex-direction: column;
}
</style>