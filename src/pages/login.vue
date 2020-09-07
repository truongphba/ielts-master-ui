<template>
  <q-layout class="login-bg">
    <q-page-container class="absolute-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card flex-center">
          <img
            src="https://www.britishcouncil.vn/sites/default/files/ielts_red_-_new_ielts_landing_page_preview_image.png">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p v-if="error" style="color: red;margin: 0">Sign in fail. Please try again!</p>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.email"
                label="Email *"
              />
              <q-input
                filled
                type="password"
                v-model="user.password"
                label="Password *"
              />
              <div>
                <q-btn label="Login" @click="login" color="primary"/>
                <q-btn label="Register" to="/register" color="primary" flat class="q-ml-sm"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import axios from "axios";
import firebase from "src/api/firebaseConfig"

const db = firebase.firestore()
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      error: false
    }
  },
  created() {
    if (this.$getCookie('Authorization') != '') {
      window.location.href = '/home'
    }
  },
  methods: {
    login() {
      axios.post(process.env.API_URL + '/login', {
        email: this.user.email,
        password: this.user.password,
      })
        .then(async response => {
          // if (response.data.lecture.is_lecture == 1) {
          //  await db.collection("lecture").doc(response.data.lecture.id.toString())
          //     .set({
          //       lecture_id: response.data.lecture.id,
          //       member_id: null,
          //       status: 1
          //     })
          // }
          document.cookie = 'Authorization=Bearer ' + response.data.token + '; max-age=9000';
          window.location.href = '/home';
        })
        .catch(error => {
          this.error = true
        })
    }
  }
}
</script>

<style scoped>
.login-bg {
  background: rgb(238, 174, 202);
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
}

.my-card {
  width: 100%;
  max-width: 400px;
}

</style>
