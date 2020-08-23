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
        <div style="margin-top: 10px; margin-bottom: 10px" class="text-h5 q-ml-md">Reading</div>
        <tr>
          <th class="text-left">STT</th>
          <th class="text-right">Điểm</th>
          <th class="text-right">Ngày Thi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(test,index) in read_history" >
          <td class="text-left">{{ index+1 }}</td>
          <td class="text-right">{{ test.point }}</td>
          <td class="text-right">{{test.created_at}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListeningHistory",
  data() {
    return {
      read_history: [],
    }
  },
  props: ['user'],
  created() {
    console.log(this.user.id)
    axios.get(process.env.API_URL +'/readHistory/'+this.user.id)
      .then(response => {
        console.log(response.data)
        this.read_history = response.data
      })
      .catch(error => {
        console.log(error.response.data)
        this.errors = error.response.data.errors
      })
  },
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
