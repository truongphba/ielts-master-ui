<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[20]"
      style="height: 800px"
    >

      <template v-slot:before>
        <div class="q-pa-md" style="max-width: 350px;">
          <q-list separator>
            <q-item>
              <q-item-section>Name: {{user.full_name}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Email: {{user.email}}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="q-gutter-sm" style="display: inline-flex">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://open.http.mp.streamamg.com/p/3000401/sp/300040100/thumbnail/entry_id/0_1blsoyqr/version/100000/acv/172/width/372/height/209"
                />

                <q-card-section>
                  <label style="text-transform: uppercase"><strong>Listening test</strong></label>
                  <q-separator />
                  The listening test will include 40 exercises, you will listen to 40 questions with different accents. In 30 minutes, you will have to answer the question to the examiner, who will be the judge to your points.
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  5:30PM
                </q-btn>
                <q-btn flat>
                  7:00PM
                </q-btn>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://open.http.mp.streamamg.com/p/3000401/sp/300040100/thumbnail/entry_id/0_1blsoyqr/version/100000/acv/172/width/372/height/209"
                />

                <q-card-section>
                  <label style="text-transform: uppercase"><strong>Reading test</strong></label>
                  <q-separator />
                  The reading test will take place in 40 minutes with 40 questions to test your reading skills.These skills include reading sections for the main grasping, reading for understanding key concepts, reading for detail memorization.
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  5:30PM
                </q-btn>
                <q-btn flat>
                  7:00PM
                </q-btn>
                <q-btn flat color="primary">
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
                  <label style="text-transform: uppercase"><strong>Writing test</strong></label>
                  <q-separator />
                  The writing test is divided into 2 tasks and you will have to complete it in 1 hour. Task 1 required your writing skills to describe charts, data or processes. In task 2, you will have to write about your opinion about
                  arguments, opinions.
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  5:30PM
                </q-btn>
                <q-btn flat>
                  7:00PM
                </q-btn>
                <q-btn flat color="primary">
                  Take an exam
                </q-btn>
              </q-card-actions>
            </q-card>

            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  src="https://open.http.mp.streamamg.com/p/3000401/sp/300040100/thumbnail/entry_id/0_1blsoyqr/version/100000/acv/172/width/372/height/209"
                />

                <q-card-section>
                  <label style="text-transform: uppercase"><strong>Speaking test</strong></label>
                  <q-separator />
                  In the speaking test, you will interact 1 on 1 with an examiner. The examiner will also be the judge on your points. They will as you some question. Focus on your spelling and grammar while taking the test.
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                  5:30PM
                </q-btn>
                <q-btn flat>
                  7:00PM
                </q-btn>
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
  name: "IeltsTest",
  data() {
    return {
      splitterModel: 20,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  props: ['user'],

  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.my-card{
  max-width: 500px;
  margin: 10px 50px 50px 50px;
}

</style>
