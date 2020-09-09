<template>
  <div>
    <div class="q-banner text-center relative-position">
      <div class="q-pa-md q-gutter-sm absolute-center">
        <q-btn v-if="Object.keys(user).length > 0 && !user.is_lecture && !isExam" color="red" @click="openModal()" label="Get Exam"
               size="xl"/>
        <q-btn v-if="Object.keys(user).length > 0 && !user.is_lecture && isExam" color="red" @click="continueExam()"
               label="Continue Exam"
               size="xl"/>
        <q-btn v-if="Object.keys(user).length > 0 && user.is_lecture && !isWorking" color="red" @click="startWork()"
               label="Start Work" size="xl"/>
        <q-btn v-if="Object.keys(user).length > 0 && user.is_lecture && isWorking && !isConnect" color="red"
               @click="stopWork()"
               label="Stop Work" size="xl"/>
        <q-btn v-if="Object.keys(user).length > 0 && user.is_lecture && isWorking && isConnect" color="primary"
               label="Examining" size="xl"/>
        <q-dialog v-model="connectLecture">
         <div v-if="user.balance > 21">
           <div v-if="idLoading">
             <q-card>
               <q-card-section>
                 <div class="text-h6">Connect lecture to get exam</div>
               </q-card-section>
               <q-card-section>
                 <q-spinner
                   color="primary"
                   size="3em"
                 />
               </q-card-section>
             </q-card>
           </div>
           <div v-else>
             <q-card v-if="Object.keys(onlineLecture).length > 0">
               <q-card-section class="row">
                 <div class="text-h6">Connect lecture to get exam</div>
                 <div class="countdown absolute" style="color: black;font-size: 15pt" v-if="connectLecture == true">
                   <vue-countdown-timer
                     @end_callback="endCallBack()"
                     :start-time="start_time"
                     :end-time="end_time"
                     :end-text="'00 : 00'"
                     label-position="begin"
                   >
                     <template slot="countdown" slot-scope="scope">
                       <span>{{ scope.props.seconds }}</span>
                     </template>
                   </vue-countdown-timer>
                 </div>
               </q-card-section>

               <img v-if="onlineLecture.avatar" style="width: 400px;height: auto"
                    :src="onlineLecture.avatar">
               <img style="width: 400px;height: auto" v-else
                    src="https://r9b7u4m2.stackpathcdn.com/prod/sites/eXfkOOiYH-uoddxClSi52viuasTF1mJ8olZ0u-tOtfFqK66gZCc90Ly_Uoc0VmR1eULwQ0uGf2JhPt4yPTts8A/themes/base/assets/images/avatar-1.png">
               <q-card-section>
                 <q-rating v-if="onlineLecture.votes"
                           :value="onlineLecture.votes"
                           size="2em"
                           :max="5"
                           color="orange"
                           readonly
                 />
                 <div class="text-h6">{{onlineLecture.full_name}}</div>
                 <b>Age: </b> {{onlineLecture.age}}<br>
                 <b>Email: </b> {{ onlineLecture.email }}<br>
                 <b>Certificate: </b> {{ onlineLecture.certificate }}<br>
               </q-card-section>
               <q-card-actions align="right">
                 <q-btn label="Accept" color="green" @click="startExam()"/>
                 <q-btn label="Decline" color="red" v-close-popup/>
               </q-card-actions>
             </q-card>
             <q-card v-else>
               <q-card-section>
                 <div class="text-h6">Connect lecture to get exam</div>
               </q-card-section>
               <q-card-section>
                 No lecture is online at this moment!
               </q-card-section>
             </q-card>
           </div>
         </div>
        <div v-else>
          <q-card>
            <q-card-section>
              <div class="text-h6">Connect lecture to get exam</div>
            </q-card-section>
            <q-card-section>
              <p>Your balance not enough to get exam.</p>
            </q-card-section>
          </q-card>
        </div>
        </q-dialog>
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
                  {{listening_exam.length + reading_exam.length + writing_exam.length + speaking_exam.length}}
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
    <div class="q-pa-md" style="padding: 0 10%">
      <hr>
    </div>
    <div class="text-h5 text-weight-bold q-px-md">Top Lecture</div>
    <div class="q-pa-md row q-gutter-md">
      <q-card v-for="(lec, index) in lecture" class="my-card col" v-if="lecture.length > 0 && index < 4">
        <img style="height: 230px;overflow: hidden" :src="lec.avatar" v-if="lec.avatar">
        <img style="margin-left: 10%;height: 230px;width:80%;overflow: hidden"
             src="https://r9b7u4m2.stackpathcdn.com/prod/sites/eXfkOOiYH-uoddxClSi52viuasTF1mJ8olZ0u-tOtfFqK66gZCc90Ly_Uoc0VmR1eULwQ0uGf2JhPt4yPTts8A/themes/base/assets/images/avatar-1.png"
             v-else>
        <q-card-section>
          <q-rating
            :value="lec.votes"
            size="2em"
            :max="5"
            color="orange"
            readonly
          />
          <div class="text-h6" v-if="lec.full_name != null">{{lec.full_name}}</div>
          <div class="text-h6" v-else>Unknown</div>
          <b>Age: </b> {{lec.age}}<br>
          <b>Email: </b> {{ lec.email}}<br>
          <b>Certificate: </b> {{ lec.certificate }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    data() {
      return {
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        lecture: [],
        member: [],
        listening_exam: [],
        reading_exam: [],
        speaking_exam: [],
        writing_exam: [],
        connectLecture: false,
        onlineLecture: {},
        start_time: (new Date).getTime(),
        end_time: (new Date).getTime() + 60000,
        idLoading: true,
        isWorking: false,
        isExam: false,
        isConnect: false
      }
    },
    props: ['user'],
    watch: {
      user() {
        if (this.user.is_lecture) {
          this.checkWork();
        } else {
          this.checkExam();
        }
      }
    },
    created() {
      axios.get(process.env.API_URL + '/index')
        .then(response => {
          console.log(response.data)
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
    },
    methods: {
      openModal: async function () {
        this.idLoading = true;
        this.onlineLecture = {};

        await db.collection("lecture").where("member_id", "==", null)
          .onSnapshot(snap => {
            let lectureData = [];
            snap.forEach(doc => {
              lectureData.push({
                id: doc.id,
                lectureId: doc.data().lecture_id
              })
            })
            if (lectureData.length > 0) {
              axios.get(process.env.API_URL + '/user/' + lectureData[Math.floor(Math.random() * lectureData.length)].lectureId)
                .then(response => {
                  this.onlineLecture = response.data.user
                  this.idLoading = false
                })
                .catch(error => {
                  this.idLoading = false
                  console.log(error)
                })
            } else {
              this.idLoading = false
            }
          })
        this.connectLecture = true
        this.start_time = (new Date).getTime()
        this.end_time = (new Date).getTime() + 60000
      },
      endCallBack: function () {
        this.connectLecture = false
      },
      startExam() {
        axios.post(process.env.API_URL + '/exam', {
          student_id: this.user.id,
          lecture_id: this.onlineLecture.id
        })
          .then(response => {
            db.collection("lecture").doc(this.onlineLecture.id.toString())
              .update({
                member_id: this.user.id,
                status: 1,
              })
            window.location.href = '/writing-test'
          })
          .catch(error => {
            console.log(error.response.data.msg)
          })
      },
      startWork() {
        db.collection("lecture").doc(this.user.id.toString())
          .set({
            lecture_id: this.user.id,
            member_id: null,
            status: 0,
            meeting: ''
          })
      },
      checkWork() {
        db.collection("lecture").where("lecture_id", "==", this.user.id)
          .onSnapshot(snap => {
            let data = [];
            snap.forEach(doc => {
              data.push({
                lecture_id: doc.data().lecture_id,
                member_id: doc.data().member_id,
                status: doc.data().status
              })
            })
            if (data.length > 0) {
              this.isWorking = true;
              if (data[0].member_id != null) {
                this.isConnect = true;
                window.location.href = '/lecture-exam';
              } else {
                this.isConnect = false
              }
            } else {
              this.isWorking = false;
            }
          })
      },
      checkExam() {
        db.collection("lecture").where("member_id", "==", this.user.id)
          .onSnapshot(snap => {
            let data = [];
            snap.forEach(doc => {
              data.push({
                lecture_id: doc.data().lecture_id,
                member_id: doc.data().member_id,
                status: doc.data().status
              })
            })
            this.isExam = data.length > 0;
          })
      },
      stopWork() {
        db.collection("lecture").doc(this.user.id.toString()).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      },
      continueExam() {
        axios.get(process.env.API_URL + '/checkExam', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            if (response.data.exam.status == 0) {
              window.location.href = '/home';
            } else if (response.data.exam.status == 1) {
              window.location.href = '/writing-test';
            } else if (response.data.exam.status == 2) {
              window.location.href = '/reading-test';
            } else if (response.data.exam.status == 3) {
              window.location.href = '/listening-test';
            } else if (response.data.exam.status == 4 ||response.data.exam.status == 5 ) {
              window.location.href = '/speaking-exam';
            }
          })
          .catch(error => {

          });
      }
    }
  }
</script>

<style scoped>
  .q-banner {
    background: url("https://www.broadmindgroup.com/images/course-banners/ielts-banner-new.jpg") center;
    background-size: cover;
    height: 400px;
  }

  .countdown {
    right: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
    background: green;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .countdown span {
    color: white;
  }

</style>
