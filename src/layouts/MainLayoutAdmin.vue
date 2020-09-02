<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal :class="$q.dark.isActive?'header_dark':'header_normal'">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm"/>
        <!--          <q-avatar>-->
        <!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">-->
        <!--          </q-avatar>-->

        <q-toolbar-title>CRM Admin</q-toolbar-title>
        <q-btn class="q-mr-xs" flat round @click="$q.dark.toggle()"
               :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"/>
        <q-btn flat round dense icon="fas fa-sign-out-alt" @click="logout"/>
      </q-toolbar>
    </q-header>
    <q-drawer class="left-navigation text-white"
              show-if-above v-model="left"
              style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
              side="left"
              elevated>
      <div class="full-height" :class="$q.dark.isActive?'drawer_dark':'drawer_normal'">
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>

            <q-toolbar-title>{{ admin.full_name }}</q-toolbar-title>
          </q-toolbar>
          <hr/>
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item active-class="tab-active" to="/admin/dashboard" exact class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="dashboard"/>
                </q-item-section>

                <q-item-section>
                  Dashboard v1
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/dashboard_v2" exact class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="dashboard"/>
                </q-item-section>

                <q-item-section>
                  Dashboard v2
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/dashboard_v3" exact class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="dashboard"/>
                </q-item-section>

                <q-item-section>
                  Dashboard v3
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/admin/user-management" class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="list"/>
                </q-item-section>

                <q-item-section>
                  User Management
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/admin/listening-management" class="q-ma-sm navigation-item"
                      clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="list"/>
                </q-item-section>

                <q-item-section>
                  Listening Management
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/admin/reading-management" class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="list"/>
                </q-item-section>

                <q-item-section>
                  Reading Management
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/admin/writing-management" class="q-ma-sm navigation-item" clickable
                      v-ripple>
                <q-item-section avatar>
                  <q-icon name="list"/>
                </q-item-section>

                <q-item-section>
                  Writing Management
                </q-item-section>
              </q-item>

              <q-item active-class="tab-active" to="/admin/writing-answer-management" class="q-ma-sm navigation-item"
                      clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="list"/>
                </q-item-section>

                <q-item-section>
                  Writing Answer Management
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view/>
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>


  </q-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      left: false,
      admin: [],
    }
  },
  created() {
    if(this.$getCookie('Authorization') === ''){
      window.location.href = '/admin'
    }
    axios.get(process.env.API_URL + '/admin-auth', {
      headers: {Authorization: this.$getCookie('Authorization')}
    })
      .then(response => {
        this.admin = response.data.admin
        if (this.admin.is_admin !== 1){
          window.location.href = '*'
        }
      })
      .catch(error => {
        document.cookie = 'Authorization=' + this.$getCookie('Authorization') +'; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        window.location.href = '/admin'
      })
  },
  methods: {
    logout() {
      var token = this.$getCookie('Authorization').replace('Bearer ', '')
      console.log(this.$getCookie('Authorization'))
      axios.post(process.env.API_URL + '/admin-logout', {
        token: token
      })
        .then(response => {
          document.cookie = 'Authorization=' + this.$getCookie('Authorization') + '; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
          window.location.href = '/admin'
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }

}
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url('/statics/images/lake.jpg') !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: green;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(145deg, rgb(32, 106, 80) 15%, rgb(21, 57, 102) 70%);
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
