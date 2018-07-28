import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'
import App from '@store/modules/app'
import User from '@store/modules/user'
import Campaigns from '@store/modules/campaigns'
import Searchbar from '@store/modules/searchbar'
import Notifications from '@store/modules/notifications'

const stores = {
  app: new App(),
  user: new User(),
  campaigns: new Campaigns(),
  searchbar: new Searchbar(),
  notifications: new Notifications()
}

// persist modules
const hydrate = create({ storage: AsyncStorage, jsonify: true })
hydrate('user', stores.user)
hydrate('notifications', stores.notifications)
hydrate('campaigns', stores.campaigns)

export default stores
