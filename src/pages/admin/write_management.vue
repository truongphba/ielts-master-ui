<template>
  <q-page class="q-pa-sm">
    <q-card>
      <!--      listening table-->
      <q-table
        title="Reading Management"
        :data="write"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        table-class="read_table"
        :pagination="pagination"
        binary-state-sort
      >

        <template v-slot:top-right="props">
          <q-btn @click="new_write=true" outline color="primary" label="Add New" class="q-mr-xs"/>
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
            <q-td :style="{width: '1000px', whiteSpace: 'normal'}" key="content" :props="props" v-html="props.row.content">
            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at_format }}
            </q-td>
            <q-td key="updated_at" :props="props">
              {{ props.row.updated_at_format }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn color="green" label="Detail" size=sm no-caps @click="openDialog(props.row.id)"></q-btn>
              <q-btn color="blue" label="Edit" size=sm no-caps @click="editData(props.row)"></q-btn>
              <q-btn color="red" label="Delete" size=sm no-caps @click="deleteData(props.row.id)"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
<!--      <q-dialog v-model="confirm" persistent>-->
<!--        <q-card>-->
<!--          <q-card-section class="row items-center">-->
<!--            <span class="q-ml-sm" style="text-transform: uppercase; width: 300px">are you sure to submit !</span>-->
<!--          </q-card-section>-->
<!--          <q-card-actions align="right">-->
<!--            <q-btn flat label="Cancel" color="primary" v-close-popup />-->
<!--            <q-btn flat label="Confirm" color="primary"  />-->
<!--          </q-card-actions>-->
<!--        </q-card>-->
<!--      </q-dialog>-->
    </q-card>

    <!--    add new reading -->
    <q-dialog v-model="new_write">
      <q-card class="my-card flex-center">
        <q-card-section>
          <div class="text-h6">Add new writing</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form v-if="!success"
                  class="q-gutter-md"
                  @reset="onReset"
          >
            <q-editor
              filled
              v-model="add_write.content"
              label="Content"
            />

            <div>
              <q-btn label="Add" color="primary" @click="createNew"/>
              <q-btn label="Back" v-close-popup color="primary" flat class="q-ml-sm"/>
              <q-btn label="Reset" color="primary" type="reset" flat class="q-ml-sm"/>
            </div>
          </q-form>
          <q-dialog v-model="success" persistent>
            <q-card>
              <q-card-section style="width: 350px; height: 100px">
                Add Success
              </q-card-section>
              <q-btn style="float: right" v-close-popup label="OK"></q-btn>
            </q-card>
          </q-dialog>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--    update writing-->
    <q-dialog
      v-model="edit"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Edit Reading</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Content</label>
          <q-editor  filled v-model:v-html="selected_data.content" dense/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Update" @click="updateData(selected_data.id)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="success" persistent>
      <q-card>
        <q-card-section style="width: 350px; height: 100px">
          Update Success
        </q-card-section>
        <q-btn style="float: right" v-close-popup label="OK"></q-btn>
      </q-card>
    </q-dialog>

    <!--        writing answer page-->
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-black">
        <q-bar>
          <q-space/>

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <!--    writing answer table-->
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
          </q-card>
        </q-page>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      new_write: false,
      add_write: {
        content: ''
      },
      filter: "",
      mode: "list",
      success: false,
      errors: [],
      selected_data: '',
      edit: false,
      editQuestion: false,
      dialog: false,
      maximizedToggle: true,
      columns: [
        {
          name: "id",
          required: true,
          label: "Writing ID",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "content",
          required: true,
          label: "Content",
          align: "left",
          field: "content",
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
      write: [],
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
    axios.get(process.env.API_URL + '/getWrite/')
      .then(response => {
        console.log(response.data)
        this.write = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data
      })

  },

  methods: {
    openDialog(id) {
      axios.get(process.env.API_URL + '/getWritingAnswer/' + id)
        .then(response => {
          console.log(response.data)
          this.question = response.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data
        })
      this.dialog = true
    },
    editData(row) {
      // alert(row.id)
      // console.log(row)
      this.selected_data = row;
      this.edit = true;
    },
    createNew() {
      axios.post(process.env.API_URL + '/createWriting', {
        content: this.add_write.content
      })
        .then(response => {
          this.success = true;
          this.new_write = false;
          axios.get(process.env.API_URL + '/getWrite/')
            .then(response => {
              console.log(response.data)
              this.write = response.data
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

    updateData(id) {
      axios.post(process.env.API_URL + '/updateWriting/' + id, {
        content: this.selected_data.content
      })
        .then(response => {
          this.edit = false;
          this.success = true;
          axios.get(process.env.API_URL + '/getWrite/')
            .then(response => {
              console.log(response.data)
              this.write = response.data
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

    deleteData(id) {
      axios.post(process.env.API_URL + '/deleteWriting/' + id)
        .then(response => {
          this.edit = false;
          this.success = true;
          axios.get(process.env.API_URL + '/getWrite/')
            .then(response => {
              console.log(response.data)
              this.write = response.data
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

    deleteDataQuestion(data){
      axios.post(process.env.API_URL + '/deleteWritingAnswer/' + data.id)
        .then(response => {
          this.editQuestion = false;
          this.success = true;
          axios.get(process.env.API_URL + '/getWritingAnswer/' + data.writing_id)
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

    onReset() {
      this.add_write.content = null
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
