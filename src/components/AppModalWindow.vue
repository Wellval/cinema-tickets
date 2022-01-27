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
        v-model="userData[key]"
      ></app-input>
      <app-button class="dark-button" v-if="!register">Log in</app-button>
      <p @click="register = true" v-if="!register">Register</p>
      <app-button v-else class="dark-button">Register</app-button>
    </form>
  </div>
</template>

<script>
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import axios from "axios";
import { Vue } from "vue";

export default {
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
  computed: {
    email() {
      return this.$store.state.email;
    }
  },
  methods: {
    onClickOutside() {
      this.$emit("close-modal");
      this.register = false;
    },
    async registerUser() {
      await axios
        .post("https://cinema-tickets-back.herokuapp.com/auth/registration", this.userData)
        .then(() => {
          this.registrationMessage = "Registered!";
          this.registrationSuccess = true;
        })
        .catch(e => {
          this.registrationMessage = e.response.data;
          this.registrationSuccess = false;
        });
      await axios.post('https://cinema-tickets-back.herokuapp.com/stripe/customer', {
        email: this.userData.email
      })
    },
    async login() {
      await axios
        .post("https://cinema-tickets-back.herokuapp.com/auth/login", this.userData)
        .then(result => {
          this.loginMessage = "Logged in!";
          this.$emit("close-modal");
          localStorage.token = result.data.accessToken;
          this.$store.commit("SET_TOKEN", result.data.accessToken);
          this.loginSuccess = true;
        })
        .catch(e => {
          this.loginMessage = e.response.data;
          setTimeout(() => {
            this.loginMessage = "";
          }, 3000);
          this.loginMessage = e.response.data;
          this.loginSuccess = false;
        });
      await axios
        .get("https://cinema-tickets-back.herokuapp.com/user/me", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(result => {
          this.$store.dispatch("setUser", result.data);
        });
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
