<template>
  <q-layout view="hHh lpR fFf fit" class="login-bg">
    <q-page-container class="absolute-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card flex-center">
          <img src="https://www.britishcouncil.vn/sites/default/files/ielts_red_-_new_ielts_landing_page_preview_image.png">
          <q-card-section>
            <div class="text-h6">Register</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >
             <div class="row">
               <div class="col">
                 <q-input
                   filled
                   v-model="name"
                   label="Username *"
                 />
               </div>
               <div class="col">
                 <q-input
                   filled
                   v-model="email"
                   label="Email *"
                 />
               </div>
             </div>
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    v-model="fullName"
                    label="Full Name"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="age"
                    label="Age"
                  />
                </div>
              </div>
              <q-input v-if="isLecturer"
                v-model="certificate"
                filled
                type="textarea"
                label="Certificate *"
              />
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    type="password"
                    v-model="password"
                    label="Password *"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    type="password"
                    v-model="rePassword"
                    label="Confirm Password *"
                  />
                </div>
              </div>
              <q-toggle
                v-model="isLecturer"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                label="Register as lecturer"
              />
              <div>
                <q-btn label="Register" type="submit" color="primary"/>
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
  export default {
    data() {
      return {
        isLecturer: false,
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
    max-width: 700px;
  }

</style>
