<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <q-card class="text-center col-12 col-md-3">
      <q-card-title class="bg-darken">
        <object type="image/svg+xml" data="~assets/logo-home-gestion-white.svg" width="128" height="128">
          <img src="~assets/logo-home-gestion.png" width="128" height="128" />
        </object>
        <h4 class="text-white">Créons un compte</h4>
      </q-card-title>
      <q-card-separator/>
      <q-card-main class="bg-white">
        <q-field class="text-left">
          <q-input float-label="Pseudo" v-model="pseudo" />
        </q-field>
        <q-field error-label="Votre e-mail n'est pas valide" class="text-left">
          <q-input float-label="E-mail" v-model="email" />
        </q-field>
        <q-field class="text-left">
          <q-input type="password" float-label="Mot de passe" max-length="16" v-model="password" />
        </q-field>
        <q-field class="text-left">
          <q-input type="password" float-label="Confirmer mot de passe" max-length="16" v-model="confirmpassword" />
        </q-field>
      </q-card-main>
      <q-card-actions class="bg-grey-11 inline-block vertical-middle">
        <q-btn color="secondary" @click="register" class="full-width" style="margin-top: 15px;">S'enregistrer</q-btn>
        <p style="margin-top: 15px;">Ou retourner sur la <router-link to="/login">page de connexion</router-link>.</p>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardMedia,
    QCardActions,
    QInput,
    QField,
    QBtn
  } from 'quasar-framework'

  export default {
    name: 'signup',
    components: {
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QCardMedia,
      QCardActions,
      QInput,
      QField,
      QBtn
    },
    data () {
      return {
        pseudo: '',
        email: '',
        password: '',
        confirmpassword: '',
        user: {
          uid: '',
          pseudo: '',
          email: '',
          profile_picture: '~assets/users/nobody_m.original.jpg'
        }
      }
    },
    methods: {
      register: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user)
            this.user.uid = user.uid
            this.user.pseudo = this.pseudo
            this.user.email = this.email
            this.$http.post('/api/users', this.user)
              .then((response) => {
                this.senEmailVerification()
                this.$router.replace('/login')
              })
          },
          err => {
            alert('Oops. ' + err.message)
          })
      },
      senEmailVerification: function () {
        firebase.auth().currentUser.sendEmailVerification()
          .then(function () {
            console.log('Email Verification Sent!')
          })
      }
    }
  }
</script>

<style scoped>

</style>
