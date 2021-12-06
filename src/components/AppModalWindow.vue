<template>
  <div class="layout" @click="onClickOutside"></div>
  <div class="modal-window-container">
    <h3>{{ register ? 'Register' : 'Log in' }}</h3>
    <p :class="registrationSuccess ? 'success-message' : 'error-message'">{{registrationMessage}}</p>
    <p :class="loginSuccess ? 'success-message' : 'error-message'">{{loginMessage}}</p>

    <form @submit.prevent="submitHandler" class="login-form">
      <app-input
        v-for="key in Object.keys(userData)"
        :key="key"
        :placeholder="key"
        :input="userData[key]"
        @changed="changed"
      ></app-input>
      <app-button class="dark-button" v-if="!register">Log in</app-button>
      <p @click="register = true" v-if="!register">Register</p>
      <app-button v-else class="dark-button">Register</app-button>
    </form>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import axios from "axios";

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      userData: {
        email: "",
        password: ""
      },
      register: false,
      registrationMessage: "",
      registrationSuccess: false,
      loginMessage: "",
      loginSuccess: false
    };
  },
  methods: {
    onClickOutside() {
      this.$emit("close-modal");
      this.register = false;
    },
    registerUser() {
      axios
        .post("http://localhost:5500/auth/registration", this.userData)
        .then(() => {
          this.registrationMessage = "Registered!";
          this.registrationSuccess = true;
        })
        .catch(e => {
          this.registrationMessage = e.response.data;
          this.registrationSuccess = false;
        });
    },
    login() {
      axios
        .post("http://localhost:5500/auth/login", this.userData)
        .then(result => {
          this.loginMessage = "Logged in!";
          localStorage.token = result.data.accessToken;
          this.$store.state.token = localStorage.token;
          if (result.data.role === "admin") {
            this.$store.state.admin = true;
          }
          this.loginSuccess = true;
        })
        .catch(e => {
          this.loginMessage = e.response.data;
          this.loginSuccess = false;
        });
    },
    changed(input, placeholder) {
      const key = Object.keys(this.userData).find(key => key === placeholder);
      this.userData[key] = input;
    },
    submitHandler() {
      if (this.register) {
        this.registerUser();
      } else this.login();
    }
  },
  emits: ["close-modal"],
  components: {
    AppButton,
    AppInput
  }
};
</script>
