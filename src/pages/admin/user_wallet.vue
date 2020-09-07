<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-12">
        <q-card flat bordered class="bg-white">
          <q-table
            title="All Activities"
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
                <q-td key="student_name" :props="props">
                  {{ props.row.student_name }}
                </q-td>
                <q-td key="lecture_name" :props="props">
                  {{ props.row.lecture_name }}
                </q-td>
                <q-td style="color: green" key="revenue" :props="props">
                  +{{ props.row.money }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{props.row.created_at_format}}
                </q-td>

              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filter: '',
      mode: 'list',

      columns: [
        {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
        {
          name: 'student_name',
          required: true,
          label: 'Student',
          align: 'left',
          field: 'student_name',
          sortable: true
        },
        {name: 'lecture_name', align: 'left', label: 'Lecturer', field: 'lecture_name', sortable: true},
        {name: 'revenue', align: 'left', label: 'Revenue', field: 'money', sortable: true},
        {
          name: 'created_at',
          align: 'left',
          label: 'Creation Date',
          field: 'created_at_format',
          sortable: true
        },

      ],
      data: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },

  created() {
    axios.get(process.env.API_URL + '/money/')
      .then(response => {
        console.log(response.data)
        this.data = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.errors
      })

  },
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
