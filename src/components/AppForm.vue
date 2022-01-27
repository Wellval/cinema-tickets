<template>
  <form @submit.prevent="submitHandler">
    <app-input
      v-model="category[param]"
      v-for="(param, index) in Object.keys(category)"
      :key="param + index"
      :placeholder="selectedCategory"
    ></app-input>
    <app-button :disabled="valid">Add</app-button>
    <div v-if="added">Added successfully!</div>
  </form>
</template>

<script>
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import axios from "axios";

export default {
  props: ["category", "valid", "selectedCategory"],
  data() {
    return {
      added: false
    };
  },
  methods: {
    submitHandler() {
      axios
        .post(
          `https://cinema-tickets-back.herokuapp.com/${this.selectedCategory}/all/add`,
          this.category,
          {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
        .then(result => {
          result ? (this.added = true) : (this.added = false);
        });
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  },
  components: {
    AppInput,
    AppButton
  }
};
</script>