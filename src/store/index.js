import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      movies: [],
      sessions: [],
      search: ''
    }
  },
  mutations: {
    async getMovies (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/movies.json')
      state.movies = data
    },
    async getSessions (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/sessions.json')
      state.sessions = data
    }
  }
})
