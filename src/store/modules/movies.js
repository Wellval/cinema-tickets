import axios from 'axios'

export default {
  state () {
    return {
      movies: []
    }
  },
  mutations: {
    async getMovies (state) {
      const { data } = await axios.get('https://tickets-9b42e-default-rtdb.firebaseio.com/movies.json')
      state.movies = data
    }
  }
}
