<template>
  <div class="add-forms-container">
    <aside>
      <ul>
        <li
          v-for="category in Object.keys(categories)"
          :key="category + Math.random()"
          @click="selectedCategory = category"
        >Add {{category}}</li>
      </ul>
    </aside>
    <form @submit.prevent="submitHandler">
      <app-input
        @changed="changed"
        v-for="param in Object.keys(categories[selectedCategory])"
        v-if="selectedCategory !== 'session'"
        :key="param + Math.random()"
        :input="categories[selectedCategory].param"
        :placeholder="param.split('_').join(' ')"
      ></app-input>
      <select
        v-else
        v-for="item in categories.session"
        :key="item + Math.random()"
        name="movies"
        id
      >
        <option value></option>
      </select>
      <app-button :disabled="valid">Add</app-button>
      <div v-if="added">Added successfully!</div>
    </form>
  </div>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
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
          movie: "",
          city: "",
          cinema: ""
        }
      },
      selectedCategory: "movie",
      added: false
    };
  },
  methods: {
    changed(currentInput, placeholder) {
      const key = Object.keys(this.categories[this.selectedCategory]).find(
        key => key.split("_").join(" ") === placeholder
      );
      this.categories[this.selectedCategory][key] = currentInput;
    },
    submitHandler() {
      axios.post(
        "http://localhost:5500/movie/all/add",
        this.categories[this.selectedCategory]
      );
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  },
  computed: {
    valid() {
      if (
        Object.values(this.categories[this.selectedCategory]).every(
          val => val !== ""
        )
      ) {
        return false;
      } else {
        return true;
      }
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
