<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header></header>
    <main>
      <q-layout ref="layout" view="hHh Lpr fff" :left-class="{'bg-primary': true}">
        <!-- Header -->
        <q-toolbar slot="header" class="items-stretch">
          <q-btn
            v-if="authenticated"
            flat
            @click="menuExpand()"
            class="burger-icon self-center"
            :icon="openedMenu ? 'keyboard arrow left' : 'menu'"
          >
          </q-btn>
          <div class="logo-container self-center">
            <object type="image/svg+xml" data="~assets/logo-home-gestion.svg" width="30" height="30">
              <img src="~assets/logo-home-gestion.png" width="30" height="30" />
            </object>
          </div>
          <q-toolbar-title class="self-center">
            Home gestion
            <span slot="subtitle">Outils d'administration des tâches et dépenses</span>
          </q-toolbar-title>
          <ul class="top-menu-right">
            <li v-if="authenticated">
              <q-btn flat>
                <q-icon name="account_box" />
                <q-popover ref="popover" class="user-popover">
                  <q-list link>
                    <q-item to="/account/user-purchases">
                      <q-item-side left icon="fa-shopping-bag" />
                      <q-item-main label="Mes achats" />
                    </q-item>
                    <q-item to="/account/user-stats">
                      <q-item-side left icon="pie chart" />
                      <q-item-main label="Statistiques" />
                    </q-item>
                    <q-item to="/account/user-settings">
                      <q-item-side left icon="fa-user" />
                      <q-item-main label="Mon compte" />
                    </q-item>
                    <q-item @click="logout">
                      <q-item-side left icon="fa-sign-out" />
                      <q-item-main label="Déconnexion" />
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </li>
            <li>
              <q-btn @click="$router.push('/help')" flat>
                <q-icon name="help" />
              </q-btn>
            </li>
          </ul>
        </q-toolbar>
        <sidebar v-if="authenticated" slot="left" />
        <!-- sub-routes get injected here: -->
        <router-view />
      </q-layout>
    </main>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {
    QBtn,
    QIcon,
    QLayout,
    QRouteTab,
    QScrollArea,
    QTabs,
    QToolbar,
    QToolbarTitle,
    QPopover,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    SessionStorage } from 'quasar-framework'

  import Sidebar from '@/Sidebar.vue'

  /*
   * Root component
   */
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QScrollArea,
      QPopover,
      QList,
      QItem,
      QItemSide,
      QItemMain,
      Sidebar
    },
    data () {
      return {
        authenticated: false,
        user: {},
        openedMenu: true
      }
    },
    methods: {
      logout: function () {
        // Signout with firebase
        firebase.auth().signOut()
          .then(() => {
            SessionStorage.clear()
            this.$router.replace('/login')
          })
      },
      menuExpand: function () {
        // Used to change icon when status menu changed
        this.$refs.layout.toggleLeft()
        if (!this.openedMenu) {
          this.openedMenu = true
        }
        else {
          this.openedMenu = false
        }
      }
    },
    mounted () {
      let currentUser = firebase.auth().currentUser
      if (SessionStorage.get.item('authenticate')) {
        this.authenticated = SessionStorage.get.item('authenticate')
      }
      else if (currentUser && currentUser.emailVerified) {
        SessionStorage.set('authenticate', true)
        this.authenticated = true
      }
      if (!SessionStorage.get.item('currentUser')) {
        this.$http.get('/api/users/' + currentUser.uid)
          .then((user) => {
            this.user.uid = currentUser.uid
            this.user.pseudo = user.data[0].pseudo
            this.user.mail = user.data[0].email
            this.user.profile_picture = user.data[0].profile_picture
            SessionStorage.set('currentUser', this.user)
          })
      }
    },
    updated () {
      this.authenticated = SessionStorage.get.item('authenticate')
    }
  }
</script>
