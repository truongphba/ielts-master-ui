<template>
  <q-layout view="hHh lpR fFf fit" class="login-bg">
    <q-page-container class="absolute-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card flex-center">
          <img
            src="https://www.britishcouncil.vn/sites/default/files/ielts_red_-_new_ielts_landing_page_preview_image.png">
          <q-card-section>
            <div class="text-h6">Register</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="error" v-if="errors && errors.length">
           <span v-for="(err, index) in errors" :key="index">
               {{ err }}
           </span>
              <hr>
            </div>
            <q-form
              class="q-gutter-md"
            >
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    v-model="user.name"
                    label="Username *"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="user.email"
                    label="Email *"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    v-model="user.full_name"
                    label="Full Name"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="user.age"
                    label="Age"
                  />
                </div>
              </div>
              <q-input v-if="user.is_lecture"
                       v-model="user.certificate"
                       filled
                       type="textarea"
                       label="Certificate *"
              />
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    type="password"
                    v-model="user.password"
                    label="Password *"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    type="password"
                    label="Confirm Password *"
                  />
                </div>
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
          is_lecture: false
        },
        errors: []
      }
    },
    methods: {
      register() {
        axios.post('http://127.0.0.1:8000/api/register', {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          age: this.user.age,
          certificate: this.user.certificate,
          is_lecture: this.user.is_lecture
        })
          .then(response => {
            console.log(response.data.user)
          })
          .catch(error => {
            this.errors = error.response.data.errors.email
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
  }

  .my-card {
    width: 100%;
    max-width: 700px;
  }

</style>
