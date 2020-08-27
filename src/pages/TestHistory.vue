<template>
  <div>
    <!--    <div class="q-banner text-center relative-position">-->
    <!--      <div class="q-pa-md q-gutter-sm absolute-center">-->
    <!--        <q-btn color="red" label="Get Exam" size="xl"/>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="q-pa-md" style="width: 1200px; margin: 20px auto">
      <div class="q-gutter-sm" style="display: flex;">

        <q-table
          title="Listening"
          :data="listen"
          :columns="columns"
          row-key="name"
          :filter="listenFilter"
          style="width: 600px; margin-right: 20px"
        >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="listenFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        </q-table>

        <q-table
          title="Reading"
          :data="read"
          :columns="columns"
          row-key="name"
          :filter="readFilter"
          style="width: 600px;"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="readFilter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </div>

    <div class="q-pa-md" style="width: 1200px; margin: 20px auto">

      <q-table
        title="Speaking"
        :data="speak"
        :columns="speakColumns"
        row-key="name"
        :filter="speakFilter"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="speakFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <div class="q-pa-md" style="width: 1200px; margin: 20px auto">
      <q-table
        title="Writing"
        :data="write"
        :columns="writeColumns"
        row-key="name"
        :filter="writeFilter"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="writeFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}

            </q-td>
            <q-td key="lecture_name" :props="props">
              {{ props.row.lecture_name }}
            </q-td>
            <q-td key="point" :props="props">
              <div class="text-pre-wrap">{{ props.row.point }}</div>
            </q-td>
            <q-td key="created_at" :props="props">
              {{props.row.created_at}}
            </q-td>
            <q-td key="answer" :props="props">
              <q-btn flat style="text-transform: none"  label="Detail" @click="detail = true" />
              <q-dialog v-model="detail" persistent>
                <q-card>
                  <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                      <q-tooltip>Close</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <q-card-section>
                    {{props.row.answer}}
                  </q-card-section>
                </q-card>
              </q-dialog>
            </q-td>
            <q-td key="comment" :props="props">{{ props.row.comment }}</q-td>
          </q-tr>
        </template>
      </q-table>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {date} from "quasar";
export default {
  name: "TestHistory",
  data() {
    return {
      detail: false,
      readFilter: '',
      listenFilter: '',
      speakFilter: '',
      writeFilter: '',
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        { name: 'point', label: 'Điểm', field: 'point', sortable: true },
        { name: 'created_at', label: 'Ngày thi', field: 'created_at',sortable: true ,format: val=>date.formatDate(val, 'DD-MM-YYYY') },
      ],
      speakColumns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        { name: 'lecture_name', label: 'Người chấm', field: 'lecture_name', sortable: true },
        { name: 'point', label: 'Điểm', field: 'point', sortable: true },
        { name: 'created_at', label: 'Ngày thi', field: 'created_at',sortable: true ,format: val=>date.formatDate(val, 'DD-MM-YYYY') },
        { name: 'comment', label: 'Nhận xét', field: 'comment',sortable: true ,},
      ],
      writeColumns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        { name: 'lecture_name', label: 'Người chấm', field: 'lecture_name', sortable: true },
        { name: 'point', label: 'Điểm', field: 'point', sortable: true },
        { name: 'created_at', label: 'Ngày thi', field: 'created_at',sortable: true ,format: created_at=>date.formatDate(created_at, 'DD-MM-YYYY') },
        { name: 'answer', label: 'Bài thi', field: 'answer'},
        { name: 'comment', label: 'Nhận xét', field: 'comment'},
      ],
      listen: [],
      read: [],
      speak: [],
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
.table {
  margin-bottom: 40px;
}

/*.q-banner {*/
/*  !*background: url("https://insenglish.org/wp-content/uploads/2018/05/banner-IELTS.jpg") center;*!*/
/*  background-size: cover;*/
/*  height: 300px;*/
/*}*/
</style>
