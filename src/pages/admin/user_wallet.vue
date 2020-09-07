<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-12">
        <q-card flat bordered class="bg-white">
          <q-table
            title=""
            :data="data"
            :hide-header="mode === 'grid'"
            :columns="columns"
            row-key="name"
            :grid="mode==='grid'"
            :filter="filter"
            :pagination.sync="pagination"
            :class="$q.dark.isActive?'text-white':'text-grey-8'"
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
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'"
              >
                <q-tooltip
                  :disable="$q.platform.is.mobile"
                  v-close-popup
                >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                </q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                v-if="!props.inFullscreen"
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
                <q-td key="user_name" :props="props">
                  {{ props.row.user_name }}
                </q-td>
                <q-td key="amount" :props="props">
                  {{ props.row.amount}}
                </q-td>
                <q-td key="status" :props="props">
                  {{ props.row.textStatus }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{props.row.format_created_at}}
                </q-td>
                <q-td key="updated_at" :props="props">
                  {{props.row.format_updated_at}}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn color="blue" label="Update" size=sm no-caps @click="editData(props.row)"></q-btn>
                  <q-btn color="red" label="Delete" size=sm no-caps @click="deleteData(props.row.id)"></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>

        <q-dialog
          v-model="edit"
          persistent
        >
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Status</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-select filled v-model="selected_data.textStatus" :options="status_opt" dense/>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn color="primary" label="Update" @click="updateData(selected_data.id)"/>
              <q-btn flat color="primary" label="Back" v-close-popup/>
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
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      success: false,
      status_opt: [
        "Pending", "Success"
      ],
      edit: false,
      filter: '',
      mode: 'list',
      selected_data: '',
      columns: [
        {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
        {
          name: 'user_name',
          required: true,
          label: 'Full Name',
          align: 'left',
          field: 'user_name',
          sortable: true
        },
        {name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true},
        {name: 'status', align: 'left', label: 'Status', field: 'textStatus', sortable: true},
        {
          name: 'created_at',
          align: 'left',
          label: 'Created Date',
          field: 'format_created_at',
          sortable: true
        },
        {
          name: 'updated_at',
          align: 'left',
          label: 'Updated At',
          field: 'format_updated_at',
          sortable: true
        },
        {
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions"
        }

      ],
      data: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  created() {
    axios.get(process.env.API_URL + '/getFundAdmin/')
      .then(response => {
        console.log(response.data)
        this.data = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.errors
      })

  },
  methods: {
    editData(row) {
      // alert(row.id)
      // console.log(row)
      // let index = this.data.indexOf(row);
      // console.log(index);
      this.selected_data = row;
      this.edit = true;

    },
    updateData(id) {
      axios.post(process.env.API_URL + '/updateFund/' + id, {
        textStatus: this.selected_data.textStatus
      })
        .then(response => {
          this.edit = false;
          this.success = true;
          axios.get(process.env.API_URL + '/getFundAdmin/')
            .then(response => {
              console.log(response.data)
              this.data = response.data
            })
            .catch(error => {
              console.log(error.response.data)
              this.errors = error.response.data.errors
            })
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })
    },
    deleteData(id) {
      if (confirm("Are you sure ?"))
        axios.post(process.env.API_URL + '/deleteFund/' + id)
          .then(response => {
            this.edit = false;
            this.success = true;
            axios.get(process.env.API_URL + '/getFundAdmin/')
              .then(response => {
                console.log(response.data)
                this.data = response.data
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
}
</script>

<style scoped>
.blue_dark {
  background-color: #082f56;
}

.green_dark {
  background-color: #084a0b;
}

.orange_dark {
  background-color: #64350e;
}
</style>
