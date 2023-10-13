import axios from 'axios'

const BASE_URL = 'https://api.escuelajs.co/api/v1/'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.response.use(
  (response) => response,
  (error) => error?.response
)

export default instance
