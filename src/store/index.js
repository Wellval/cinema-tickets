import { createStore } from 'vuex'
import getItems from '../shared/getFromApi';

export default createStore({
  state() {
    return {
      userEmail: "",
      movies: [],
      moviesSearched: [],
      sessions: [],
      admin: false,
      cinemas: [],
      dates: [],
      timeslots: [],
      search: '',
      token: localStorage.getItem('token'),
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
    init(store) {
      store.actions.setToken(store, JSON.parse(localStorage.getItem('token') || ''))
    },
    setToken(store, value) {
      store.commit('SET_TOKEN', value)
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
    getUsers({ commit }) {
      getItems(commit, 'http://localhost:5500/city/all/list', 'SET_USERS');
    }
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies
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
    SET_TOKEN(state, value) {
      state.token = JSON.parse(value)
      localStorage.setItem('token', JSON.stringify(token))
    },
  },
  getters: {
    token(state) {
      return state.token
    }
  }
})
