<template xmlns="http://www.w3.org/1999/html">
  <div v-if="isLoading" class="absolute-center">
    <q-spinner-hourglass
      color="purple"
      size="4em"
    />
  </div>
  <div v-else>
    <template>
      <div class="q-pa-md row">
        <div class="q-gutter-y-md" style="width: 80%">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="task1" label="Task 1"/>
              <q-tab name="task2" label="Task 2"/>
            </q-tabs>

            <q-separator/>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="task1">
                <q-splitter
                  v-model="splitterModel"
                >
                  <template v-slot:before>
                    <div class="q-pa-md">
                      <div style="display: flex">
                        <span class="text-h4 q-mb-md">WRITING PASSAGE</span>
                        <q-space></q-space>
                      </div>
                      <div v-html="writing_question_1.content"></div>
                    </div>
                  </template>

                  <template v-slot:after>
                    <div class="q-pa-md">
                      <div class="text-h4 q-mb-md">ANSWER</div>
                      <br>
                      <q-editor v-model="writing_answer_1" min-height="13rem"/>
                      <div>
                      </div>
                      <br>
                    </div>
                  </template>
                </q-splitter>
              </q-tab-panel>

              <q-tab-panel name="task2">
                <q-splitter
                  v-model="splitterModel"
                >
                  <template v-slot:before>
                    <div class="q-pa-md">
                      <div style="display: flex">
                        <span class="text-h4 q-mb-md">WRITING PASSAGE</span>
                        <q-space></q-space>
                      </div>
                      <div v-html="writing_question_2.content"></div>
                    </div>
                  </template>

                  <template v-slot:after>
                    <div class="q-pa-md">
                      <div class="text-h4 q-mb-md">ANSWER</div>
                      <br>
                      <q-editor v-model="writing_answer_2" min-height="13rem"/>
                      <div>
                      </div>
                      <br>
                    </div>
                  </template>
                </q-splitter>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
        </div>
        <div class="q-gutter-y-md" style="width: 20%"
        >
          <q-card class="my-card" style="width: 95%;margin-left: 5%">
            <q-card-section>
              <div class="countdown" style="color: white;font-size: 10pt">
                <vue-countdown-timer
                  @end_callback="endCallBack()"
                  :start-time="start_time"
                  :end-time="end_time"
                  :end-text="'00 : 00'"

                >
                  <template slot="countdown" slot-scope="scope">
                    <span>{{ scope.props.minutes }} : </span>
                    <span>{{ scope.props.seconds }}</span>
                  </template>
                </vue-countdown-timer>
              </div>
            </q-card-section>
            <p style="margin: 0;padding: 10px 10px">Please complete 2 part before submit</p>
            <q-separator/>

            <q-card-actions vertical>
              <q-btn color="green" flat @click="confirm = true">Submit</q-btn>
            </q-card-actions>
          </q-card>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm" style="text-transform: uppercase; width: 300px;font-weight: bold">Are you sure to submit ?</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn label="Submit" @click="submitAnswer()" color="orange"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="pre" persistent full-width full-height>
            <q-card class="bg-teal">
              <q-card-section class="row" style="padding-top: 30px">
                <h4 style="text-align: center;text-transform: uppercase;width: 100%;color: white">Ready for the writing
                  exam.</h4>
                <div class="countdown absolute-center pre-countdown"
                     style="color: white;font-size: 20pt;margin-top: 170px">
                  <vue-countdown-timer
                    @end_callback="endPreCallBack()"
                    :start-time="start_time"
                    :end-time="pre_time"
                    :end-text="'00 : 00'"
                  >
                    <template slot="countdown" slot-scope="scope">
                      <span>{{ scope.props.minutes }} : </span>
                      <span>{{ scope.props.seconds }}</span>
                    </template>
                  </vue-countdown-timer>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import axios from "axios";
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    name: "WritingTest",
    data() {
      return {
        tab: 'task1',
        splitterModel: 30, // start at 50%
        writing_question_1: {},
        writing_question_2: {},
        writing_answer_1: '',
        writing_answer_2: '',
        pre_time: 0,
        start_time: 0,
        end_time: 0,
        confirm: false,
        isLoading: true,
        pre: true,
        lecture_id: 0
      }
    },
    props: ['user'],
    mounted() {
      this.checkExam();
      setInterval(this.checkAnswer, 10000);
    },
    methods: {
      endCallBack: async function () {
        await this.checkAnswer();
        await this.updateStatus();
        axios.post(process.env.API_URL + '/exam/update-time', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            window.location.href = '/reading-test'
          })
          .catch(error => {
            console.log(error.response)
          })
      },
      endPreCallBack: async function () {
        this.pre = false
      },
      checkExam() {

        axios.get(process.env.API_URL + '/writing', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            this.writing_question_1 = response.data.writing_question_1;
            this.writing_question_2 = response.data.writing_question_2;
            this.pre_time = response.data.pre_time;
            this.start_time = response.data.start_time;
            this.end_time = response.data.end_time;
            this.lecture_id = response.data.lecture_id;
            if (response.data.writing_exam.writing_answer_1 != null) {
              this.writing_answer_1 = response.data.reading_exam.writing_answer_1;
            }
            if (response.data.writing_exam.writing_answer_2 != null) {
              this.writing_answer_2 = response.data.reading_exam.writing_answer_2;
            }
            this.isLoading = false
          })
          .catch(error => {
            if (error.response.data.status == 0) {
              window.location.href = '/home'
            } else if (error.response.data.status == 2) {
              window.location.href = '/reading-test'
            } else if (error.response.data.status == 3) {
              window.location.href = '/listening-test'
            } else if (error.response.data.status == 4) {
              window.location.href = '/speaking-exam'
            }
          });
      },
      checkAnswer: async function () {
        axios.post(process.env.API_URL + '/exam/update', {
          writing_answer_1: this.writing_answer_1,
          writing_answer_2: this.writing_answer_2
        }, {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            console.log('ok');
          })
          .catch(error => {
            console.log(error.response)
          })
      },
      submitAnswer: async function () {
        await this.checkAnswer();
        await this.updateStatus();
        axios.post(process.env.API_URL + '/exam/update-time', {}, {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            this.checkAnswer();
            window.location.href = '/reading-test'
          })
          .catch(error => {
            console.log(error.response)
          })
      },
      updateStatus() {
        db.collection("lecture").doc(this.lecture_id.toString())
          .update({
            status: 2
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
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.47);
  }

  .countdown span {
    font-size: 15pt;
    color: white;
  }

  .pre-countdown {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;

  }

  .pre-countdown span {
    font-size: 35pt;
    color: white;
  }
</style>
