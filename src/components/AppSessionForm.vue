<template>
  <form @submit.prevent="addSession">
    <select
      v-model="category[Object.keys(category).find(key => category[key] === cat)]"
      v-for="(cat, i) in category"
      :value="category[Object.keys(category).find(key => category[key] === cat)]"
      :id="category[Object.keys(category).find(key => category[key] === cat)]"
      :name="category[Object.keys(category).find(key => category[key] === cat)]"
    >
      <option
        v-for="option in $store.state[Object.keys(category).find(key => category[key] === cat)]"
        :value="option.name ? option.name : option.title"
      >{{option.name || option.title}}</option>
    </select>
    <app-button>Add</app-button>
    <div v-if="added">Added successfully!</div>
  </form>
</template>

<script>
import axios from "axios";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default {
  data() {
    return {
      added: false
    };
  },
  props: ["category"],
  methods: {
    addSession() {
      const movie = this.$store.state.movies.find(
        movie => movie.title === this.category.movies
      );
      const cinema = this.$store.state.cinemas.find(
        cinema => cinema.name === this.category.cinemas
      );
      const hall = this.$store.state.halls.find(
        hall => hall.name === this.category.halls
      );
      const city = this.$store.state.cities.find(
        city => city.name === this.category.cities
      );
      const date = this.$store.state.dates.find(
        date => date.name === this.category.dates
      );
      const timeslot = this.$store.state.timeslots.find(
        timeslot => timeslot.name === this.category.timeslots
      );
      axios
        .post(
          "http://localhost:5500/session/all/add",
          {
            movie: movie._id,
            cinema: cinema._id,
            hall: hall._id,
            city: city._id,
            date: date._id,
            timeslot: timeslot._id
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
        .then(result => (result ? (this.added = true) : (this.added = false)));
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  },
  components: {
    AppButton,
    AppInput
  }
};
</script>