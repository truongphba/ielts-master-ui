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
            <div class="alert alert-danger" v-if="errors">
              <p>Sign in fail. Please try again!</p>
            </div>
            <form
              class="q-gutter-md" @submit.prevent="login" method="post"
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
                autocomplete="new-password"
              />

              <div>
                <q-btn label="Login" type="submit" color="primary"/>
                <q-btn label="Register" to="/register" color="primary" flat class="q-ml-sm"/>
              </div>
            </form>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        errors: false
      }
    },
    methods: {
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
