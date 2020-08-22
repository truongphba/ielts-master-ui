<template>
  <div>
    <div class="q-banner text-center relative-position">
      <div class="q-pa-md q-gutter-sm absolute-center">
        <q-btn color="red" label="Get Exam" size="xl"/>
      </div>
    </div>
    <div class="q-pa-md" style="max-width: 1200px; margin: 20px auto">
      <q-markup-table>
        <thead>
        <div style="margin-top: 10px; margin-bottom: 10px" class="text-h5 q-ml-md">Listening</div>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-right">Người chấm</th>
          <th class="text-right">Điểm</th>
          <th class="text-right">Ngày Thi</th>
          <th class="text-right">Comment</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(test,index) in list_history" v-if="test.type === 2">
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-right">{{test.lecture.full_name}}</td>
          <td class="text-right">{{ test.point }}</td>
          <td class="text-right">{{test.created_at | formatDate}}</td>
          <td class="text-right">{{test.comment}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div class="q-pa-md" style="max-width: 1200px; margin: 20px auto">
      <q-markup-table>
        <thead>
        <div style="margin-top: 10px; margin-bottom: 10px" class="text-h5 q-ml-md">Reading</div>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-right">Người chấm</th>
          <th class="text-right">Điểm</th>
          <th class="text-right">Ngày Thi</th>
          <th class="text-right">Comment</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(test,index) in list_history" v-if="test.type === 1">
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-right">{{test.lecture.full_name}}</td>
          <td class="text-right">{{ test.point }}</td>
          <td class="text-right">{{test.created_at | formatDate}}</td>
          <td class="text-right">{{test.comment}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div class="q-pa-md" style="max-width: 1200px; margin: 20px auto">
      <q-markup-table>
        <thead>
        <div style="margin-top: 10px; margin-bottom: 10px" class="text-h5 q-ml-md">Speaking</div>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-right">Người chấm</th>
          <th class="text-right">Điểm</th>
          <th class="text-right">Ngày Thi</th>
          <th class="text-right">Comment</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(test,index) in list_history" v-if="test.type === 3">
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-right">{{test.lecture.full_name}}</td>
          <td class="text-right">{{ test.point }}</td>
          <td class="text-right">{{test.created_at | formatDate}}</td>
          <td class="text-right">{{test.comment}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div class="q-pa-md" style="max-width: 1200px; margin: 20px auto">
      <q-markup-table>
        <thead>
        <div style="margin-top: 10px; margin-bottom: 10px" class="text-h5 q-ml-md">Writing</div>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-right">Người chấm</th>
          <th class="text-right">Điểm</th>
          <th class="text-right">Ngày Thi</th>
          <th class="text-right">Comment</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(test,index) in list_history" v-if="test.type === 4">
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-right">{{test.lecture.full_name}}</td>
          <td class="text-right">{{ test.point }}</td>
          <td class="text-right">{{test.created_at | formatDate}}</td>
          <td class="text-right">{{test.comment}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestHistory",
  data() {
    return {
      list_history: [],
    }
  },
  props: ['user'],
  created() {
    console.log(this.user.id)
    axios.get(process.env.API_URL + '/history/'+this.user.id)
          .then(response => {
            console.log(response.data)
            this.list_history = response.data
          })
          .catch(error => {
            console.log(error.response.data)
            this.errors = error.response.data.errors
          })
  }
  // methods: {
  //   getListHistory(){
  //     axios.get('http://127.0.0.1:8000/api/history/'+this.user.id)
  //       .then(response => {
  //         this.list_history = response.data
  //
  //       })
  //       .catch(error => {
  //         this.errors = error.response.data.errors.name
  //       })
  //   }
  // }
}
</script>

<style scoped>
.table{
  margin-bottom: 40px;
}
.q-banner {
  background: url("https://insenglish.org/wp-content/uploads/2018/05/banner-IELTS.jpg") center;
  background-size: cover;
  height: 400px;
}
</style>
