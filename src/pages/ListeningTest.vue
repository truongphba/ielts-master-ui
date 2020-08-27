<template xmlns="http://www.w3.org/1999/html">
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div style="display: flex">
            <span class="text-h4 q-mb-md">LISTENING SECTION</span>
            <q-space></q-space>
            <div class="absolute countdown" style="color: white;font-size: 10pt">
              <vue-countdown-timer
                @start_callback="startCallBack('event started')"
                @end_callback="endCallBack('event ended')"
                :start-time="start_time"
                :end-time="end_time"
                :end-text="'00 : 00'"
                label-position="begin"
              >
                <template slot="countdown" slot-scope="scope" >
                  <span>{{scope.props.minutes}} : </span>
                  <span>{{scope.props.seconds}}</span>
                </template>
              </vue-countdown-timer>
            </div>
          </div>

          <audio controls>
            <source v-bind:src="listen[0].audio" type="audio/ogg">
          </audio>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">QUESTION</div>
          <div v-for="test in listen[1]">
            <br>
            <p style="font-weight: bold">{{ test.title }}</p>
            <div v-for="answer in test.answer.split(';')">
              <input class="cursor-pointer" style="margin-right: 5px;" type="radio" v-bind:value="answer" v-model="test.id"/>
              <span>{{answer}}</span>
            </div>
          </div>
          <br>
          <q-btn label="Submit" color="primary" @click="confirm = true" />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm" style="text-transform: uppercase; width: 300px">are you sure to submit !</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Submit" color="primary" @click="checkAnswer"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="detail" persistent>
            <q-card>
              <q-bar>
                <q-space />
              </q-bar>
              <q-card-section style="width: 350px; height: 100px">
                Your point: {{point}}
              </q-card-section>
              <q-btn style="float: right" to="/ielts-test" label="OK"></q-btn>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListeningTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      listen: [],
      start_time: (new Date).getTime(),
      end_time: (new Date).getTime()+60000,
      answer: [],
      point: 0,
      detail: false,
      confirm: false,
    }
  },
  props: ['user'],
  created() {
    axios.get(process.env.API_URL + '/listening/')
      .then(response => {
        console.log(response.data)
        this.listen = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data
      })

  },
  methods: {
    startCallBack: function (x) {
      console.log(x)
    },
    endCallBack: async function (x) {
      this.point = 0;
      this.answer = [];
      for (const ans of this.listen[1]) {
        await this.answer.push(ans.id);
      }
      for (let i = 0; i < this.answer.length; i++) {
        if (this.listen[1][i].correct_answer == this.answer[i]){
          this.point++;
        }
      }
      axios.post(process.env.API_URL +'/storeListen',{
        student_id: this.user.id,
        point: this.point
      })
        .then(response => {
          this.success = true;
        })
        .catch(error => {
          this.errors = error.response.data
        })
      this.detail = true
    },
    checkAnswer: async function (){
      this.point = 0;
      this.answer = [];
      for (const ans of this.listen[1]) {
        await this.answer.push(ans.id);
      }
      for (let i = 0; i < this.answer.length; i++) {
        if (this.listen[1][i].correct_answer == this.answer[i]){
         this.point++;
        }
      }
      axios.post(process.env.API_URL +'/storeListen',{
        student_id: this.user.id,
        point: this.point
      })
        .then(response => {
          this.success = true;
        })
        .catch(error => {
          this.errors = error.response.data
        })
      this.detail = true
    }
  }
}
</script>

<style scoped>
.countdown{
  justify-content: center;
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.47);
  border-radius: 50%!important;
  right: 10px;
}
.countdown span{
  font-size: 10pt;
  color: white;
}

</style>
