// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
require(`quasar/dist/quasar.ie`)
require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
// import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFire from 'vuefire'
import * as firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueFire)

let app
let config = {
  apiKey: 'AIzaSyD7U5ODIXRUFK5ocU7ZdGqPygURbvWfb4g',
  authDomain: 'home-gestion-app.firebaseapp.com',
  databaseURL: 'https://home-gestion-app.firebaseio.com',
  projectId: 'home-gestion-app',
  storageBucket: 'home-gestion-app.appspot.com',
  messagingSenderId: '26296091690'
}
firebase.initializeApp(config)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'

/* eslint-disable no-new */
// new Vue({
//   el: '#q-app',
//   router,
//   render: h => h(require('./App').default)
// })

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#q-app',
      router,
      render: h => h(require('./App').default)
    })
  }
})
