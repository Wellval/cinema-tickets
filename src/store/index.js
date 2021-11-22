import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      movies: [],
      sessions: [],
      cinemas: [],
      dates: [],
      timeslots: [],
      search: '',
      cities: [],
      filtered: '',
      filters: {
        names: ['cinemas', 'cities', 'dates', 'timeslots'],
        options: []
      }
    }
  },
  actions: {
    getMovies ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/movies.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_MOVIES', items)
        })
    }
  },
  mutations: {
    SET_MOVIES (state, movies) {
      state.movies = movies
    },
    async getSessions (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/sessions.json')
      state.sessions = data
    },
    async getCities (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/cities.json')
      state.cities = data
    },
    async getCinemas (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/cinemas.json')
      state.cinemas = data
    },
    async getDates (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/dates.json')
      state.dates = data
    },
    async getTimeslots (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/timeslots.json')
      state.timeslots = data
    }
  }
})
