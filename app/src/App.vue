<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header></header>
    <main>
      <q-layout ref="layout" view="hHh Lpr fff">
        <!-- Header -->
        <q-toolbar slot="header" color="dark">
          <q-btn flat @click="$refs.layout.toggleLeft()">
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
        </q-toolbar>
        <sidebar slot="left" />
        <!-- sub-routes get injected here: -->
        <router-view />
      </q-layout>
    </main>
  </div>
</template>

<script>
  import {QBtn, QIcon, QLayout, QRouteTab, QScrollArea, QTabs, QToolbar, QToolbarTitle} from 'quasar-framework'

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
      Sidebar
    }
}
</script>
