<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 50px);">
    <q-card class="text-center col-12 col-md-3">
      <q-card-title class="bg-darken">
        <object type="image/svg+xml" data="~assets/logo-home-gestion-white.svg" width="128" height="128">
          <img src="~assets/logo-home-gestion.png" width="128" height="128" />
        </object>
        <h4 class="text-white">Connectez-vous</h4>
      </q-card-title>
      <q-card-separator/>
      <q-card-main class="bg-white">
        <q-field error-label="Un e-mail valide est requis" class="text-left">
          <q-input
            float-label="e-mail"
            v-model="email"
            @blur="$v.email.$touch"
            :error="$v.email.$error" />
        </q-field>
        <q-field error-label="Le mot de passe est obligatoire" class="text-left">
          <q-input
            type="password"
            float-label="Mot de passe"
            max-length="16"
            v-model="password"
            @blur="$v.password.$touch"
            :error="$v.password.$error" />
          <a @click="openModalPassword = true" class="inline-block" style="margin-top: 15px;">J'ai oublié mon mot de passe.</a>
          <q-modal ref="minimizedModal" minimized :content-css="{padding: '50px'}" v-model="openModalPassword">
            <h5>Me renvoyer un nouveau mot de passe</h5>
            <q-input float-label="e-mail" v-model="emailForget" />
            <q-btn color="secondary" @click="sendRecoverPassword">Renouveller mot de passe</q-btn>
            <q-btn color="primary" @click="openModalPassword = false">Fermer</q-btn>
          </q-modal>
        </q-field>
      </q-card-main>
      <q-card-actions class="bg-grey-11 inline-block vertical-middle">
        <q-btn color="secondary" @click="login" class="full-width" style="margin-top: 15px;">Connexion</q-btn>
        <p style="margin-top: 15px;">Pas de compte ? <router-link to="/sign-up">Créez le maintenant.</router-link></p>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import { required, email } from 'vuelidate/lib/validators'
  import {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardActions,
    QInput,
    QField,
    QBtn,
    Alert,
    QAlert,
    QModal,
    Toast,
    SessionStorage
  } from 'quasar-framework'

  export default {
    name: 'login',
    components: {
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QCardActions,
      QInput,
      QField,
      QBtn,
      Alert,
      QModal,
      QAlert
    },
    data () {
      return {
        email: '',
        password: '',
        emailForget: '',
        openModalPassword: false,
        user: {
          uid: '',
          pseudo: '',
          mail: '',
          profile_picture: ''
        }
      }
    },
    validations: {
      email: { required, email },
      password: { required }
    },
    methods: {
      login: function () {
        this.$v.email.$touch()
        if (this.$v.email.$error) {
          Toast.create('E-mail non valide.')
          return
        }
        this.$v.password.$touch()
        if (this.$v.password.$error) {
          Toast.create('Mot de passe obligatoire.')
          return
        }
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
          .then(user => {
            if (user.user.emailVerified === true) {
              SessionStorage.set('authenticate', true)
              this.$http.get('/api/users/' + user.user.uid)
                .then((currentUser) => {
                  console.log(currentUser)
                  this.user.uid = user.user.uid
                  this.user.pseudo = currentUser.data[0].pseudo
                  this.user.mail = currentUser.data[0].email
                  this.user.profile_picture = currentUser.data[0].profile_picture
                  SessionStorage.set('currentUser', this.user)
                })
              this.$router.replace('/home')
            }
            else {
              Alert.create({html: 'Votre e-mail n\'est pas vérifié ! <br /> vous devez cliquer sur le lien de vérification dans l\'e-mail envoyé à votre adresse'})
            }
          }, err => {
            console.log(err)
            Alert.create({html: 'Oops. ' + err.message})
          })
      },
      sendRecoverPassword: function () {
        firebase.auth().sendPasswordResetEmail(this.emailForget)
          .then(() => {
            Toast.create({
              html: 'Mail de réinitialisation de mot de passe correctement envoyé',
              timeout: 2500
            })
          })
      }
    }
  }
</script>
<style lang="stylus">
</style>
