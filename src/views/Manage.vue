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
    <app-movie-form v-if="selectedCategory === 'movie'" :category="categories[selectedCategory]"></app-movie-form>
    <app-session-form v-else-if="selectedCategory === 'session'" :category="categories[selectedCategory]"></app-session-form>
    <app-hall-form v-else-if="selectedCategory === 'hall'" :category="categories[selectedCategory]"></app-hall-form>
  </div>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppMovieForm from "../components/AppMovieForm";
import AppSessionForm from "../components/AppSessionForm";
import AppHallForm from "../components/AppHallForm";
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
        }
      },
      selectedCategory: "movie",
      added: false
    };
  },
  props: ["modelValue"],
  components: {
    AppInput,
    AppButton,
    AppMovieForm,
    AppSessionForm,
    AppHallForm
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
