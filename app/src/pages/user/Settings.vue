<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container">
    <h4>Votre compte</h4>
    <q-tabs align="justify">
      <q-tab default name="resume" slot="title" icon="fa-address-card" label="Résumé" />
      <q-tab name="modify" slot="title" icon="alarm" label="Modification" />

      <q-tab-pane name="resume">
        <p><img v-bind:src="user.profile_picture" width="40" height="40"></p>
        <p>{{ user.pseudo }}</p>
        <p>{{ user.email }}</p>
      </q-tab-pane>
      <q-tab-pane name="modify">Alarms tab</q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import {
    QTabs,
    QTab,
    QTabPane,
    SessionStorage
  } from 'quasar-framework'

  export default {
    name: 'usersettings',
    components: {
      QTabs,
      QTab,
      QTabPane
    },
    data () {
      return {
        user: {}
      }
    },
    mounted () {
      this.user = SessionStorage.get.item('currentUser')
      console.log(this.user)
    }
  }
</script>

<style scoped>

</style>
