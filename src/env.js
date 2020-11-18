let baseURL

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://127.0.0.1:8889/api'
    break
  case 'dev':
    baseURL = 'http://127.0.0.1:8889/api'
    break
  case 'production':
    baseURL = 'http://127.0.0.1:8889/api'
    break
  default:
    baseURL = 'http://127.0.0.1:8889/api'
    break
}
export default {
  baseURL
}