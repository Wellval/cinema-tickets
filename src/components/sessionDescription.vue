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
        <app-button @click="buyTicket">Buy tickets</app-button>
        <app-button v-if="this.$store.state.admin === 'admin'" @click="removeSession">Delete session</app-button>
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
      movie: "",
      date: [],
      cinema: [],
      hall: [],
      city: [],
      params: ['city', 'cinema', 'hall', 'timeslot', 'date'],
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
        })
    }
  },
  methods: {
    async buyTicket() {
      const { data } = await axios.get(`http://localhost:5500/movie/tickets`);
    },
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