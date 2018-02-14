<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container">
    <h4>Votre compte</h4>
    <q-tabs align="justify">
      <q-tab default name="resume" slot="title" icon="fa-address-card" label="Résumé" />
      <q-tab name="modify" slot="title" icon="alarm" label="Modification" />

      <q-tab-pane name="resume">
        <div class="row">
          <div class="col-12 col-md-5">
            <img v-bind:src="user.profile_picture" class="profilePicture" width="200" height="200">
          </div>
          <div class="col-12 col-md-7">
            <q-field error-label="Le pseudo est obligatoire" class="text-left">
              <q-input
                float-label="Pseudo"
                v-model="user.pseudo"
              />
            </q-field>
            <q-field error-label="Votre e-mail n'est pas valide" class="text-left">
              <q-input
                float-label="E-mail"
                v-model="user.mail"
              />
            </q-field>
            <q-btn color="secondary" @click="" class="full-width" style="margin-top: 15px;">Modifier</q-btn>
            <q-field error-label="Le mot de passe est obligatoire" class="text-left">
              <q-input
                type="password"
                float-label="Mot de passe"
                max-length="16"
                v-model="password"
              />
            </q-field>
            <q-field error-label="Le mot de passe n'est pas identique" class="text-left">
              <q-input
                type="password"
                float-label="Confirmer mot de passe"
                max-length="16"
                v-model="confirmpassword"
              />
            </q-field>
          </div>
        </div>
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
    QInput,
    QBtn,
    SessionStorage
  } from 'quasar-framework'

  export default {
    name: 'account',
    components: {
      QTabs,
      QTab,
      QTabPane,
      QBtn,
      QInput
    },
    data () {
      return {
        user: {
          pseudo: '',
          mail: ''
        },
        url: ''
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
