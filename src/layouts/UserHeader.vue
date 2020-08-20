<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="q-py-sm bg-indigo-7"  :style="'border-bottom: 2px solid '">
      <q-toolbar>
        <span :style="'font-size: 35px;color:'" class="my-font text-h6 q-mr-md">LOGO</span>
        <q-space></q-space>
        <div class="text-white">
          <q-list class="bg-indigo-7" style="display: flex;" >
            <q-item class="item" to="/" exact exact-active-class="my-item" clickable v-ripple>
              <q-item-section>Home</q-item-section>
            </q-item>

            <q-item class="item" to="/ielts-test" exact exact-active-class="my-item" clickable v-ripple>
              <q-item-section>
                <q-item-label>ielts test</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="item" to="/history" exact exact-active-class="my-item" clickable v-ripple>
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
        <div class="q-pa-md q-gutter-sm">
          <q-btn class="bg-indigo-7" flat v-for="user in users" :key="user.id" v-if="user.id !== 0" >
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <q-item>
              <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Wallet: {{ user.wallet }}</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Add fund</q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable v-close-popup>
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-else color="white" text-color="black" label="Login"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="row no-wrap" style="background-color: #f2f2f2;">
        <div class="col">
          <router-view/>
        </div>
      </q-page>
    </q-page-container>

    <q-toolbar class="bg-indigo-7" style="color: white; text-transform: uppercase; text-align: center">
      <q-toolbar-title>
        Copyright &copy; 2020
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>
<script>
import axios from 'axios';
export default {
  name: "UserHeader",
  data(){
    return{
      users: [
        {
          id: 1,
          name: 'duc',
          wallet: 20000
        },
      ],
      errors: []
    }
  },
}
</script>

<style scoped>
.item {
  text-transform: uppercase;
}

.my-item {
  color: white;
  border-bottom:solid white 2px;
}


</style>
