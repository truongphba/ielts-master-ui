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
            <q-td key="position" :props="props">
              <span>{{ props.row.position }}</span>
            </q-td>
            <q-td key="balance" :props="props">
              <span>{{ props.row.balance }}</span>
            </q-td>
            <q-td key="status" :props="props">
              <span>{{ props.row.textStatus }}</span>
            </q-td>
            <q-td key="created_at" :props="props">
              <span>{{ props.row.format_created_at }}</span>
            </q-td>
            <q-td key="updated_at" :props="props">
              <span>{{ props.row.format_updated_at }}</span>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn color="blue" label="Update" size=sm no-caps @click="editData(props.row)"></q-btn>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </q-card>

    <!--    add user-->
    <q-dialog v-model="new_user">
      <q-card class="my-card flex-center">
        <q-card-section>
          <div class="text-h6">Add new user</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form v-if="!success"
                  class="q-gutter-md"
                  @reset="onReset"
          >
            <q-input
              filled
              v-model="user.name"
              label="Username *"
            />
            <div class="error" v-if="errors.name && errors.name.length">
              <span>{{ errors.name[0] }}</span>
              <hr>
            </div>
            <q-input
              filled
              v-model="user.email"
              label="Email *"
            />
            <div class="error" v-if="errors.email && errors.email.length">
              <span>{{ errors.email[0] }}</span>
              <hr>
            </div>
            <q-input
              filled
              v-model="user.full_name"
              label="Full Name"
            />
            <q-input
              filled
              type="number"
              v-model="user.age"
              label="Age"
            />
            <div class="error" v-if="errors.age && errors.age.length">
              <span>{{ errors.age[0] }}</span>
              <hr>
            </div>
            <q-input v-if="user.is_lecture"
                     v-model="user.certificate"
                     filled
                     type="textarea"
                     label="Certificate *"
            />
            <div class="error" v-if="errors.certificate && errors.certificate.length">
              <span>{{ errors.certificate[0] }}</span>
              <hr>
            </div>
            <q-input
              filled
              type="password"
              v-model="user.password"
              autocomplete="new-password"
              label="Password *"
            />
            <div class="error" v-if="errors.password && errors.password.length">
              <span>{{ errors.password[0] }}</span>
              <hr>
            </div>
            <q-toggle
              v-model="user.is_lecture"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Add user as lecturer"
            />
            <div align="right">
              <q-btn label="Register" color="primary" @click="register"/>
              <q-btn label="Reset" color="primary" @click="onReset" flat class="q-ml-sm"/>
              <q-btn label="Back" v-close-popup color="primary" flat class="q-ml-sm"/>
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

    <!--    update user-->
    <q-dialog
      v-model="edit"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Edit user</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Username</label>
          <q-input filled v-model="selected_data.name" dense/>
          <div class="error" v-if="errors.name && errors.name.length">
            <span>{{ errors.name[0] }}</span>
            <hr>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Full Name</label>
          <q-input filled v-model="selected_data.full_name" dense/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Email</label>
          <q-input filled v-model="selected_data.email" dense/>
          <div class="error" v-if="errors.email && errors.email.length">
            <span>{{ errors.email[0] }}</span>
            <hr>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Age</label>
          <q-input filled v-model="selected_data.age" dense/>
          <div class="error" v-if="errors.age && errors.age.length">
            <span>{{ errors.age[0] }}</span>
            <hr>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Certificate</label>
          <q-input filled v-model="selected_data.certificate" dense/>
          <div class="error" v-if="errors.certificate && errors.certificate.length">
            <span>{{ errors.certificate[0] }}</span>
            <hr>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Position</label>
          <q-select filled v-model="selected_data.position" :options="lecturer_opt" dense/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Status</label>
          <q-select filled v-model="selected_data.textStatus" :options="status_opt" dense/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label>Balance</label>
          <q-input filled v-model="selected_data.balance" dense/>
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
      success: false,
      errors: [],
      selected_data: '',
      edit: false,
      status_opt: [
        "Active", "Deactive", "Lock"
      ],
      lecturer_opt: [
        "Lecturer", "Student", "Admin"
      ],
      user: {
        name: '',
        email: '',
        full_name: '',
        certificate: '',
        age: '',
        password: '',
        is_lecture: false,
      },
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
        // {
        //   name: "balance",
        //   align: "left",
        //   label: "Balance",
        //   field: "balance",
        //   sortable: true
        // },
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
          field: "format_created_at",
          sortable: true
        },
        {
          name: "updated_at",
          align: "left",
          label: "Updated Date",
          field: "format_updated_at",
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
        console.log(response.data)
        this.users = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data
      })

  },

  methods: {
    register() {
      axios.post(process.env.API_URL + '/createUser', {
        name: this.user.name,
        full_name: this.user.full_name,
        email: this.user.email,
        password: this.user.password,
        age: this.user.age,
        certificate: this.user.certificate,
        is_lecture: this.user.is_lecture
      })
        .then(response => {
          this.success = true;
          this.new_user = false;
          this.errors = ''
          this.user.name = ''
          this.user.full_name = ''
          this.user.email = ''
          this.user.password = ''
          this.user.age = ''
          this.user.certificate = ''
          this.user.is_lecture = false
          axios.get(process.env.API_URL + '/getUser/')
            .then(response => {
              console.log(response.data)
              this.users = response.data
            })
            .catch(error => {
              console.log(error.response.data)
              this.errors = error.response.data
            })
        })
        .catch(error => {
          this.errors = error.response.data.errors
        })
    },
    onReset() {
      this.errors= ''
      this.user.name = null
      this.user.full_name = null
      this.user.email = null
      this.user.password = null
      this.user.age = null
      this.user.certificate = null
    },
    editData(row) {
      // alert(row.id)
      // console.log(row)
      // let index = this.data.indexOf(row);
      // console.log(index);
      this.selected_data = row;
      this.edit = true;

    },

    updateData(id) {
      axios.post(process.env.API_URL + '/updateUser/' + id, {
        name: this.selected_data.name,
        full_name: this.selected_data.full_name,
        email: this.selected_data.email,
        age: this.selected_data.age,
        certificate: this.selected_data.certificate,
        balance: this.selected_data.balance,
        position: this.selected_data.position,
        textStatus: this.selected_data.textStatus
      })
        .then(response => {
          this.edit = false;
          this.success = true;
        })
        .catch(error => {
          console.log(error.response.data)
          this.errors = error.response.data.errors
        })
    }
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
</style>
