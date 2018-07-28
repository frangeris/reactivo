import React from 'react'
import { Linking, Platform } from 'react-native'
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import Login from '@components/views/auth/login'
import Loading from '@components/views/auth/loading'
import { COLORS, DEEPLINK_CAMPAIGNS } from '@config'
import tabBarOptions from '@assets/sheets/tabbar'
import firebase from 'react-native-firebase'
import { notify } from '@helpers'

let Stack = SwitchNavigator(
  {
    Main: StackNavigator(
      {
        Campaings: {
          screen: TabNavigator(
            {
              recents: {
                screen: require('@components/views/campaigns').default
              },
              notifications: {
                screen: require('@components/views/notifications').default
              },
              profile: {
                screen: require('@components/views/profile').default
              }
            },
            {
              tabBarOptions,
              swipeEnabled: false,
              animationEnabled: Platform.select({ ios: false, android: true })
            }
          ),
          navigationOptions: {
            headerStyle: {
              backgroundColor: COLORS.WHITE,
              borderBottomWidth: 0
            }
          }
        },
        Search: require('@components/views/search').default,
        Scan: require('@components/views/scan').default,
        Campaign: {
          path: 'campaigns/:id',
          screen: require('@components/views/campaign').default
        }
      },
      {
        mode: 'card',
        headerMode: 'screen',
        cardStyle: {
          backgroundColor: COLORS.WHITE
        },
        style: {
          backgroundColor: COLORS.RED,
          borderBottomWidth: 10,
          borderColor: 'white'
        }
      }
    ),
    Brand: require('@components/views/brand').default
  },
  {
    initialRouteName: 'Main',
    backBehavior: true
  }
)

@inject('user', 'notifications')
@observer
export default class Router extends React.Component {
  constructor (props) {
    super(props)
/*
      if (Platform.OS === 'ios') {
        notif.finish(PushNotificationIOS.FetchResult.NoData)
      }
*/

    // foreground push notifications
    firebase.notifications().onNotification(async notif => {
      console.log('onNotification', notif)

      // save the notification on phone
      this.props.notifications.save(notif._data)

      notify(notif)
      // set badge number
      // let badge = await firebase.notifications().getBadge()
      // await firebase.notifications().setBadge(badge + 1)
    })

    // opened notification
    firebase.notifications().onNotificationOpened(opened => {
      console.log('onNotificationOpened', opened)
      this.props.notifications.save(opened.notification._data)

      // go to campaign
      Linking.openURL(`${DEEPLINK_CAMPAIGNS}${opened.notification._data.id}`)
    })
  }

  async componentWillMount () {
    // initial, pending notification
    let pending = await firebase.notifications().getInitialNotification()
    if (pending) {
      console.log('getInitialNotification', pending)
      this.props.notifications.save(pending.notification._data)

      // go to campaign
      Linking.openURL(`${DEEPLINK_CAMPAIGNS}${pending.notification._data.id}`)
      await firebase.notifications().removeAllDeliveredNotifications()
    }
  }

  render () {
    if (this.props.user.logged === null) {
      return <Loading />
    }

    if (!this.props.user.logged) {
      return <Login />
    }

    return <Stack ref={nav => (this.navigator = nav)} />
  }
}
