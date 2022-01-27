<template>
  <div class="navbar">
    <div class="navbar-container">
      <div>LOGO</div>
      <ul>
        <li>
          <router-link to="/movies">Movies</router-link>
        </li>
        <li>
          <router-link to="/manage" v-if="admin">Manage</router-link>
        </li>
        <li @click="modalWindowOpen = true" v-if="token === ''">Log in</li>
        <li @click="logout" v-else>Log out</li>
      </ul>
    </div>
  </div>
  <p>{{email}}</p>
  <app-modal-window @close-modal="close" v-if="modalWindowOpen"></app-modal-window>
</template>

<script>
import AppModalWindow from "./AppModalWindow";

export default {
  data() {
    return {
      modalWindowOpen: false
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    admin() {
      if (this.$store.state.user) {
        return this.$store.state.user.admin
      } else return false
    },
    email() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    close() {
      this.modalWindowOpen = false;
    },
    logout() {
      this.$store.commit("SET_TOKEN", "");
      this.$store.commit("SET_USER", {});
      localStorage.token = "";
    }
  },
  components: {
    AppModalWindow
  }
};
</script>
