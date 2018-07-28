import Reactotron, { networking, trackGlobalErrors } from 'reactotron-react-native'
import axios from 'axios'
import ENV from '@/env'
import firebase from 'react-native-firebase'

if (ENV.ENVIRONMENT === 'develop') {
  global.debug = (msg, payload = null) => Reactotron.log({ msg, payload })
  Reactotron
    .configure({ host: ENV.HOST })
    .use(networking())
    .use(trackGlobalErrors())
    .useReactNative()
    .connect()
    .clear()
} else {
  global.debug = () => {}
}

axios.defaults.baseURL = `${ENV.API_URL}/${ENV.ENVIRONMENT}`
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.interceptors.response.use(response => response.data, error => Promise.reject(error))

let channel = new firebase.notifications.Android.Channel('main', 'main', firebase.notifications.Android.Importance.Max)
firebase.notifications().android.createChannel(channel)
