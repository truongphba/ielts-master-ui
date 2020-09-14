<template>
  <div v-if="isLoading" class="absolute-center">
    <q-spinner-hourglass
      color="purple"
      size="4em"
    />
  </div>
  <div v-else class="row items-start q-gutter-md q-pa-lg" >
    <div class="col-md-1"></div>
    <q-card class="my-card col-md-3" style="min-height: 450px">
      <img style="height: 300px;overflow: hidden" :src="member.avatar" v-if="member.avatar">
      <img style="height: 300px;overflow: hidden" v-else src="https://r9b7u4m2.stackpathcdn.com/prod/sites/eXfkOOiYH-uoddxClSi52viuasTF1mJ8olZ0u-tOtfFqK66gZCc90Ly_Uoc0VmR1eULwQ0uGf2JhPt4yPTts8A/themes/base/assets/images/avatar-1.png">
      <q-card-section>
        <div class="text-h6">{{member.full_name}}</div>
        <b>Age: </b> {{member.age}}<br>
        <b>Email: </b> {{member.email}}<br>


      </q-card-section>
      <q-card-section class="q-pt-none">

      </q-card-section>
    </q-card>
    <q-card class="my-card col-md-7" style="min-height: 450px">
      <q-img height="450px" src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="text-subtitle2 absolute-top text-center">
          {{title}}
        </div>
      </q-img>
      <div class="absolute-center countdown" style="color: white;font-size: 30pt">
        <vue-countdown-timer
          @end_callback="endCallBack()"
          :start-time="start_time"
          :end-time="end_time"
          label-position="begin"
          :end-text="'00 : 00'"
        >
          <template slot="countdown" slot-scope="scope">
            <span>{{scope.props.minutes}} : </span>
            <span>{{scope.props.seconds}}</span>
          </template>
        </vue-countdown-timer>
      </div>
    </q-card>
    <q-card class="my-card col-md-12">
      <div v-if="isWriting">
        <h5 style="margin: 0;text-align: center;text-transform: uppercase" class="q-pa-md">Writing Mark</h5>
        <q-splitter
          v-model="splitterModel"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="task1" label="Part 1"/>
              <q-tab name="task2" label="Part 2"/>
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="task1">
                <div class="q-pa-md">
                  <b class="q-mb-md">Writing question</b>
                  <div v-html="writing_question_1.content"></div>
                  <br>
                  <b class="q-mb-md">Answer</b>

                  <q-editor v-model="writing_answer_1" min-height="13rem" readonly/>

                </div>
              </q-tab-panel>
              <q-tab-panel name="task2">
                <div class="q-pa-md">
                  <b class="q-mb-md">Writing question</b>
                  <div v-html="writing_question_2.content"></div>
                  <br>
                  <b class="q-mb-md">Answer</b>

                  <q-editor v-model="writing_answer_2" min-height="13rem" readonly/>

                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <br>
              <div class="q-gutter-md">
                <q-input filled type="number" v-model.number="writing_point" :min="0" :max="9" label="Point"
                         :rules="[val => val < 10 && val >= 0  || 'Point must be less than 10 and greater than or equal to 0']"/>
                <q-editor placeholder="Leave comment here..." v-model="writing_comment" min-height="13rem"/>
              </div>
              <div>
              </div>
              <br>
            </div>
          </template>
        </q-splitter>
      </div>

      <div class="q-pa-md" v-if="isSpeaking">
        <div style="margin: 0 10% 20px 10%; border-bottom: solid 1px gray"></div>
        <h5 style="text-align: center;text-transform: uppercase; margin: 0;padding-bottom: 10px">Speaking Mark</h5>
        <div class="q-gutter-md">
          <q-input style="max-width: 40%" filled type="number" v-model.number="speaking_point" :min="0" :max="9"
                   label="Point" :rules="[val => val < 10 && val >= 0  || 'Point must be less than 10 and greater than or equal to 0']"/>
          <q-editor placeholder="Leave comment here..." v-model="speaking_comment" min-height="13rem"/>
          <q-btn :color="'green'" @click="submitMark()" label="Submit"></q-btn>
        </div>
        <div>
        </div>
        <br>
      </div>
    </q-card>
    <q-dialog v-model="rating" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Waiting for rating</div>
        </q-card-section>
        <q-card-section class="q-pt-none content-center">
          <q-spinner
            class="content-center"
            color="primary"
            size="4em"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm" style="text-transform: uppercase; width: 300px;font-weight: bold">Your balance were added 20$. Do you want to continue work ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Yes" color="primary" @click="continueWork()"/>
          <q-btn label="No" @click="stopWork()" color="red"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    name: 'lecture-exam',
    data() {
      return {
        splitterModel: 50,
        tab: 'task1',
        title: '',
        member: {},
        start_time: (new Date).getTime(),
        end_time: 0,
        isLoading: true,
        isWriting: false,
        isSpeaking: false,
        writing_point: 0,
        speaking_point: 0,
        writing_question_1: '',
        writing_question_2: '',
        writing_answer_1: '',
        writing_answer_2: '',
        writing_comment: '',
        speaking_comment: '',
        confirm: false,
        rating: false
      }
    },
    props: ['user'],
    created() {

    },
    watch: {
      user() {
        this.getData();
      }
    },
    methods: {
      endCallBack: function () {

      },
      getData: async function () {
        db.collection("lecture").where("lecture_id", "==", this.user.id)
          .onSnapshot(snap => {
            let data = [];
            snap.forEach(doc => {
              data.push({
                member_id: doc.data().member_id,
                status: doc.data().status,
                meeting: doc.data().meeting
              })
            })
            this.isLoading = true;
            if (data.length > 0) {
              if (data[0].status == 1) {
                this.title = 'Expected time remaining to finish writing test'
                this.isWriting = false;
                this.isSpeaking = false;
              } else if (data[0].status == 2) {
                this.isWriting = true;
                this.isSpeaking = false;
                this.title = 'Expected time remaining to finish reading test, check and mask the writing test'
              } else if (data[0].status == 3) {
                this.title = 'Expected time remaining to finish listening test, check and mask the writing test'
                this.isWriting = true;
                this.isSpeaking = false;
              } else if (data[0].status == 4) {
                window.open(data[0].meeting, '_blank');
                this.title = 'Speaking test'
                this.isWriting = true;
                this.isSpeaking = true;
              } else if (data[0].status == 5) {
                this.start_time = 0;
                this.end_time = 0;
                this.rating = true;
              } else if (data[0].status == 6) {
                this.start_time = 0;
                this.end_time = 0;
                this.rating = false;
                this.confirm = true;
              }
              axios.get(process.env.API_URL + '/user/' + data[0].member_id)
                .then(response => {
                  this.member = response.data.user
                })
                .catch(error => {
                  console.log(error)
                })
              axios.get(process.env.API_URL + '/lecture-exam?member_id=' + data[0].member_id)
                .then(response => {
                  this.end_time = response.data.end_time;
                  this.writing_question_1 = response.data.writing_question_1;
                  this.writing_question_2 = response.data.writing_question_2;
                  this.writing_answer_1 = response.data.writing_answer_1;
                  this.writing_answer_2 = response.data.writing_answer_2;
                })
                .catch(error => {
                  console.log(error)
                })
              this.isLoading = false;
            } else {
              window.location.href = '/home'
            }

          });
      },
      submitMark() {
        if (this.speaking_point > 9) {
          this.speaking_point = 9;
        } else if (this.speaking_point < 0) {
          this.speaking_point = 0;
        }
        if (this.writing_point > 9) {
          this.speaking_point = 9;
        } else if (this.writing_point < 0) {
          this.speaking_point = 0;
        }
        axios.post(process.env.API_URL + '/exam/store-mark', {
          member_id: this.member.id,
          speaking_point: this.speaking_point,
          speaking_comment: this.speaking_comment,
          writing_point: this.writing_point,
          writing_comment: this.writing_comment
        }, {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            console.log('ok')
            db.collection("lecture").doc(this.user.id.toString())
              .update({
                status: 5,
                meeting: '',
              })
          })
          .catch(error => {
            console.log(error)
          })
      },
      stopWork() {
        db.collection("lecture").doc(this.user.id.toString()).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      },
      continueWork() {
        db.collection("lecture").doc(this.user.id.toString())
          .update({
            status: 0,
          }).then(response => {
          window.location.href = '/home'
        })
      }
    }
  }

</script>

<style scoped>
  .countdown {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.47);
    border-radius: 50% !important;
  }

  .countdown span {
    font-size: 35pt;
    font-family: 'Anton', sans-serif;
    color: white;
  }
</style>
