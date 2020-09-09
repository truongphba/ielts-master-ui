<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Revenue</div>
                <div class="text-h5">$ {{ new Intl.NumberFormat().format(total) }} </div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="trending_up"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'blue_dark':'bg-blue-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Member</div>
                <div class="text-h5">{{ member.length }}</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="fas fa-chalkboard-teacher"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'orange_dark':'bg-orange-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Lecturer</div>
                <div class="text-h5">{{ lecture.length }}</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="fas fa-user-graduate"/>
              </div>
            </div>
          </q-card-section>

        </q-card>
      </div>
    </div>
    <div style="display: flex">
      <q-card flat bordered class="shadow q-pa-none q-ma-none" style="width: 780px; margin: 20px 10px 20px 12px ">
        <q-card-section class="row">
          <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="text-h6 col-12">Revenue By Day

          </div>
        </q-card-section>

        <q-separator class="full-width"></q-separator>

        <q-card-section v-if="revenue.length > 0">
          <line-chart :chartData="revenue" :options="chartOptions" :chart-colors="revenueChartColor"
                      label="Revenue"></line-chart>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="shadow q-pa-none q-ma-none" style="width: 780px; margin: 20px 2px 20px 10px">
        <q-card-section class="row">
          <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="text-h6 col-12">Revenue By Month

          </div>
        </q-card-section>

        <q-separator class="full-width"></q-separator>

        <q-card-section v-if="revenue_month.length > 0">
          <bar-chart :chartData="revenue_month" :options="chartOptions" :chart-colors="revenueChartColor"
                     label="Revenue"></bar-chart>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs">
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
            :class="$q.dark.isActive?'text-white':'text-black'"
          >
            <template v-slot:top-right="props">
              <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
              <q-btn icon="event" flat color="primary">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="filter">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup/>
                      <q-btn label="OK" color="primary" flat v-close-popup/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
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
                  + ${{ props.row.money }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at_format }}
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
import LineChart from "components/LineChart";
import BarChart from "components/BarChart";

export default {
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      lecture: [],
      member: [],
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
        rowsPerPage: 5
      },
      revenue: [],
      revenueChartColor: {
        borderColor: "#077187",
        pointColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F"
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      revenue_month: [],
    }
  },
  computed: {
    total() {
      return this.data.reduce(function (sum, item) {
        return sum + item.money
      }, 0)
    },
  },
  created() {
    this.getChartByDate()
    this.getChartByMonth()
    axios.get(process.env.API_URL + '/money/')
      .then(response => {
        console.log(response.data)
        this.data = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.errors
      })

    axios.get(process.env.API_URL + '/index')
      .then(response => {
        console.log(response.data)
        this.lecture = response.data.teacher
        this.member = response.data.student
      })
      .catch(error => {
        console.log(error.response.data)
      })
  },
  methods: {
    async getChartByDate() {
      const {data} = await axios.get(process.env.API_URL + '/getTotal/')
      data.forEach(d => {
        const date = d.date
        const {total} = d;
        this.revenue.push({date, total: total});
      })
    },
    async getChartByMonth() {
      const {data} = await axios.get(process.env.API_URL + '/getTotalMonth/')
      data.forEach(d => {
        const month = d.month
        const {total} = d;
        this.revenue_month.push({month, total: total});
        console.log(this.revenue_month)
      })
    }
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
