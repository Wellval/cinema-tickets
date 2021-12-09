import { createStore } from 'vuex'
import getItems from '../shared/getFromApi';

export default createStore({
  state() {
    return {
      users: [],
      allMovies: [],
      moviesSearched: [],
      sessions: [],
      admin: JSON.parse(localStorage.getItem('admin')),
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
    getMovies({ commit }) {
      getItems(commit, 'http://localhost:5500/movie/all/list', 'SET_MOVIES');
    },
    getSessions({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/sessions.json', 'SET_SESSIONS');
    },
    getDates({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/dates.json', 'SET_DATES');
    },
    getCinemas({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/cinemas.json', 'SET_CINEMAS');
    },
    getHalls({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/HALLS.json', 'SET_HALLS');
    },
    getTimeslots({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/timeslots.json', 'SET_TIMESLOTS');
    },
    getCities({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/cities.json', 'SET_CITIES');
    },
    getUsers({ commit }) {
      getItems(commit, 'https://tickets-9b42e-default-rtdb.firebaseio.com/users.json', 'SET_USERS');
    }
  },
  mutations: {
    SET_MOVIES(state, allMovies) {
      state.allMovies = allMovies
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
    }
  }
})
