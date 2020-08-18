<template>
 <div>
   <div class="q-banner text-center relative-position">
     <div class="q-pa-md q-gutter-sm absolute-center">
       <q-btn color="red" label="Get Exam" size="xl"/>
     </div>
   </div>
   <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
     <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
       <q-card>
         <q-card-section :class="$q.dark.isActive?'blue_dark':'bg-blue-8'" class="text-white">
           <div class="row">
             <div class="col-10">
               <div class="text-h6">Lecture</div>
               <div class="text-h5">160</div>
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
         <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
           <div class="row">
             <div class="col-10">
               <div class="text-h6">Goals</div>
               <div class="text-h5">140</div>
             </div>
             <div class="col-2">
               <q-icon size="62px" name="far fa-dot-circle"/>
             </div>
           </div>
         </q-card-section>
       </q-card>
     </div>
     <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
       <q-card>
         <q-card-section :class="$q.dark.isActive?'orange_dark':'bg-orange-9'" class="text-white">
           <div class="row">
             <div class="col-10">
               <div class="text-h6">% Change</div>
               <div class="text-h5">
                 <q-icon name="arrow_downward"/>
                 2%
               </div>
             </div>
             <div class="col-2">
               <q-icon size="62px" name="compare_arrows"/>
             </div>
           </div>
         </q-card-section>
       </q-card>
     </div>
   </div>
 </div>
</template>

<script>
export default {
name: "home"
}
</script>

<style scoped>
.q-banner{
  background: url("https://insenglish.org/wp-content/uploads/2018/05/banner-IELTS.jpg") center;
  background-size: cover;
  height: 400px;
}
</style>
