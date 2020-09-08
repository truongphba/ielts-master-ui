<template>
  <q-layout view="hHh Lpr fff">
    <q-header class="q-py-sm bg-indigo-7" :style="'border-bottom: 2px solid;'">
      <q-toolbar>
        <span :style="'font-size: 35px;color:'" class="my-font text-h6 q-mr-md">LOGO</span>
        <q-space></q-space>
        <div class="text-white">
          <q-list class="bg-indigo-7" style="display: flex;">
            <q-item class="item" to="/home" exact exact-active-class="my-item" clickable v-ripple>
              <q-item-section>Home</q-item-section>
            </q-item>

            <q-item class="item" to="/history" exact exact-active-class="my-item" clickable v-ripple
                    v-if="Object.keys(user).length > 0 && !user.is_lecture">
              <q-item-section>
                <q-item-label>test history</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="item" exact-active-class="my-item" clickable v-ripple>
              <q-item-section>
                <q-item-label>about us</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </div>
        <q-btn flat class="bg-indigo-7" v-if="Object.keys(user).length > 0">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-item>
            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-menu>
            <q-list style="width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section><p style="margin: 0">Balance: <span style="color: green">{{ user.balance }} $</span></p>
                </q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup v-if="!user.is_lecture">
                <q-item-section @click="addFund()">Add Fund</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn v-else color="white" to="/login" text-color="black" label="Login"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="row no-wrap" style="background-color: #f2f2f2;">
        <div class="col">
          <router-view :user="user"/>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="bg-indigo-7" style="color: white; text-transform: uppercase; text-align: center">
        <q-toolbar-title>
          Copyright &copy; 2020
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
  import axios from 'axios';
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    name: "UserHeader",
    data() {
      return {
        user: {},
      }
    },
    created() {
      if (this.user) {
        axios.get(process.env.API_URL + '/auth', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            this.user = response.data.user
          })
          .catch(error => {
            document.cookie = 'Authorization=' + this.$getCookie('Authorization') + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
          })
      }
    },
    methods: {
      logout() {
        var token = this.$getCookie('Authorization').replace('Bearer ', '')
        console.log(this.$getCookie('Authorization'))
        axios.post(process.env.API_URL + '/logout', {
          token: token
        })
          .then(response => {
            document.cookie = 'Authorization=' + this.$getCookie('Authorization') + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            window.location.href = '/login'
          })
          .catch(error => {
            alert(error)
          })
      },
      addFund() {
        window.location.href = '/addfund'
      }
    }
  }
</script>

<style scoped>
  .item {
    text-transform: uppercase;
  }

  .my-item {
    color: white;
    border-bottom: solid white 2px;
  }
</style>
