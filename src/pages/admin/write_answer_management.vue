<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Reading Question Management"
        :data="question"
        :hide-header="mode === 'grid'"
        :columns="questionColumns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
        binary-state-sort
      >
        <template v-slot:top-right="props">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{ mode === 'grid' ? 'List' : 'Grid' }}
            </q-tooltip>
          </q-btn>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="writing_id" :props="props">
              {{ props.row.writing_id }}
            </q-td>
            <q-td key="student_id" :props="props">
              {{ props.row.student_id }}
            </q-td>
            <q-td key="student_name" :props="props">
              {{ props.row.student_name }}
            </q-td>
            <q-td :style="{width: '1000px', whiteSpace: 'normal'}" key="answer" :props="props" v-html="props.row.answer">

            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at_format }}
            </q-td>
            <q-td key="updated_at" :props="props">
              {{ props.row.updated_at_format }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn color="red" label="Delete" size=sm no-caps @click="deleteDataQuestion(props.row)"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="success" persistent>
        <q-card>
          <q-card-section style="width: 350px; height: 100px">
            Update Success
          </q-card-section>
          <q-btn style="float: right" v-close-popup label="OK"></q-btn>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      filter: "",
      mode: "list",
      errors: [],
      selected_data: '',
      success: false,
      maximizedToggle: true,
      questionColumns: [
        {
          name: "id",
          required: true,
          label: "Answer ID",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "writing_id",
          required: true,
          label: "Writing ID",
          align: "left",
          field: "writing_id",
          sortable: true
        },
        {
          name: "student_id",
          required: true,
          label: "Student ID",
          align: "left",
          field: "student_id",
          sortable: true
        },
        {
          name: "student_name",
          required: true,
          label: "Student Name",
          align: "left",
          field: "student_name",
          sortable: true
        },
        {
          name: "answer",
          required: true,
          label: "Answer",
          align: "left",
          field: "answer",
          sortable: true
        },
        {
          name: "created_at",
          align: "left",
          label: "Created At",
          field: "created_at_format",
          sortable: true
        },
        {
          name: "updated_at",
          align: "left",
          label: "Updated At",
          field: "updated_at_format",
          sortable: true
        },
        {
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions"
        }
      ],
      question: [],
      pagination: {
        rowsPerPage: 10
      }
    };
  },

  created() {
    axios.get(process.env.API_URL + '/getWritingAnswer')
      .then(response => {
        console.log(response.data)
        this.question = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data
      })

  },

  methods: {
    deleteDataQuestion(data){
      if (confirm("Are you sure ?"))
      axios.post(process.env.API_URL + '/deleteWritingAnswer/' + data.id)
        .then(response => {
          this.editQuestion = false;
          this.success = true;
          axios.get(process.env.API_URL + '/getWritingAnswer')
            .then(response => {
              console.log(response.data)
              this.question = response.data
            })
            .catch(error => {
              console.log(error.response.data)
              this.errors = error.response.data
            })
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })
    },
  }

};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}

.error span {
  color: red;
}

.my-card {
  width: 100%;
  max-width: 700px;
}

.read_table tr > *:nth-child(1) {
  width: 6rem;
}
</style>
