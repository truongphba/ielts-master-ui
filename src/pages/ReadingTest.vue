<template xmlns="http://www.w3.org/1999/html">
  <div>
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
                  <template slot="countdown" slot-scope="scope" >
                    <span>{{scope.props.minutes}} : </span>
                    <span>{{scope.props.seconds}}</span>
                  </template>
                </vue-countdown-timer>
              </div>
            </q-card>
          </div>
          <div v-html="read[0].content"></div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">QUESTION</div>
          <div v-for="read in read[1]">
            <br>
            <p style="font-weight: bold">{{ read.title }}</p>
            <div v-for="answer in read.answer.split(',')">
              <input class="cursor-pointer" style="margin-right: 5px;" type="radio" v-bind:value="answer" v-model="read.id"/>
              <span>{{answer}}</span>
            </div>
            <!--            <span>Picked: {{ read.reading_id }}</span>-->
          </div>
          <div>
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import axios from "axios";
import CountDownTime from "pages/CountDownTime";
export default {
  name: "ReadingTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      read: [],
      start_time: (new Date).getTime(),
      end_time: (new Date).getTime()+60000,
    }
  },
  created() {
    axios.get(process.env.API_URL + '/reading/')
      .then(response => {
        console.log(response.data)
        this.read = response.data
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
