import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state () {
    return {
      movies: [],
      filters: [
        {
          name: 'city'
        },
        {
          name: 'cinema'
        },
        {
          name: 'date'
        },
        {
          name: 'time'
        },
        {
          name: 'seats'
        }
      ]
    }
  },
  mutations: {
    async getMovies (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/movies.json')
      state.movies = data
    }
  }
})
