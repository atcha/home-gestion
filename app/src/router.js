import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

function load (component) {
  return () => import(`./pages/${component}.vue`)
}

const vueRouter = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  routes: [
    { path: '*', redirect: '/login' },
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      name: 'Home',
      component: load('Home'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: load('Login')
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: load('SignUp')
    },
    {
      path: '/achats',
      name: 'Achats',
      component: load('Achats'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'add',
          name: 'Add',
          component: load('achats/AchatsAdd'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'stats',
          name: 'Stats',
          component: load('achats/AchatsStats'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'config',
          name: 'Config',
          component: load('achats/AchatsConf'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/account',
      name: 'Account',
      component: load('user/Account'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

vueRouter.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let verifiedMail = false
  if (currentUser && currentUser.emailVerified) {
    verifiedMail = true
  }
  if (requiresAuth && (!currentUser || !verifiedMail)) next('/login')
  else if (!requiresAuth && currentUser && verifiedMail) next('/home')
  else next()
})

export default vueRouter
