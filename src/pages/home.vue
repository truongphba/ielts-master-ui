<template>
  <div>
    <div class="q-banner text-center relative-position">
      <div class="q-pa-md q-gutter-sm absolute-center">
        <q-btn color="red" label="Get Exam" size="xl"/>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'blue_dark':'bg-blue-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Lecture</div>
                <div class="text-h5">{{lecture.length}}</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="fas fa-chalkboard-teacher"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Member</div>
                <div class="text-h5">{{member.length}}</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="fas fa-user-graduate"/>
              </div>
            </div>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'orange_dark':'bg-orange-9'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Exam</div>
                <div class="text-h5">
                  {{listening_exam.length + reading_exam + writing_exam.length + speaking_exam.length}}
                </div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="fas fa-book"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered style="width: 100%">
        <q-card-section horizontal style="padding: 0 10%">
          <q-card-section>
            <h4 style="margin: 0;text-transform: uppercase">About Us</h4>
            {{ lorem }}
          </q-card-section>
          <q-img
            class="col-3"
            src="https://duhocbluesea.edu.vn/data/upload/images/du%20hoc%20canada%20can%20ielts%20bao%20nhieu.jpg"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="n in 2" class="my-card col">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">
        <q-card-section>
          <div class="text-h6" v-if="lecture[n-1].full_name != null">{{lecture[n-1].full_name}}</div>
          <div class="text-h6" v-else>Unknown</div>
          <div class="text-subtitle2">{{ lecture[n-1].votes }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lecture[n-1].certificate }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      lecture: [],
      member: [],
      listening_exam: [],
      reading_exam: [],
      speaking_exam: [],
      writing_exam: []
    }
  },
  props: ['user'],
  created() {
    axios.get(process.env.API_URL + '/index')
      .then(response => {
        this.lecture = response.data.teacher
        this.member = response.data.student
        this.listening_exam = response.data.examListenings
        this.reading_exam = response.data.examReadings
        this.speaking_exam = response.data.examSpeakings
        this.writing_exam = response.data.examWritings
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
}
</script>

<style scoped>
.q-banner {
  background: url("https://insenglish.org/wp-content/uploads/2018/05/banner-IELTS.jpg") center;
  background-size: cover;
  height: 400px;
}

</style>
