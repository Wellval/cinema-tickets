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
    <app-movie-form v-if="selectedCategory === 'movie'" :valid="valid" :category="categories[selectedCategory]"></app-movie-form>
    <app-session-form
      v-else-if="selectedCategory === 'session'"
      :category="categories[selectedCategory]"
    ></app-session-form>
    <app-hall-form v-else-if="selectedCategory === 'hall'" :category="categories[selectedCategory]"></app-hall-form>
    <app-form v-else :selectedCategory="selectedCategory" :valid="valid" :category="categories[selectedCategory]"></app-form>
  </div>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppMovieForm from "../components/AppMovieForm";
import AppSessionForm from "../components/AppSessionForm";
import AppHallForm from "../components/AppHallForm";
import AppForm from "../components/AppForm";
import axios from "axios";

export default {
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
        },
        hall: {
          name: "",
          rows: []
        },
        timeslot: {
          name: '',
        },
        date: {
          name: '',
        },
        city: {
          name: ''
        },
        cinema: {
          name: ''
        }
      },
      selectedCategory: "movie",
      added: false
    };
  },
  computed: {
    valid() {
      return !Object.values(this.categories[this.selectedCategory]).every(val => val !== "");
    }
  },
  props: ["modelValue"],
  components: {
    AppInput,
    AppButton,
    AppMovieForm,
    AppSessionForm,
    AppHallForm,
    AppForm,
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
  width: 330px;

  ul li {
    list-style: none;
    letter-spacing: 1px;
    margin-top: 3px;
    border: 2px white solid;
    max-width: 170px;
    height: 30px;
    text-align: center;
    text-justify:auto;
  }
}
</style>
