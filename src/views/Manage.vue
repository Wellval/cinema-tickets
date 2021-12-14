<template>
  <div class="add-forms-container">
    <aside>
      <ul>
        <li
          v-for="category in Object.keys(categories)"
          :key="category"
          @click="selectedCategory = category"
        >Add {{category}}</li>
      </ul>
    </aside>
    <form @submit.prevent="submitHandler" v-if="selectedCategory !== 'session'">
      <app-input
        v-model="categories[selectedCategory][param]"
        v-for="(param, index) in Object.keys(categories[selectedCategory])"
        :key="param + index"
        :placeholder="param.split('_').join(' ')"
      ></app-input>
      <app-button :disabled="valid">Add</app-button>
      <div v-if="added">Added successfully!</div>
    </form>
    <form v-else @submit.prevent="addSession">
      <select
        v-model="categories[selectedCategory][Object.keys(categories[selectedCategory]).find(key => categories[selectedCategory][key] === cat)]"
        v-for="(cat, i) in categories[selectedCategory]"
        :value="categories[selectedCategory][Object.keys(categories[selectedCategory]).find(key => categories[selectedCategory][key] === cat)]"
        :id="categories[selectedCategory][Object.keys(categories[selectedCategory]).find(key => categories[selectedCategory][key] === cat)]"
        :name="categories[selectedCategory][Object.keys(categories[selectedCategory]).find(key => categories[selectedCategory][key] === cat)]"
      >
        <option
          v-for="option in $store.state[Object.keys(categories[selectedCategory]).find(key => categories[selectedCategory][key] === cat)]"
          :value="option.name ? option.name : option.title"
        >{{option.name || option.title}}</option>
      </select>
      <app-button>Add</app-button>
      <div v-if="added">Added successfully!</div>
    </form>
  </div>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import axios from "axios";

export default {
  async mounted() {
    await this.$store.dispatch("getMovies");
    this.$store.dispatch("getHalls");
    this.$store.dispatch("getCities");
    this.$store.dispatch("getCinemas");
    this.$store.dispatch("getDates");
    this.$store.dispatch("getTimeslots");
  },
  data() {
    return {
      categories: {
        movie: {
          title: "",
          plot: "",
          year: "",
          image_url: "",
          release_date: "",
          rating: ""
        },
        session: {
          movies: "Rush",
          cities: "Minsk",
          cinemas: "Silver Screen",
          halls: "Comfort",
          timeslots: "10:00",
          dates: "2021-12-25"
        }
      },
      selectedCategory: "movie",
      added: false
    };
  },
  props: ["modelValue"],
  methods: {
    submitHandler() {
      axios
        .post(
          "http://localhost:5500/movie/all/add",
          this.categories[this.selectedCategory],
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
    },
    addSession() {
      const movie = this.$store.state.movies.find(
        movie => movie.title === this.categories[this.selectedCategory].movies
      );
      const cinema = this.$store.state.cinemas.find(
        cinema => cinema.name === this.categories[this.selectedCategory].cinemas
      );
      const hall = this.$store.state.halls.find(
        hall => hall.name === this.categories[this.selectedCategory].halls
      );
      const city = this.$store.state.cities.find(
        city => city.name === this.categories[this.selectedCategory].cities
      );
      const date = this.$store.state.dates.find(
        date => date.name === this.categories[this.selectedCategory].dates
      );
      const timeslot = this.$store.state.timeslots.find(
        timeslot =>
          timeslot.name === this.categories[this.selectedCategory].timeslots
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
  computed: {
    valid() {
      if (this.selectedCategory !== "session") {
        return !Object.values(this.categories[this.selectedCategory]).every(
          val => val !== ""
        );
      } else return false;
    }
  },
  components: {
    AppInput,
    AppButton
  }
};
</script>

<style lang="scss">
.add-forms-container {
  display: flex;

  form {
    display: flex;
    flex-direction: column;
    width: 350px;
  }
}

aside {
  width: 250px;

  ul li {
    list-style: none;
    letter-spacing: 1px;
    margin-top: 3px;
  }
}
</style>
