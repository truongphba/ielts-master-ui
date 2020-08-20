<template>
  <q-layout class="login-bg">
    <q-page-container>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card flex-center">
          <img
            src="https://www.britishcouncil.vn/sites/default/files/ielts_red_-_new_ielts_landing_page_preview_image.png">
          <q-card-section>
            <div class="text-h6">Register</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form v-if="!success"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.name"
                label="Username *"
              />
              <div class="error" v-if="errors.name && errors.name.length">
                <span>{{errors.name[0]}}</span>
                <hr>
              </div>
              <q-input
                filled
                v-model="user.email"
                label="Email *"
              />
              <div class="error" v-if="errors.email && errors.email.length">
                <span>{{errors.email[0]}}</span>
                <hr>
              </div>
              <q-input
                filled
                v-model="user.full_name"
                label="Full Name"
              />
              <q-input
                filled
                type="number"
                v-model="user.age"
                label="Age"
              />
              <div class="error" v-if="errors.age && errors.age.length">
                <span>{{errors.age[0]}}</span>
                <hr>
              </div>
              <q-input v-if="user.is_lecture"
                       v-model="user.certificate"
                       filled
                       type="textarea"
                       label="Certificate *"
              />
              <div class="error" v-if="errors.certificate && errors.certificate.length">
                <span>{{errors.certificate[0]}}</span>
                <hr>
              </div>
              <q-input
                filled
                type="password"
                v-model="user.password"
                autocomplete="new-password"
                label="Password *"
              />
              <div class="error" v-if="errors.password && errors.password.length">
                <span>{{errors.password[0]}}</span>
                <hr>
              </div>
              <q-toggle
                v-model="user.is_lecture"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                label="Register as lecturer"
              />
              <div>
                <q-btn label="Register" type="submit" color="primary" @click="register"/>
                <q-btn label="Back" to="/" color="primary" flat class="q-ml-sm"/>
              </div>
            </q-form>
            <h4 v-if="success">Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></h4>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        user: {
          name : '',
          email : '',
          full_name : '',
          certificate : '',
          age : '',
          password : '',
          is_lecture: false,
        },
        success: false,
        errors: []
      }
    },
    methods: {
      register() {
        axios.post(process.env.API_URL + '/register', {
          name: this.user.name,
          full_name: this.user.full_name,
          email: this.user.email,
          password: this.user.password,
          age: this.user.age,
          certificate: this.user.certificate,
          is_lecture: this.user.is_lecture
        })
          .then(response => {
            this.success = true;
          })
          .catch(error => {
            console.log(error.response.data.errors)
            this.errors = error.response.data.errors
          })
      }
    }
  }
</script>

<style scoped>
  .error span {
    color: red;
  }

  .login-bg {
    background: rgb(238, 174, 202);
    background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
    padding: 0 30%;
  }

  .my-card {
    width: 100%;
    max-width: 700px;
  }

</style>
