<template>
  <div class="row items-start q-gutter-md q-pa-lg" style="padding-left: 20%;padding-right: 20%">
    <q-card class="my-card col-md-3" style="height: 400px">
      <img  src="https://images.squarespace-cdn.com/content/v1/573e57871bbee0d6dea60fff/1551203818326-Y2YY9W2OHZT2R28UZ2UC/ke17ZwdGBToddI8pDm48kG87Sfbgg29A4BYEDq3OXvgUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcf4OxbJOyh_wHUnyc4kQLQ6SBshRGOku7c30Y_IRDNPta8R2IY5BHMaEj1zOWoDTZ/what-is-teacher-burnout.jpg">
      <q-card-section>
        <q-rating
          :value="5"
          size="2em"
          :max="5"
          color="orange"
          readonly
        />
        <div class="text-h6">Linh</div>
        <b>Age: </b> 25<br>
        <b>Email: </b> linh@gmail.com<br>
        <b>Certificate: </b> 10.0 Ielts
      </q-card-section>
      <q-card-section class="q-pt-none">

      </q-card-section>
    </q-card>
    <q-card class="my-card col-md-8">
      <q-img height="400px" src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="text-h5 absolute-top text-center">
          {{listening_question}}
        </div>
      </q-img>
      <div class="absolute-center countdown" style="color: white;font-size: 30pt">
        <vue-countdown-timer
          @start_callback="startCallBack('event started')"
          @end_callback="endCallBack('event ended')"
          :start-time="start_time"
          :end-time="end_time"
          :end-text="'Time\'s up!'"
          label-position="begin"
          >
          <template slot="countdown" slot-scope="scope" >
            <span>{{scope.props.minutes}} : </span>
            <span>{{scope.props.seconds}}</span>
          </template>
        </vue-countdown-timer>
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "src/firebase"
const db = firebase.firestore()
export default {
  name: 'Timer',
  data() {
    return {
      listening_question: '',
      start_time: (new Date).getTime(),
      end_time: (new Date).getTime()+5000,
      lecture: []
    }
  },
  created() {
    axios.get(process.env.API_URL + '/speaking-question')
      .then(response => {
        this.listening_question = response.data.speaking_question
      })
      .catch(error => {
        console.log(error.response.data)
      })
    db.collection("lecture")
      .onSnapshot(snap => {
        snap.forEach(doc => {
          this.lecture.push({
            id: doc.id,
            lectureId: doc.data().id,
            status: doc.data().status
          });
        });
      })
  },
  methods: {
    startCallBack: function (x) {
      console.log(x)
    },
    endCallBack: function (x) {

    }
  }
}

</script>

<style scoped>
.countdown{
  justify-content: center;
  display: flex;
  align-items: center;
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.47);
  border-radius: 50%!important;
}
.countdown span{
  font-size: 35pt;
  font-family: 'Anton', sans-serif;
 color: white;
}
</style>
