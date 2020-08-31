<template xmlns="http://www.w3.org/1999/html">
  <div v-if="isLoading" class="absolute-center">
    <q-spinner-hourglass
      color="purple"
      size="4em"
    />
  </div>
  <div v-else>
    <q-splitter
      v-model="splitterModel"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div style="display: flex">
            <span class="text-h4 q-mb-md">READING PASSAGE</span>
            <q-space></q-space>
            <q-card class="my-card col-md-8">
              <div class="absolute countdown" style="color: white;font-size: 10pt">
                <vue-countdown-timer
                  @start_callback="startCallBack('event started')"
                  @end_callback="endCallBack('event ended')"
                  :start-time="start_time"
                  :end-time="end_time"
                  :end-text="'00 : 00'"
                  label-position="begin"
                >
                  <template slot="countdown" slot-scope="scope">
                    <span>{{ scope.props.minutes }} : </span>
                    <span>{{ scope.props.seconds }}</span>
                  </template>
                </vue-countdown-timer>
              </div>
            </q-card>
          </div>
          <div v-html="reading_question_1.content"></div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">QUESTION</div>
          <div v-for="read in reading_question_1">
            <br>
            <p style="font-weight: bold">{{ read.title }}</p>
            <div v-for="answer in read.answer.split(';')">
              <input class="cursor-pointer" style="margin-right: 5px;" type="radio" v-bind:value="answer"
                     v-model="read.id"/>
              <span>{{ answer }}</span>
            </div>
          </div>
          <div>
          </div>
          <br>
          <q-btn label="Submit" color="primary" @click="confirm = true"/>
<!--          <q-dialog v-model="confirm" persistent>-->
<!--            <q-card>-->
<!--              <q-card-section class="row items-center">-->
<!--                <span class="q-ml-sm" style="text-transform: uppercase; width: 300px">are you sure to submit !</span>-->
<!--              </q-card-section>-->
<!--              <q-card-actions align="right">-->
<!--                <q-btn flat label="Cancel" color="primary" v-close-popup/>-->
<!--                <q-btn flat label="Submit" color="primary" @click="checkAnswer"/>-->
<!--              </q-card-actions>-->
<!--            </q-card>-->
<!--          </q-dialog>-->
<!--          <q-dialog v-model="detail" persistent>-->
<!--            <q-card>-->
<!--              <q-bar>-->
<!--                <q-space/>-->
<!--              </q-bar>-->
<!--              <q-card-section style="width: 350px; height: 100px">-->
<!--                Your point: {{ point }}-->
<!--              </q-card-section>-->
<!--              <q-btn style="float: right" to="/ielts-test" label="OK"></q-btn>-->
<!--            </q-card>-->
<!--          </q-dialog>-->
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "src/api/firebaseConfig"

const db = firebase.firestore()
export default {
  name: "ReadingTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      reading_question_1: [],
      reading_question_2: [],
      reading_question_3: [],
      start_time: 0,
      end_time: 0,
      point: 0,
      // detail: false,
      // confirm: false,
      isLoading: true
    }
  },
  props: ['user'],
  watch: {
    user() {
      this.checkExam();
    }
  },
  created() {

  },
  methods: {
    startCallBack: function (x) {
      console.log(x)
    },
    endCallBack: async function (x) {
      // this.point = 0;
      // this.answer = [];
      // for (const ans of this.read[1]) {
      //   await this.answer.push(ans.id);
      // }
      // for (let i = 0; i < this.answer.length; i++) {
      //   if (this.read[1][i].correct_answer == this.answer[i]) {
      //     this.point++;
      //   }
      // }
      // axios.post(process.env.API_URL + '/storeRead', {
      //   student_id: this.user.id,
      //   point: this.point
      // })
      //   .then(response => {
      //     this.success = true;
      //   })
      //   .catch(error => {
      //     this.errors = error.response.data
      //   })
      // this.detail = true
    },
    checkExam() {
      db.collection("lecture").where("member_id", "==", this.user.id)
        .onSnapshot(snap => {
          let data = [];
          snap.forEach(doc => {
            data.push({
              lectureId: doc.data().lecture_id,
            })
          })

          if (data.length <= 0) {
            window.location.href = '/home'
          } else {
            axios.get(process.env.API_URL + '/reading')
              .then(response => {
                console.log(response.data)
                this.reading_question_1 = response.data.reading_question_1;
                this.reading_question_2 = response.data.reading_question_2;
                this.reading_question_3 = response.data.reading_question_3;
                this.start_time = response.data.start_time;
                this.end_time = response.data.end_time;
                this.isLoading = false
              })
              .catch(error => {
                console.log(error.response.data)
                this.errors = error.response.data
              })
          }
        });
    }
  }
}
</script>

<style scoped>
.countdown {
  justify-content: center;
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.47);
  border-radius: 50% !important;
  right: 10px;
}

.countdown span {
  font-size: 10pt;
  color: white;
}
</style>
