import { cloneDeep } from 'lodash/lang'

class User {
  constructor(profile, settings) {
    this.originalProfile = profile
    this.profile = cloneDeep(profile)
    this.originalSettings = settings
    this.settings = cloneDeep(settings)
  }
}

export default User
