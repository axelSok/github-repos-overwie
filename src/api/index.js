import axios from 'axios'

const clientId = '01843b32c043926a1ebd'
const clientSecret = '10a41c8657a79aee91d35afbf99375316c723b6f'

const responseErrorHandler = function (error) {
  if (axios.isCancel(error)) {
    return Promise.reject(error)
  }
}

const responseHandler = function (response) {
  return Promise.resolve(response)
}

const axiosGet = (url) => {
  return axios.get(`${url}${url.indexOf('?') > -1 ? '&' : '?'}client_id=${clientId}&client_secret=${clientSecret}`)
}

axios.defaults.baseURL = 'https://api.github.com/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use(responseHandler, responseErrorHandler)

export default {
  repositories: {
    get: {
      query (params) {
        return axiosGet(`search/repositories?q=language:javascript&page=1&per_page=20&sort=stars&order=asc`)
      },
      details ({ ownerName, repoName }) {
        return axiosGet(`repos/${ownerName}/${repoName}`)
      }
    }
  }
}
