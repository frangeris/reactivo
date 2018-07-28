import { Platform } from 'react-native'
import { observable, action } from 'mobx'
import GoogleAPIAvailability from 'react-native-google-api-availability-bridge'

export default class App {
  @observable googleServicesNeedsUpdate = false

  @action checkGoogleServices () {
    if (Platform.OS === 'android') {
      GoogleAPIAvailability.checkGooglePlayServices(result => {
        this.googleServicesNeedsUpdate = result === 'update'
        if (this.googleServicesNeedsUpdate) {
          GoogleAPIAvailability.promptGooglePlayUpdate(false)
        }
      })
    }
  }
}
