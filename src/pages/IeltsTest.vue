<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 800px"
    >

      <template v-slot:before>
        <div class="q-pa-md" style="max-width: 350px;">
          <q-list separator>
            <q-item>
              <q-item-section>Full Name: {{ user.full_name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Age: {{ user.age }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Email: {{ user.email }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="q-gutter-sm" style="display: inline-flex;">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://elingo.edu.vn/wp-content/uploads/2017/05/ielts-listening-section-experience.png"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Listening test</strong></span>
                  <q-separator/>
                  The listening test will include 40 exercises, you will listen to 40 questions with different accents.
                  In 30 minutes, you will have to answer the question to the examiner, who will be the judge to your
                  points.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="listen.length > 0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ listen[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://onthiielts.com.vn/wp-content/uploads/2019/09/image3-1.png"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Reading test</strong></span>
                  <q-separator/>
                  The reading test will take place in 40 minutes with 40 questions to test your reading skills.These
                  skills include reading sections for the main grasping, reading for understanding key concepts, reading
                  for detail memorization.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="read.length > 0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ read[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>

          <div class="q-gutter-sm" style="display: inline-flex">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://open.http.mp.streamamg.com/p/3000401/sp/300040100/thumbnail/entry_id/0_1blsoyqr/version/100000/acv/172/width/372/height/209"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Writing test</strong></span>
                  <q-separator/>
                  The writing test is divided into 2 tasks and you will have to complete it in 1 hour. Task 1 required
                  your writing skills to describe charts, data or processes. In task 2, you will have to write about
                  your opinion about
                  arguments, opinions.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="write.length>0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ write[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://nativespeaker.vn/resource/images/luyen-ielts-speaking-8.jpg"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Speaking test</strong></span>
                  <q-separator/>
                  In the speaking test, you will interact 1 on 1 with an examiner. The examiner will also be the judge
                  on your points. They will as you some question. Focus on your spelling and grammar while taking the
                  test.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="speak.length>0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ speak[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn flat color="primary" @click="openModal()">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>
            <q-dialog v-model="connectLecture">
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
                        @end_callback="endCallBack('event ended')"
                        :start-time="start_time"
                        :end-time="end_time"
                        :end-text="'Time\'s up!'"
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
            </q-dialog>
          </div>
        </div>
      </template>

    </q-splitter>
  </div>

</template>

<script>
  import axios from 'axios'
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    data() {
      return {
        splitterModel: 20,
        listen: [],
        speak: [],
        read: [],
        write: [],
        connectLecture: false,
        onlineLecture: {},
        start_time: 0,
        end_time: 0,
        idLoading: true
      }
    },
    props: ['user'],
    watch: {
      user() {
        this.getData();
      }
    },
    methods: {
      openModal:async function() {
        this.idLoading = true;
        this.onlineLecture = {};

       await db.collection("lecture").where ("member_id", "==", null)
          .onSnapshot(snap => {
            let lectureData = [];
            snap.forEach(doc => {
              lectureData.push({
                id: doc.id,
                lectureId: doc.data().lecture_id
              })
            })
           if (lectureData.length > 0){
             axios.get(process.env.API_URL + '/lecture/' + lectureData[Math.floor(Math.random() * lectureData.length)].lectureId)
               .then( response => {
                 this.onlineLecture = response.data.lecture
                 this.idLoading = false
               })
               .catch(error => {
                 this.idLoading = false
                 console.log(error)
               })
           }
           else {
             this.idLoading = false
           }
          })
            this.connectLecture = true
            this.start_time = (new Date).getTime()
            this.end_time = (new Date).getTime() + 60000
      },
      startExam(){
        axios.get(process.env.API_URL + '/speaking-question')
          .then(response => {
            let speaking_question = response.data.speaking_question;
            db.collection("lecture").doc(this.onlineLecture.id.toString())
              .update({
                member_id: this.user.id,
                speaking_id: speaking_question
              })
          })
          .catch(error => {
            console.log(error)
          })
      },
      getData() {
        axios.get(process.env.API_URL + '/listenHistory/' + this.user.id)
          .then(response => {
            this.listen = response.data
          })
          .catch(error => {
            this.errors = error.response.data.errors
          })

        axios.get(process.env.API_URL + '/readHistory/' + this.user.id)
          .then(response => {
            this.read = response.data
          })
          .catch(error => {
            this.errors = error.response.data.errors
          })

        axios.get(process.env.API_URL + '/speakHistory/' + this.user.id)
          .then(response => {
            this.speak = response.data
          })
          .catch(error => {
            console.log(error.response.data)
            this.errors = error.response.data.errors
          })

        axios.get(process.env.API_URL + '/writeHistory/' + this.user.id)
          .then(response => {
            this.write = response.data
          })
          .catch(error => {
            console.log(error.response.data)
            this.errors = error.response.data.errors
          })
      },
      endCallBack: function (x) {
        this.connectLecture = false
      }
    }

  }
</script>

<style scoped>
  .my-card {
    max-width: 500px;
    margin: 15px 50px 50px 50px;
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
