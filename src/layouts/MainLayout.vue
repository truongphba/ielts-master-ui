<template>
  <div class="panel panel-default">
    <div class="panel-heading" v-if="$auth.check()">
        <p>{{$auth.user().name}}</p>
    </div>
    <div class="panel-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MainLayout"
    }
</script>

<style scoped>

</style>
