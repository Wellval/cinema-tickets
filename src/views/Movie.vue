<template>
  <div>
    <div class="movie-sessions-container">
      <img class="main-poster" :src="url" alt srcset />
      <div class="session-container">
        <div class="session" v-for="session in sessions" :key="session.cityId + Math.random()">
          <div class="session-info">
            <div>
              <p>{{ ['date', 'hall', 'timeslot']
                  .map(x => this[x + 's'].find(y => y.id === session[x + 'Id']).name).join(' ') }}</p>
              <p>{{ this.cinemas.find(cinema => cinema.id == session.cinemaId).name }}</p>
              <p>{{ this.cities.find(city => city.id == session.cityId).name }}</p>
            </div>
            <app-buy-button :sessions="sessions"></app-buy-button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBuyButton from '../components/AppBuyButton'

export default {
  props: ['movieId'],
  data () {
    return {
      timeslots: [],
      sessions: [],
      movies: [],
      url: '',
      dates: [],
      cinemas: [],
      halls: [],
      cities: []
    }
  },
  async created () {
    await this.$store.dispatch('getMovies')
    await this.$store.dispatch('getSessions')
    await this.$store.dispatch('getDates')
    await this.$store.dispatch('getCinemas')
    await this.$store.dispatch('getHalls')
    await this.$store.dispatch('getTimeslots')
    await this.$store.dispatch('getCities')
    this.movies = this.$store.state.movies.find(
      movie => movie.id === this.movieId
    )
    this.sessions = this.$store.state.sessions.filter(
      session => session.movieId === this.movies.id
    );
    ['cinemas', 'dates', 'halls', 'timeslots', 'cities'].map(
      x => (this[x] = this.$store.state[x])
    )
    this.url = this.movies.info.image_url
  },
  components: {
    AppBuyButton
  }
}
</script>

<style lang="scss">
h2 {
  font-size: 35px;
}

.movie-sessions-container {
  display: flex;
}

.session-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-container {
  width: 100%;
  margin-left: 50px;
}

.main-poster {
  width: 270px;
  height: 370px;
}
</style>
