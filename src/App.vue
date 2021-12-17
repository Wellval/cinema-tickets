<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import TheHeader from "./components/TheHeader";
import axios from "axios";
import { refreshToken } from './shared/getFromApi';

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    }
  },
  async mounted() {
    refreshToken();
    await this.$store.dispatch("getMovies");
    await this.$store.dispatch("getHalls");
    this.$store.dispatch("getCities");
    this.$store.dispatch("getCinemas");
    this.$store.dispatch("getDates");
    this.$store.dispatch("getTimeslots");
  },
  updated() {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:5500/user/me", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(result => {
          this.$store.dispatch("setUser", result.data);
        });
    }
  },
  components: {
    TheHeader,
    MainLayout
  }
};
</script>
