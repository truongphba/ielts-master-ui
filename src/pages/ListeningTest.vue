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
            <countdown></countdown>
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
            <div v-for="answer in test.answer.split(',')">
              <input style="margin-right: 5px;" type="radio" v-bind:value="answer" v-model="test.id"/>
              <span>{{answer}}</span>
            </div>
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
  name: "ListeningTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      timerCount: 30,
      listen: []
    }
  },
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
  components: {
    'countdown': CountDownTime
  }
}
</script>

<style scoped>


</style>
