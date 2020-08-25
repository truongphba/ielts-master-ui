<template xmlns="http://www.w3.org/1999/html">
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">READING PASSAGE</div>
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
              <input style="margin-right: 5px;" type="radio" v-bind:value="answer" v-model="read.id"/>
              <span>{{answer}}</span>
            </div>
            <!--            <span>Picked: {{ read.reading_id }}</span>-->
          </div>
          <div>
            {{timerCount}}
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReadingTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      read: [],
      timerCount: 30
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
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  }
}
</script>

<style scoped>


</style>
