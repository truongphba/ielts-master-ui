<template>
  <div>
        <div class="q-banner text-center relative-position">
        </div>

    <div class="q-pa-md" style="width: 1200px; margin: 20px auto">

      <q-table
        title="History"
        :data="history"
        :columns="columns"
        row-key="name"
        :filter="filter"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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
            <q-td key="student_name" :props="props">
              {{ props.row.student_name }}
            </q-td>
            <q-td key="write_point" :props="props">
              <div class="text-pre-wrap">{{ props.row.write_point }}</div>
            </q-td>
            <q-td key="speak_point" :props="props">
              <div class="text-pre-wrap">{{ props.row.speak_point }}</div>
            </q-td>
            <q-td key="created_at" :props="props">
              {{props.row.created_at_format}}
            </q-td>
            <q-td key="speak_comment" :props="props" v-html="props.row.speak_comment">
            </q-td>
            <q-td key="write_comment" :props="props" v-html="props.row.write_comment">
            </q-td>
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
  name: "LecturerTestHistory",
  data() {
    return {
      detail: false,
      filter: '',
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        { name: 'student_name', label: 'Student Name', field: 'student_name', sortable: true, align: 'left', },
        { name: 'speak_point', label: 'Speaking Point', field: 'speak_point', sortable: true, align: 'center', },
        { name: 'write_point', label: 'Writing Point', field: 'write_point', sortable: true, align: 'center', },
        { name: 'created_at', label: 'Ngày thi', field: 'created_at_format',sortable: true , align: 'left',},
        { name: 'speak_comment', label: 'Speaking Comment', field: 'speak_comment',sortable: true , align: 'left',},
        { name: 'write_comment', label: 'Writing Comment', field: 'write_comment',sortable: true , align: 'left',},
      ],
      history: [],
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

      axios.get(process.env.API_URL + '/lecturer-history/' + this.user.id)
        .then(response => {
          console.log(response.data)
          this.history = response.data
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

.q-banner {
  background: url("https://www.broadmindgroup.com/images/course-banners/ielts-banner-new.jpg") center;
  background-size: cover;
  height: 400px;
}
</style>
