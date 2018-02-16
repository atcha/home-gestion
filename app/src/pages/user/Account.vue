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
            <q-field class="text-left">
              <q-input
                float-label="Pseudo"
                v-model="user.pseudo"
                @keyup.enter="updateInfos"
              />
            </q-field>
            <q-field error-label="Votre e-mail n'est pas valide" class="text-left">
              <q-input
                float-label="E-mail"
                v-model="user.email"
                @keyup.enter="updateInfos"
                @blur="$v.user.email.$touch"
                :error="$v.user.email.$error"
              />
            </q-field>
            <q-btn color="secondary" @click="updateInfos" class="full-width" style="margin-top: 15px;">Modifier vos informations</q-btn>
            <q-field error-label="L'ancien mot de passe est obligatoire" class="text-left">
              <q-input
                type="password"
                float-label="Ancien mot de passe"
                max-length="16"
                v-model="oldpassword"
                @keyup.enter="updatePassword"
                @blur="$v.oldpassword.$touch"
                :error="$v.oldpassword.$error"
              />
            </q-field>
            <q-field error-label="Le mot de passe doit faire minimum 6 charactères" class="text-left">
              <q-input
                type="password"
                float-label="Mot de passe"
                max-length="16"
                v-model="password"
                @keyup.enter="updatePassword"
                @blur="$v.password.$touch"
                :error="$v.password.$error"
              />
            </q-field>
            <q-field error-label="Le mot de passe n'est pas identique" class="text-left">
              <q-input
                type="password"
                float-label="Confirmer mot de passe"
                max-length="16"
                v-model="confirmpassword"
                @keyup.enter="updatePassword"
                @blur="$v.confirmpassword.$touch"
                :error="$v.confirmpassword.$error"
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
  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
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
        oldpassword: '',
        password: '',
        confirmpassword: ''
      }
    },
    validations: {
      user: {
        email: { required, email }
      },
      oldpassword: { required },
      password: { minLength: minLength(6) },
      confirmpassword: { sameAsPassword: sameAs('password') }
    },
    mounted () {
      this.user = SessionStorage.get.item('currentUser')
    },
    methods: {
      updateInfos: function () {
        this.$v.user.$touch()
        if (this.$v.user.$error) {
          Toast.create.negative({
            html: 'E-mail non valide.',
            icon: 'warning'
          })
          return
        }
        let fireUser = firebase.auth().currentUser
        let updateProfilePromise = new Promise((resolve, reject) => {
          if (fireUser.displayName !== this.user.pseudo && this.user.pseudo !== '') {
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
                  Toast.create.positive({
                    html: 'Informations modifiées avec succès',
                    icon: 'fa-check-circle'
                  })
                })
            }
          }).catch(reason => {
            console.log(reason)
          })
      },
      updatePassword: function () {
        this.$v.oldpassword.$touch()
        this.$v.password.$touch()
        this.$v.confirmpassword.$touch()
        if (this.$v.oldpassword.$error) {
          Toast.create.negative({
            html: 'Votre ancien mot de passe est obligatoire.',
            icon: 'warning'
          })
          return
        }
        if (this.$v.password.$error) {
          Toast.create.negative({
            html: 'Le mot de passe doit faire minimum 6 charactères.',
            icon: 'warning'
          })
          return
        }
        if (this.$v.confirmpassword.$error) {
          Toast.create.negative({
            html: 'Le mot de passe doit être identique.',
            icon: 'warning'
          })
          return
        }

        let fireUser = firebase.auth().currentUser
        let credential = firebase.auth.EmailAuthProvider.credential(
          fireUser.email,
          this.oldpassword
        )

        fireUser.reauthenticateWithCredential(credential).then(() => {
          fireUser.updatePassword(this.password)
            .then(function () {
              Toast.create.positive({
                html: 'Mot de passe mis à jour',
                icon: 'fa-check-circle'
              })
            }).catch(function (error) {
              console.log(error)
            })
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
