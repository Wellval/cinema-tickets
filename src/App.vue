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
  mounted() {
    axios
      .get("http://localhost:5500/user/me", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(result => {
        this.$store.state.admin = result.data._doc.role;
        this.$store.state.email = result.data._doc.email;
      });
  },
  components: {
    TheHeader,
    MainLayout
  }
};
</script>
