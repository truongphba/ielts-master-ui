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
          <div v-for="(read, index) in read[1]">
            <br>
            <p style="font-weight: bold">{{read.title}}</p>
            <div v-for="(read, index) in read.answer.split(',')">
<!--              <template>-->
<!--                <div class="q-pa-lg">-->
<!--                  <q-option-group-->
<!--                    v-model="group"-->
<!--                    :options="options"-->
<!--                    color="primary"-->
<!--                  />-->
<!--                </div>-->
<!--              </template>-->
              <input type="radio"
                     id=""
                     name="portalSelect"
                     v-bind:value="read"
                     v-model="newReadSelect"
                     v-on:change="showSellers"
                    >
              <label >{{read}}</label>

<!--              <q-radio v-model="shape" val="" label="" />{{read}}-->
            </div>

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
  data () {
    return {
      splitterModel: 50, // start at 50%
      read: [],
      shape: 'line',
    }
  },
  created() {
    axios.get(process.env.API_URL +'/reading/')
      .then(response => {
        console.log(response.data)
        this.read = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.errors
      })
  }
}
</script>

<style scoped>

</style>
