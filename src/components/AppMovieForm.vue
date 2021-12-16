<template>
  <form @submit.prevent="submitHandler">
    <app-input
      v-model="category[param]"
      v-for="(param, index) in Object.keys(category)"
      :key="param + index"
      :placeholder="param.split('_').join(' ')"
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
  props: ["category"],
  data() {
    return {
      added: false
    };
  },
  methods: {
    submitHandler() {
      axios
        .post("http://localhost:5500/movie/all/add", this.category, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(result => {
          result ? (this.added = true) : (this.added = false);
        });
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  },
  computed: {
    valid() {
      return !Object.values(this.category).every(val => val !== "");
    }
  },
  components: {
    AppInput,
    AppButton
  }
};
</script>