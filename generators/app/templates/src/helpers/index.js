import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import firebase from 'react-native-firebase'
import { Platform } from 'react-native'
const locale = require('date-fns/locale/es')

export function ago (date) {
  return distanceInWordsToNow(parseInt(date), { addSuffix: true, includeSeconds: true, locale })
}

export function notify (notif) {
  let local = new firebase.notifications.Notification()
    .setNotificationId('main')
    .setTitle(notif._title)
    .setBody(notif._body)
    .setData(notif._data)
    .setSound('default')

  if (Platform.OS === 'android') {
    local
      .android.setChannelId('main')
      .android.setAutoCancel(true)
      .android.setDefaults(firebase.notifications.Android.Defaults.All)
      .android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.Small)
      .android.setCategory(firebase.notifications.Android.Category.Recommendation)
  }

  firebase.notifications().displayNotification(local)
}
