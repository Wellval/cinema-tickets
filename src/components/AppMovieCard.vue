<template>
  <div class="movie-card_wrapper">
    <div class="poster">
      <img :src="url" />
    </div>
    <div class="title">{{ title }}</div>
    <p class="movie-card_plot">{{plot}}</p>
    <div
      v-if="this.$store.state.sessions.find(session => session.movieTitle === this.title)"
    >{{ session.timeslotId }}</div>
  </div>
</template>

<script>
export default {
  props: ['url', 'title', 'plot'],
  computed: {
    session () {
      return this.$store.state.sessions.find(
        session => session.movieTitle === this.title
      )
    }
  }
}
</script>
