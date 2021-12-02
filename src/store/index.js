import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      users: [],
      movies: [],
      sessions: [],
      cinemas: [],
      dates: [],
      timeslots: [],
      search: '',
      cities: [],
      halls: [],
      filters: {
        cinemas: [],
        cities: [],
        dates: [],
        timeslots: []
      }
    }
  },
  actions: {
    getMovies ({ commit }) {
      return axios.get('http://localhost:5500/movie/all/list')
        .then(response => response.data)
        .then(items => {
          commit('SET_MOVIES', items)
        })
    },
    getSessions ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/sessions.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_SESSIONS', items)
        })
    },
    getDates ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/dates.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_DATES', items)
        })
    },
    getCinemas ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/cinemas.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_CINEMAS', items)
        })
    },
    getHalls ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/halls.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_HALLS', items)
        })
    },
    getTimeslots ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/timeslots.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_TIMESLOTS', items)
        })
    },
    getCities ({ commit }) {
      return axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/cities.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_CITIES', items)
        })
    },
    getUsers ({ commit }) {
      return axios.get('https://tickets-users-default-rtdb.firebaseio.com/users.json')
        .then(response => response.data)
        .then(items => {
          commit('SET_USERS', items)
        })
    }
  },
  mutations: {
    SET_MOVIES (state, movies) {
      state.movies = movies
    },
    SET_SESSIONS (state, sessions) {
      state.sessions = sessions
    },
    SET_DATES (state, dates) {
      state.dates = dates
    },
    SET_CINEMAS (state, cinemas) {
      state.cinemas = cinemas
    },
    SET_HALLS (state, halls) {
      state.halls = halls
    },
    SET_TIMESLOTS (state, timeslots) {
      state.timeslots = timeslots
    },
    SET_CITIES (state, cities) {
      state.cities = cities
    },
    SET_USERS (state, users) {
      state.users = users
    }
  }
})
