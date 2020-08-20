<template>
  <div>
    <div class="q-banner text-center relative-position">
      <div class="q-pa-md q-gutter-sm absolute-center">
        <q-btn color="red" label="Get Exam" size="xl"/>
      </div>
    </div>
    <div class="q-pa-md" style="max-width: 1200px; margin: 50px auto">
      <q-table class="table"
               title="Listening"
               :data="data"
               :columns="columns"
               row-key="name"
      />
      <q-table class="table"
               title="Reading"
               :data="data"
               :columns="columns"
               row-key="name"
      />
      <q-table class="table"
               title="Speaking"
               :data="data"
               :columns="columns"
               row-key="name"
      />
      <q-table class="table1"
               title="Writing"
               :data="data"
               :columns="columns"
               row-key="name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TestHistory",
  data() {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'STT',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {name: 'test_name', align: 'center', label: 'Tên bài test', field: 'test_name', sortable: true},
        {name: 'point', label: 'Điểm', field: 'point', sortable: true},
        {name: 'time', label: 'Ngày thi', field: 'time'},
        {name: 'lecturer_name', label: 'Người chấm', field: 'lecturer_name', sortable: true},
        {name: 'comment', label: 'Nhận xét', field: 'comment'}
      ],
    }
  }
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
