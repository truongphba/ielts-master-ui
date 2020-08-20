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
              <p v-if="error" style="color: red">Sign in fail. Please try again!</p>
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
                <q-btn label="Login" type="submit" @click="login" color="primary"/>
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
      function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      if(getCookie('Authorization') != ''){
        window.location.href = '/home'
      }
    },
    methods: {
      login() {
        axios.post(process.env.API_URL + '/login', {
          email: this.user.email,
          password: this.user.password,
        })
          .then(response => {
            document.cookie = 'Authorization=Bearer '+ response.data.token +'; max-age=9000';
          })
          .catch(error => {
            console.log(error.response.data.token)
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
