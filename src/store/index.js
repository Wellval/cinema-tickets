import { createStore } from 'vuex'
import getItems from '../shared/getFromApi';

export default createStore({
  state() {
    return {
      user: { admin: false },
      seats: [],
      movies: [],
      moviesSearched: [],
      sessions: [],
      cinemas: [],
      dates: [],
      timeslots: [],
      search: '',
      cities: [],
      halls: [],
      token: localStorage.getItem("token"),
      filters: {
        cinemas: [],
        cities: [],
        dates: [],
        timeslots: []
      }
    }
  },
  actions: {
    setUser(store, value) {
      store.commit('SET_USER', value)
    },
    getSeats({ commit }) {
      getItems(commit, 'http://localhost:5500/seat/all/list', 'SET_SEATS');
    },
    getMovies({ commit }) {
      getItems(commit, 'http://localhost:5500/movie/all/list', 'SET_MOVIES');
    },
    getSessions({ commit }) {
      getItems(commit, 'http://localhost:5500/session/all/list', 'SET_SESSIONS');
    },
    getDates({ commit }) {
      getItems(commit, 'http://localhost:5500/date/all/list', 'SET_DATES');
    },
    getCinemas({ commit }) {
      getItems(commit, 'http://localhost:5500/cinema/all/list', 'SET_CINEMAS');
    },
    getHalls({ commit }) {
      getItems(commit, 'http://localhost:5500/hall/all/list', 'SET_HALLS');
    },
    getTimeslots({ commit }) {
      getItems(commit, 'http://localhost:5500/timeslot/all/list', 'SET_TIMESLOTS');
    },
    getCities({ commit }) {
      getItems(commit, 'http://localhost:5500/city/all/list', 'SET_CITIES');
    },
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies
      state.moviesSearched = movies
    },
    SET_SEATS(state, seats) {
      state.seats = seats
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_MOVIES_SEARCHED(state, movies) {
      state.moviesSearched = movies
    },
    SET_SESSIONS(state, sessions) {
      state.sessions = sessions
    },
    SET_DATES(state, dates) {
      state.dates = dates
    },
    SET_CINEMAS(state, cinemas) {
      state.cinemas = cinemas
    },
    SET_HALLS(state, halls) {
      state.halls = halls
    },
    SET_TIMESLOTS(state, timeslots) {
      state.timeslots = timeslots
    },
    SET_CITIES(state, cities) {
      state.cities = cities
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, value) {
      state.user = value
    },
    SET_FILTERS(state, payload) {
      state.filters[payload.filterName] = payload.value;
    }
  },
  getters: {
    token(state) {
      return state.token
    }
  }
})
