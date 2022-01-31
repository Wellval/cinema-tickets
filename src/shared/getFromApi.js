import axios from 'axios'

export const refreshToken = async () => {
  const currentToken = localStorage.getItem('token');
  if (currentToken) {
    try {
      const result = (await axios.get('https://cinema-tickets-back.herokuapp.com/auth/token', { headers: { "x-access-token": currentToken }})).data
      localStorage.setItem('token', result.accessToken);
    } catch {
      localStorage.setItem('token', undefined);
    }
  }
}

const getItems = (commit, url, mutation) => {
    return axios.get(url)
        .then(response => response.data)
        .then(items => {
          commit(mutation, items)
        })
}

export default getItems

