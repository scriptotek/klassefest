import { User } from '@/models'

const currentSchemaVersion = 1

const defaultUserSettings = {
  version: currentSchemaVersion,
  vocabularies: [
    'realfagstermer',
    'ddc23nor',
  ],
}

const userService = {
  get() {
    return new Promise((resolve) => {
      let settings = JSON.parse(localStorage.getItem('klassefest-user-settings'))
      if (!settings || settings.version !== currentSchemaVersion) {
        settings = defaultUserSettings
      }
      let profile = {
        name: 'Georg Sverdrup',
        email: 'd.m.heggo@ub.uio.no',
      }
      resolve(new User(profile, settings))
    })
  },

  saveSettings(user) {
    return new Promise((resolve) => {
      // Until we get a backend
      localStorage.setItem('klassefest-user-settings', JSON.stringify(user.settings))
      setTimeout(resolve, 700)
    })
  }
}

export default userService
