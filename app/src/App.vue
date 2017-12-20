<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header></header>
    <main>
      <q-layout ref="layout" view="hHh Lpr lFf" :right-breakpoint="1100">
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
            Layout Header
            <span slot="subtitle">Optional subtitle</span>
          </q-toolbar-title>
        </q-toolbar>
        <side-bar slot="left" />
        <!-- sub-routes get injected here: -->
        <router-view />
      </q-layout>
    </main>
  </div>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QRouteTab,
    QTabs
  } from 'quasar-framework'

  import SideBar from './components/Sidebar.vue'
/*
 * Root component
 */
export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QRouteTab,
      QTabs,
      SideBar
    }
}
</script>

<style lang="stylus">
main
  text-align center
  margin-top 40px

header
  margin 0
  height 10px
  background-color $primary
</style>
