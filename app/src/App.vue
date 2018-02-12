<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header></header>
    <main>
      <q-layout ref="layout" view="hHh Lpr fff" :left-class="{'bg-primary': true}">
        <!-- Header -->
        <q-toolbar slot="header">
          <q-btn v-if="authenticated" flat @click="$refs.layout.toggleLeft()">
            <q-icon name="menu" />
          </q-btn>
          <div class="logo-container">
            <object type="image/svg+xml" data="~assets/logo-home-gestion.svg" width="30" height="30">
              <img src="~assets/logo-home-gestion.png" width="30" height="30" />
            </object>
          </div>
          <q-toolbar-title>
            Home gestion
            <span slot="subtitle">Outils d'administration des tâches et dépenses</span>
          </q-toolbar-title>
          <q-btn v-if="authenticated" flat>
            <q-icon name="account_box" />
            <q-popover ref="popover">
              <q-list link>
                <q-item @click="$refs.popover.close()">
                  <q-item-side left icon="face" />
                  <q-item-main label="Mon compte" />
                </q-item>
                <q-item @click="logout">
                  <q-item-side left icon="power settings new" />
                  <q-item-main label="Déconnexion" />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
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
        authenticated: false
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut()
          .then(() => {
            SessionStorage.set('authenticate', false)
            this.$router.replace('/login')
          })
      }
    },
    mounted () {
      this.authenticated = SessionStorage.get.item('authenticate')
    },
    updated () {
      this.authenticated = SessionStorage.get.item('authenticate')
    }
  }
</script>
