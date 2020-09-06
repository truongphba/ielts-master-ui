<template>
  <div v-if="isLoading" class="absolute-center">
    <q-spinner-hourglass
      color="purple"
      size="4em"
    />
  </div>
  <div v-else class="row items-start q-gutter-md q-pa-lg" style="padding-left: 20%;padding-right: 20%">
    <q-card class="my-card col-md-3" style="height: 400px">
      <img
        src="https://images.squarespace-cdn.com/content/v1/573e57871bbee0d6dea60fff/1551203818326-Y2YY9W2OHZT2R28UZ2UC/ke17ZwdGBToddI8pDm48kG87Sfbgg29A4BYEDq3OXvgUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcf4OxbJOyh_wHUnyc4kQLQ6SBshRGOku7c30Y_IRDNPta8R2IY5BHMaEj1zOWoDTZ/what-is-teacher-burnout.jpg">
      <q-card-section>
        <q-rating
          :value="lecture.votes"
          size="2em"
          :max="5"
          color="orange"
          readonly
        />
        <div class="text-h6">{{lecture.full_name}}</div>
        <b>Age: </b> {{lecture.age}}<br>
        <b>Email: </b> {{lecture.email}}<br>
        <b>Certificate: </b> {{lecture.certificate}}<br>

      </q-card-section>
      <q-card-section class="q-pt-none">

      </q-card-section>
    </q-card>
    <q-card class="my-card col-md-8">
      <q-img height="400px" src="https://cdn.quasar.dev/img/parallax2.jpg">
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
    <q-dialog v-model="pre" persistent full-width full-height>
      <q-card class="bg-teal">
        <q-card-section class="row" style="padding-top: 30px">
          <h4 style="text-align: center;text-transform: uppercase;width: 100%;color: white">Ready for the reading
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
    <q-dialog v-model="checkMark" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Checking Your Exam Mark</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-if="marked">
            <q-spinner-comment
              color="primary"
              size="2em"
            />
            <q-tooltip :offset="[0, 8]">QSpinnerComment</q-tooltip>
            The test is being graded, please wait.
          </div>
          <div v-else>
            <q-markup-table>
              <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-right">Point</th>
                <th class="text-right">Comment</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="text-left">Reading</td>
                <td class="text-right">{{read_point}}</td>
                <td class="text-right"></td>
              </tr>
              <tr>
                <td class="text-left">Listening</td>
                <td class="text-right">{{listen_point}}</td>
                <td class="text-right"></td>
              </tr>
              <tr>
                <td class="text-left">Writing</td>
                <td class="text-right">{{write_point}}</td>
                <td style="min-width: 150px" class="text-right">{{write_comment}}</td>
              </tr>
              <tr>
                <td class="text-left">Speaking</td>
                <td class="text-right">{{speak_point}}</td>
                <td class="text-right">{{speak_comment}}</td>
              </tr>
              </tbody>
            </q-markup-table>
            <div style="margin: 10px 10%;border-bottom: solid 1px gray"></div>
            <div class="q-pa-xs">
              <div class="column">
                <b class="text-center" style="margin: 0">Vote for your lecture</b>
                <q-rating class="flex-center"
                          v-model="rating"
                          size="2em"
                          color="orange"
                          @click="submitVote()"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import firebase from "src/api/firebaseConfig"

  const db = firebase.firestore()
  export default {
    name: 'SpeakingExam',
    data() {
      return {
        lecture: {},
        pre_time: 0,
        start_time: 0,
        end_time: 0,
        confirm: false,
        isLoading: true,
        pre: true,
        checkMark: false,
        marked: false,
        read_point: 0,
        listen_point: 0,
        write_point: 0,
        speak_point: 0,
        write_comment: '',
        speak_comment: '',
        rating: 0
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
        this.checkMark = true;
      },
      endPreCallBack: async function () {
        this.pre = false
      },
      getData() {
        db.collection("lecture").where("member_id", "==", this.user.id)
          .onSnapshot(snap => {
            let data = [];
            snap.forEach(doc => {
              data.push({
                lectureId: doc.data().lecture_id,
                status: doc.data().status,
              })
            })

            if (data.length > 0) {

              axios.get(process.env.API_URL + '/user/' + data[0].lectureId)
                .then(response => {
                  this.lecture = response.data.user
                })
                .catch(error => {
                  console.log(error)
                })

              if (data[0].status == 5) {
                axios.get(process.env.API_URL + '/get-result', {
                  headers: {Authorization: this.$getCookie('Authorization')}
                })
                  .then(response => {
                    this.read_point = response.data.result.read_point;
                    this.listen_point = response.data.result.listen_point;
                    this.write_point = response.data.result.write_point;
                    this.speak_point = response.data.result.speak_point;
                    this.write_comment = response.data.result.write_comment;
                    this.speak_comment = response.data.result.speak_comment;
                    this.checkMark = true;
                    this.marked = false;
                  })
                  .catch(error => {
                    console.log(error)
                  });

              }
            } else {
              window.location.href = '/home'
            }

            axios.get(process.env.API_URL + '/speaking', {
              headers: {Authorization: this.$getCookie('Authorization')}
            })
              .then(response => {
                this.pre_time = response.data.pre_time;
                this.start_time = response.data.start_time;
                this.end_time = response.data.end_time;
                this.isLoading = false
              })
              .catch(error => {
                if (error.response.data.status == 1) {
                  window.location.href = '/writing-test'
                } else if (error.response.data.status == 2) {
                  window.location.href = '/reading-test'
                } else if (error.response.data.status == 3) {
                  window.location.href = '/listening-test'
                }
              });

          });
      },
      submitVote() {
        axios.post(process.env.API_URL + '/vote', {
          lecture_id: this.lecture.id,
          rating: this.rating,
          member_id : this.user.id
        })
          .then(response => {
            db.collection("lecture").doc(this.lecture.id.toString())
              .update({
                status: 6,
                member_id: null
              }).then(response => {
              window.location.href = '/home'
            })
          })
          .catch(error => {
            console.log(error)
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
