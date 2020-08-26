<template xmlns="http://www.w3.org/1999/html">
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div style="display: flex">
            <span class="text-h4 q-mb-md">WRITING SECTION</span>
            <q-space></q-space>
            <countdown></countdown>
          </div>
          <div v-html="write.content"></div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">

        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import axios from "axios";
import CountDownTime from "pages/CountDownTime";
export default {
  name: "WritingTest",
  data() {
    return {
      splitterModel: 50, // start at 50%
      timerCount: 30,
      write: []
    }
  },
  created() {
    axios.get(process.env.API_URL + '/writing/')
      .then(response => {
        console.log(response.data)
        this.write = response.data
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
