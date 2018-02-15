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
                v-model="user.email"
              />
            </q-field>
            <q-btn color="secondary" @click="updateInfos" class="full-width" style="margin-top: 15px;">Modifier vos informations</q-btn>
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
            <q-btn color="secondary" @click="updatePassword" class="full-width" style="margin-top: 15px;">Changer votre mot de passe</q-btn>
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="modify">Alarms tab</q-tab-pane>
    </q-tabs>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {
    QTabs,
    QTab,
    QTabPane,
    QInput,
    QBtn,
    QField,
    SessionStorage,
    Toast
  } from 'quasar-framework'

  export default {
    name: 'account',
    components: {
      QTabs,
      QTab,
      QTabPane,
      QBtn,
      QInput,
      QField
    },
    data () {
      return {
        user: {
          pseudo: '',
          email: ''
        },
        url: '',
        password: '',
        confirmpassword: ''
      }
    },
    mounted () {
      this.user = SessionStorage.get.item('currentUser')
    },
    methods: {
      updateInfos: function () {
        // TODO: verify infos with vuelidate
        let fireUser = firebase.auth().currentUser
        let updateProfilePromise = new Promise((resolve, reject) => {
          if (fireUser.displayName !== this.user.pseudo) {
            fireUser.updateProfile({
              displayName: this.user.pseudo
            }).then(() => {
              resolve(true)
            }).catch((error) => {
              reject(error)
            })
          }
          else {
            resolve(false)
          }
        })
        let updateEmailPromise = new Promise((resolve, reject) => {
          if (fireUser.email !== this.user.email) {
            fireUser.updateEmail(this.user.email)
              .then(() => {
                resolve(true)
              })
              .catch((error) => {
                console.log('ok')
                reject(error)
              })
          }
          else {
            resolve(false)
          }
        })

        Promise.all([updateProfilePromise, updateEmailPromise])
          .then((results) => {
            if (results[0] !== false || results[1] !== false) {
              this.$http.put('/api/users/' + fireUser.uid, this.user)
                .then(() => {
                  SessionStorage.set('currentUser', this.user)
                  Toast.create({
                    html: 'Informations modifiées avec succès',
                    timeout: 2500
                  })
                })
            }
          }).catch(reason => {
            console.log(reason)
          })
      },
      updatePassword: function () {
        // TODO: verify password with vuelidate
        var user = firebase.auth().currentUser;

        user.updatePassword(this.password)
          .then(function() {
            Toast.create({
              html: 'Mot de passe mis à jour',
              timeout: 2500
            })
          }).catch(function(error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style scoped>

</style>
