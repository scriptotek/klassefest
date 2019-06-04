import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faBoxOpen,
  faCalendarAlt,
  faCogs,
  faGlassCheers,
  faGlobeAfrica,
  faIceCream,
  faLightbulb,
  faPlus,
  faPlusCircle,
  faSignOutAlt,
  faTag,
  faTimesCircle,
  faUserCircle,
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons'

import {
  faCheckCircle,
  faCircle,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faBoxOpen,
  faCalendarAlt,
  faCheckCircle,
  faCircle,
  faCogs,
  faGlassCheers,
  faGlobeAfrica,
  faIceCream,
  faLightbulb,
  faPlus,
  faPlusCircle,
  faSignOutAlt,
  faTag,
  faTimesCircle,
  faUserAstronaut,
  faUserCircle
)

Vue.component('fa-icon', FontAwesomeIcon)
