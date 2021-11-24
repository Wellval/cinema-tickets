<template>
  <div class="movie-card_wrapper">
    <div class="poster">
      <img :src="url" />
    </div>
    <div class="title">{{ title }}</div>
    <p class="movie-card_plot">{{plot}}</p>
    <div
      class="timeslots"
      v-for="session in sessions"
      :key="session.timeslotId + Math.random()"
    >{{ session.timeslotId }}</div>
    <router-link :sessions="sessions" :to="{name: 'Movie', params: {movieId: id}}">
      <app-buy-button :sessions="sessions">Buy tickets</app-buy-button>
    </router-link>
  </div>
</template>

<script>
import AppBuyButton from './AppBuyButton'
export default {
  props: ['url', 'title', 'plot', 'id'],
  computed: {
    sessions () {
      return this.$store.state.sessions.filter(
        session => session.movieTitle === this.title
      )
    }
  },
  components: {
    AppBuyButton
  }
}
</script>

<style lang="scss">
.timeslots {
  margin-bottom: 20px;
}
</style>
