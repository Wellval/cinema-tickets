import axios from 'axios'

const getItems = (commit, url, mutation) => {
    return axios.get(url)
        .then(response => response.data)
        .then(items => {
          commit(mutation, items)
        })
}

export default getItems

