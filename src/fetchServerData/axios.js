import axios from 'axios'
// import router from '@/router'
import {loadingBarRef} from '@/Entry'

const request = axios.create({
  // baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})

class HttpError extends Error {
  constructor(message) {
    super()
    this.message = message.message || 'error'
    this.code = message.code
  }
}

// http request timeout 60s
request.defaults.timeout = 90 * 1000
// http request interceptors
request.interceptors.request.use(config => {
  // config.params = {...config.params, t: Date.now()}
  loadingBarRef.current.startRequest()
  return config
}, e => Promise.reject(e))

// http response interceptors
request.interceptors.response.use(res => {
  loadingBarRef.current.endRequest()
  return res.data
}, e => {
  loadingBarRef.current.error()
  if (e && e.response) {
    let {status = '', data = {}} = e.response || {}
    // let {auth = false} = router.currentRoute.meta
    if (status === 401) {
    //   if (auth) {
    //     router.push(`/signin${router.currentRoute.fullPath ? `?redirect=${router.currentRoute.fullPath}` : ''}`)
    //     return Promise.reject(new HttpError({code: 401, message: 'Unauthorized'}))
    //   } else {
        return Promise.reject(new HttpError({code: 401, message: 'Unauthorized'}))
    //   }
    } else {
      let {code} = data
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(Object.assign(data, {code: code || status}))
    }
  } else {
    return Promise.reject(e)
  }
})

export {
  axios,
  request
}
