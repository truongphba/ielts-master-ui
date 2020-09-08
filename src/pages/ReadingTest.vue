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
              <q-tab name="task3" label="Task 3"/>
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
                        <span class="text-h4 q-mb-md">READING PASSAGE</span>
                        <q-space></q-space>
                      </div>
                      <div v-html="reading_question_1.content"></div>
                    </div>
                  </template>

                  <template v-slot:after>
                    <div class="q-pa-md">
                      <div class="text-h4 q-mb-md">QUESTION</div>
                      <br>
                      <div v-for="read in reading_answer_1">
                        <p style="font-weight: bold;margin: 0">{{ read.title }}</p>
                        <div v-for="answer in read.answer.split(';')">
                          <input class="cursor-pointer" style="margin-right: 5px" type="radio"
                                 v-bind:value="answer.trim()"
                                 v-model="read.id" @change="checkAnswer()" :checked="answer == read.id"/>
                          <span>{{ answer }}</span>
                        </div>
                        <br>
                      </div>
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
                        <span class="text-h4 q-mb-md">READING PASSAGE</span>
                        <q-space></q-space>
                      </div>
                      <div v-html="reading_question_2.content"></div>
                    </div>
                  </template>

                  <template v-slot:after>
                    <div class="q-pa-md">
                      <div class="text-h4 q-mb-md">QUESTION</div>
                      <br>
                      <div v-for="read in reading_answer_2">
                        <p style="font-weight: bold;margin: 0">{{ read.title }}</p>
                        <div v-for="answer in read.answer.split(';')">
                          <input class="cursor-pointer" style="margin-right: 5px" type="radio"
                                 v-bind:value="answer.trim()"
                                 v-model="read.id" @change="checkAnswer()" :checked="answer == read.id"/>
                          <span>{{ answer }}</span>
                        </div>
                        <br>
                      </div>
                      <div>
                      </div>
                      <br>
                    </div>
                  </template>
                </q-splitter>
              </q-tab-panel>

              <q-tab-panel name="task3">
                <q-splitter
                  v-model="splitterModel"
                >
                  <template v-slot:before>
                    <div class="q-pa-md">
                      <div style="display: flex">
                        <span class="text-h4 q-mb-md">READING PASSAGE</span>
                        <q-space></q-space>
                      </div>
                      <div v-html="reading_question_3.content"></div>
                    </div>
                  </template>

                  <template v-slot:after>
                    <div class="q-pa-md">
                      <div class="text-h4 q-mb-md">QUESTION</div>
                      <br>
                      <div v-for="read in reading_answer_3">
                        <p style="font-weight: bold;margin: 0">{{ read.title }}</p>
                        <div v-for="answer in read.answer.split(';')">
                          <input class="cursor-pointer" style="margin-right: 5px" type="radio"
                                 v-bind:value="answer.trim()"
                                 v-model="read.id" @change="checkAnswer()" :checked="answer == read.id"/>
                          <span>{{ answer }}</span>
                        </div>
                        <br>
                      </div>
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
            <p style="margin: 0;padding: 10px 10px">Please complete 3 task before submit</p>
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
              <q-card-section class="row" style="padding-top: 100px">
                <h4 style="text-align: center;text-transform: uppercase;width: 100%;color: white">Ready for the reading
                  exam.</h4>
                <div class="countdown absolute-center pre-countdown"
                     style="color: white;font-size: 20pt">
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
    name: "ReadingTest",
    data() {
      return {
        tab: 'task1',
        splitterModel: 50, // start at 50%
        reading_question_1: {},
        reading_question_2: {},
        reading_question_3: {},
        reading_answer_1: [],
        reading_answer_2: [],
        reading_answer_3: [],
        user_answer_1: [],
        user_answer_2: [],
        user_answer_3: [],
        pre_time: 0,
        start_time: 0,
        end_time: 0,
        confirm: false,
        isLoading: true,
        pre: true,
        lecture_id: 0,
      }
    },
    mounted() {
      this.checkExam();
    },
    methods: {
      endCallBack: async function () {
        await this.checkAnswer();
        await this.updateStatus();
        axios.post(process.env.API_URL + '/exam/update-time', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            window.location.href = '/listening-test'
          })
          .catch(error => {
            console.log(error.response)
          })
      },
      endPreCallBack: async function () {
        this.pre = false
      },
      checkExam() {
        axios.get(process.env.API_URL + '/reading', {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            this.reading_question_1 = response.data.reading_question_1;
            this.reading_question_2 = response.data.reading_question_2;
            this.reading_question_3 = response.data.reading_question_3;
            this.reading_answer_1 = response.data.reading_answer_1;
            this.reading_answer_2 = response.data.reading_answer_2;
            this.reading_answer_3 = response.data.reading_answer_3;
            this.pre_time = response.data.pre_time;
            this.start_time = response.data.start_time;
            this.end_time = response.data.end_time;
            this.lecture_id = response.data.lecture_id;
            if (response.data.reading_exam.reading_answer_1 != null) {
              let answer_1 = response.data.reading_exam.reading_answer_1.split(';');
              for (let i = 0; i < answer_1.length - 1; i++) {
                this.reading_answer_1[i].id = answer_1[i].trim();
              }
            }
            if (response.data.reading_exam.reading_answer_2 != null) {
              let answer_2 = response.data.reading_exam.reading_answer_2.split(';');
              for (let i = 0; i < answer_2.length - 1; i++) {
                this.reading_answer_2[i].id = answer_2[i].trim();
              }
            }
            if (response.data.reading_exam.reading_answer_3 != null) {
              let answer_3 = response.data.reading_exam.reading_answer_3.split(';');
              for (let i = 0; i < answer_3.length - 1; i++) {
                this.reading_answer_3[i].id = answer_3[i].trim();
              }
            }
            this.isLoading = false
          })
          .catch(error => {
            if (error.response.data.status == 0) {
              window.location.href = '/home'
            } else if (error.response.data.status == 1) {
              window.location.href = '/writing-test'
            } else if (error.response.data.status == 3) {
              window.location.href = '/listening-test'
            } else if (error.response.data.status == 4) {
              window.location.href = '/speaking-exam'
            }
          });
      },
      checkAnswer: async function () {
        let user_answer_1 = '';
        let user_answer_2 = '';
        let user_answer_3 = '';
        for (const ans_1 of this.reading_answer_1) {
          if (Number.isInteger(ans_1.id)) {
            ans_1.id = '';
          }
          user_answer_1 += ans_1.id + ";";
        }
        for (const ans_2 of this.reading_answer_2) {
          if (Number.isInteger(ans_2.id)) {
            ans_2.id = '';
          }
          user_answer_2 += ans_2.id + ";";
        }
        for (const ans_3 of this.reading_answer_3) {
          if (Number.isInteger(ans_3.id)) {
            ans_3.id = '';
          }
          user_answer_3 += ans_3.id + ";";
        }
        axios.post(process.env.API_URL + '/exam/update', {
          reading_answer_1: user_answer_1,
          reading_answer_2: user_answer_2,
          reading_answer_3: user_answer_3,
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
            window.location.href = '/listening-test'
          })
          .catch(error => {
            console.log(error.response)
          })
      },
      updateStatus() {
        db.collection("lecture").doc(this.lecture_id.toString())
          .update({
            status: 3
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
