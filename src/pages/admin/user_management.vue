<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="User Management"
        :data="users"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
        binary-state-sort
      >

        <template v-slot:top-right="props">
          <q-btn @click="new_user=true" outline color="primary" label="Add New" class="q-mr-xs"/>
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
            <q-td key="username" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="full_name" :props="props">
              <div class="text-pre-wrap">{{ props.row.full_name }}</div>
            </q-td>
            <q-td key="email" :props="props">
              <div class="text-pre-wrap">{{ props.row.email }}</div>
            </q-td>
            <q-td key="age" :props="props">
              {{ props.row.age }}
            </q-td>
            <q-td key="certificate" :props="props">
              {{ props.row.certificate }}
            </q-td>
            <q-td key="position" :props="props" v-if="props.row.is_lecture === 1 && props.row.is_admin === 0">
              <span>Lecturer</span>
            </q-td>
            <q-td key="position" :props="props" v-if="props.row.is_lecture === 0 && props.row.is_admin === 0">
              <span>Student</span>
            </q-td>
            <q-td key="position" :props="props" v-if="props.row.is_admin === 1 && props.row.is_lecture === 0">
              <span>Admin</span>
            </q-td>
            <q-td key="balance" :props="props">
              <span>{{ props.row.balance }}</span>
            </q-td>
            <q-td key="status" :props="props" v-if="props.row.status === 1">
              <span>Active</span>
            </q-td>
            <q-td key="status" :props="props" v-if="props.row.status === 0">
              <span>Deactive</span>
            </q-td>
            <q-td key="status" :props="props" v-if="props.row.status === -1">
              <span>Lock</span>
            </q-td>
            <q-td key="created_at" :props="props">
              <span>{{ props.row.format_date }}</span>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn color="blue" label="Update" size=sm no-caps></q-btn>
              <q-btn color="red" label="Delete" size=sm no-caps></q-btn>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </q-card>
    <q-dialog v-model="new_user">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Add new user
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Customer Name</q-item-label>
                  <q-input dense outlined  label="Customer Name"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">City</q-item-label>
                  <q-input dense outlined  label="City"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">State</q-item-label>
                  <q-input dense outlined label="State"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last Call</q-item-label>
                  <q-input
                    dense
                    outlined

                    mask="date"
                    label="Last Call"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date

                            @input="() => $refs.lastCallProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn label="Save" type="submit" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      new_user: false,
      filter: "",
      mode: "list",
      columns: [
        {
          name: "id",
          required: true,
          label: "User ID",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "username",
          required: true,
          label: "Username",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "full_name",
          align: "left",
          label: "Full Name",
          field: "full_name",
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "age",
          align: "left",
          label: "Age",
          field: "age",
          sortable: true
        },
        {
          name: "certificate",
          align: "left",
          label: "Certificate",
          field: "certificate",
          sortable: true
        },
        {
          name: "position",
          align: "left",
          label: "Position",
          field: "is_lecture",
          sortable: true
        },
        {
          name: "balance",
          align: "left",
          label: "Balance",
          field: "balance",
          sortable: true
        },
        {
          name: "status",
          align: "left",
          label: "Status",
          field: "status",
          sortable: true
        },
        {
          name: "created_at",
          align: "left",
          label: "Created Date",
          field: "format_date",
          sortable: true
        },
        {
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions"
        }
      ],
      users: [],
      pagination: {
        rowsPerPage: 10
      }
    };
  },

  created() {
    axios.get(process.env.API_URL + '/getUser/')
      .then(response => {
        // console.log(response.data)
        this.users = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data
      })

  },


};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
