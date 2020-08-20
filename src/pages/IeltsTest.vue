<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      :limits="[20]"
      style="height: 800px"
    >

      <template v-slot:before>
        <div class="q-pa-md" style="max-width: 350px;">
          <q-list separator v-for="user in users" :key="user.id">
            <q-item>
              <q-item-section>Name: {{user.name}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Email: {{user.email}}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <q-card style="max-width: 1000px; margin: 30px auto;">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="listening" label="Listening"/>
              <q-tab name="reading" label="Reading"/>
              <q-tab name="writing" label="Writing"/>
              <q-tab name="speaking" label="Speaking"/>
            </q-tabs>

            <q-separator/>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="listening">
                <q-list separator >
                  <q-item clickable v-ripple v-for="listen in getDataListen" :key="listen.id">{{listen.audio}}</q-item>
                </q-list>

                <div class="q-pa-lg flex flex-center">
                  <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(list_listen.length/totalPages)"
                    :input="true"
                    input-class="text-blue-10"
                  >
                  </q-pagination>
                </div>

              </q-tab-panel>

              <q-tab-panel name="reading">
                <q-list separator>
                  <q-item clickable v-ripple v-for="read in getDataRead" :key="read.id">{{ read.content }}</q-item>
                </q-list>

                <div class="q-pa-lg flex flex-center">
                  <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(list_read.length/totalPages)"
                    :input="true"
                    input-class="text-blue-10"
                  >
                  </q-pagination>
                </div>

              </q-tab-panel>

              <q-tab-panel name="writing">
                <q-list separator>
                  <q-item clickable v-ripple v-for="write in getDataWrite" :key="write.id">{{write.content}}</q-item>
                </q-list>

                <div class="q-pa-lg flex flex-center">
                  <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(list_write.length/totalPages)"
                    :input="true"
                    input-class="text-blue-10"
                  >
                  </q-pagination>
                </div>

              </q-tab-panel>

              <q-tab-panel name="speaking">
                <q-list separator>
                  <q-item clickable v-ripple v-for="speak in getDataSpeak" :key="speak.id">{{speak.content}}</q-item>
                </q-list>

                <div class="q-pa-lg flex flex-center">
                  <q-pagination
                    v-model="page"
                    :min="currentPage"
                    :max="Math.ceil(list_speak.length/totalPages)"
                    :input="true"
                    input-class="text-blue-10"
                  >
                  </q-pagination>
                </div>

              </q-tab-panel>
            </q-tab-panels>
          </q-card>
          <q-table class="table"
                   title="Test History"
                   style="max-width: 1000px; margin: 50px auto;"
                   :data="data"
                   :columns="columns"
                   row-key="name"
          />
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
      tab: 'listening',
      splitterModel: 20,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'STT',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {name: 'test_name', align: 'center', label: 'Tên bài test', field: 'test_name', sortable: true},
        {name: 'point', label: 'Điểm', field: 'point', sortable: true},
        {name: 'time', label: 'Ngày thi', field: 'time', sortable: true},
        {name: 'lecturer_name', label: 'Người chấm', field: 'lecturer_name', sortable: true},
        {name: 'comment', label: 'Nhận xét', field: 'comment'}
      ],
      data: [
        { id: 1,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 2,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 3,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'deo co'
        },
        { id: 4,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 5,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 6,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 7,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 8,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 9,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
        { id: 10,
          test_name: 'test1',
          point: 10,
          time: '20/10/2020',
          lecturer_name: 'duc',
          comment: 'ko co'
        },
      ],
      page: 1,
      currentPage:1,
      nextPage: null,
      totalPages:5,
      users: [
        { id: 1,
          name: 'Duc',
          email: 'duc@gmail.com'}
      ],
      errors: [],
      list_listen: [],
      list_read: [],
      list_speak: [],
      list_write: [],

    }
  },
  computed:{
    getDataListen(){
      return this.list_listen.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
    },
    getDataRead(){
      return 	this.list_read.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
    },
    getDataSpeak(){
      return 	this.list_speak.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
    },
    getDataWrite(){
      return 	this.list_write.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
    },
  },
  created() {
    this.getListListen()
    this.getListRead()
    this.getListWrite()
    this.getListSpeak()
  },
  methods: {
    getListListen() {
      axios.get('http://127.0.0.1:8000/api/ielts-test/listen')
        .then(response => {
          this.list_listen = response.data
        })
        .catch(error => {
          this.errors = error.response.data.errors.name
        })
    },
    getListRead(){
      axios.get('http://127.0.0.1:8000/api/ielts-test/read')
      .then(response => {
        this.list_read = response.data
      })
      .catch(error => {
        this.errors = error.response.data.errors.name
      })
    },
    getListSpeak(){
      axios.get('http://127.0.0.1:8000/api/ielts-test/speak')
        .then(response => {
          this.list_speak = response.data
        })
        .catch(error => {
          this.errors = error.response.data.errors.name
        })
    },
    getListWrite(){
      axios.get('http://127.0.0.1:8000/api/ielts-test/write')
        .then(response => {
          this.list_write = response.data
        })
        .catch(error => {
          this.errors = error.response.data.errors.name
        })
    }
  }
}
</script>

<style scoped>

</style>
