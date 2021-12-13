<template>
  <div class="navbar">
    <div class="navbar-container">
      <div>LOGO</div>
      <ul>
        <li>
          <router-link to="/movies">Movies</router-link>
        </li>
        <li>
          <router-link to="/manage" v-if="admin === true">Manage</router-link>
        </li>
        <li @click="modalWindowOpen = true" v-if="token === ''">Log in</li>
        <li @click="logout" v-else>Log out</li>
      </ul>
    </div>
  </div>
  <p v-if="token !== ''">{{userEmail}}</p>
  <app-modal-window @signin="signin" @close-modal="close" v-if="modalWindowOpen"></app-modal-window>
</template>

<script>
import AppModalWindow from "./AppModalWindow";

export default {
  data() {
    return {
      modalWindowOpen: false,
      userEmail: ""
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    admin() {
      return this.$store.state.admin;
    }
  },
  methods: {
    close() {
      this.modalWindowOpen = false;
    },
    logout() {
      this.$store.state.token = "";
      localStorage.admin = false;
      this.$store.state.admin = false;
      localStorage.token = "";
    },
    signin(email) {
      this.userEmail = email;
    }
  },
  components: {
    AppModalWindow
  }
};
</script>
