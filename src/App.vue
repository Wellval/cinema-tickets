<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "./layouts/MainLayout";
import TheHeader from "./components/TheHeader";
import axios from "axios";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    }
  },
  updated() {
    if (localStorage.getItem("token") !== "") {
      // axios.post(
      //   "http://localhost:5500/auth/token",
      //   {
      //     headers: {
      //       "x-access-token": localStorage.getItem("token")
      //     }
      //   },
      //   this.$store.state.user
      // );
      axios
        .get("http://localhost:5500/user/me", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(result => {
          this.$store.dispatch("setUser", result.data._doc);
        });
    }
  },
  components: {
    TheHeader,
    MainLayout
  }
};
</script>
