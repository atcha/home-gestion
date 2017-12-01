<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header></header>
    <main>
      <q-layout ref="layout" view="lHh Lpr lFf" :right-breakpoint="1100">
        <!-- Header -->
        <q-toolbar slot="header">
          <q-btn flat @click="$refs.layout.toggleLeft()">
            <q-icon name="menu" />
          </q-btn>
          <q-toolbar-title>
            Layout Header
            <span slot="subtitle">Optional subtitle</span>
          </q-toolbar-title>
        </q-toolbar>
        <side-bar slot="left" />
        <!-- sub-routes get injected here: -->
        <router-view />
        <!-- Footer -->
        <q-toolbar slot="footer">
          <q-toolbar-title>
            Layout Footer
          </q-toolbar-title>
        </q-toolbar>
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
@import '~variables'

main
  text-align center
  margin-top 40px

header
  margin 0
  height 10px
  background-color $primary
</style>
