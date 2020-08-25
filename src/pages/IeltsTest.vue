<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="20"
      style="height: 800px"
    >

      <template v-slot:before>
        <div class="q-pa-md" style="max-width: 350px;">
          <q-list separator>
            <q-item>
              <q-item-section>Full Name: {{ user.full_name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Age: {{ user.age }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Email: {{ user.email }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="q-gutter-sm" style="display: inline-flex;">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://elingo.edu.vn/wp-content/uploads/2017/05/ielts-listening-section-experience.png"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Listening test</strong></span>
                  <q-separator/>
                  The listening test will include 40 exercises, you will listen to 40 questions with different accents.
                  In 30 minutes, you will have to answer the question to the examiner, who will be the judge to your
                  points.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="listen.length > 0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ listen[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://onthiielts.com.vn/wp-content/uploads/2019/09/image3-1.png"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Reading test</strong></span>
                  <q-separator/>
                  The reading test will take place in 40 minutes with 40 questions to test your reading skills.These
                  skills include reading sections for the main grasping, reading for understanding key concepts, reading
                  for detail memorization.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px" v-if="read.length > 0">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ read[0].point }}</strong></span>
                </q-card-section>
                <q-space></q-space>
                <q-btn to="/reading-test" flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>

          <div class="q-gutter-sm" style="display: inline-flex">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://open.http.mp.streamamg.com/p/3000401/sp/300040100/thumbnail/entry_id/0_1blsoyqr/version/100000/acv/172/width/372/height/209"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Writing test</strong></span>
                  <q-separator/>
                  The writing test is divided into 2 tasks and you will have to complete it in 1 hour. Task 1 required
                  your writing skills to describe charts, data or processes. In task 2, you will have to write about
                  your opinion about
                  arguments, opinions.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section v-if="write.length > 0" style="padding: 8px">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ write[0].point }}</strong></span>
                  </q-card-section>
                  <q-space></q-space>
                  <q-btn flat color="primary">
                    Take an exam
                  </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://nativespeaker.vn/resource/images/luyen-ielts-speaking-8.jpg"
                />

                <q-card-section>
                  <span style="text-transform: uppercase"><strong>Speaking test</strong></span>
                  <q-separator/>
                  In the speaking test, you will interact 1 on 1 with an examiner. The examiner will also be the judge
                  on your points. They will as you some question. Focus on your spelling and grammar while taking the
                  test.
                </q-card-section>
              </q-card-section>

              <q-separator/>

              <q-card-actions>
                <q-card-section style="padding: 8px">
                  <span style="text-transform: uppercase;"><strong>latest test results</strong> - <strong
                    style="color: red">{{ speak[0].point }}</strong></span>

                  </q-card-section>
                  <q-space></q-space>
                  <q-btn flat color="primary">
                    Take an exam
                  </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </template>

    </q-splitter>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      splitterModel: 20,
      listen: [],
      speak: [],
      read: [],
      write: [],
    }
  },
  props: ['user'],
  watch: {
    user() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(process.env.API_URL + '/listenHistory/' + this.user.id)
        .then(response => {
          console.log(response.data)
          this.listen = response.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })

      axios.get(process.env.API_URL + '/readHistory/' + this.user.id)
        .then(response => {
          console.log(response.data)
          this.read = response.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })

      axios.get(process.env.API_URL + '/speakHistory/' + this.user.id)
        .then(response => {
          console.log(response.data)
          this.speak = response.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })

      axios.get(process.env.API_URL + '/writeHistory/' + this.user.id)
        .then(response => {
          console.log(response.data)
          this.write = response.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })
    }
  }

}
</script>

<style scoped>
.my-card {
  max-width: 500px;
  margin: 15px 50px 50px 50px;
}

</style>
