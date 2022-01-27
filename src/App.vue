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
    await this.$store.dispatch("getCities");
    await this.$store.dispatch("getSessions");
    await this.$store.dispatch("getCinemas");
    await this.$store.dispatch("getDates");
    await this.$store.dispatch("getTimeslots");
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
