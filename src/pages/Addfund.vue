<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card push bordered class="my-card">
      <q-card-section>
<!--        <div class="text-h6" style="text-transform: uppercase">choose the amount </div>-->
<!--        <q-list style="display: flex; margin: 0 80px">-->
<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section>$50</q-item-section>-->
<!--          </q-item>-->
<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section>$100</q-item-section>-->
<!--          </q-item>-->
<!--          <q-item clickable v-ripple>-->
<!--            <q-item-section>$200</q-item-section>-->
<!--          </q-item>-->
<!--        </q-list>-->
        <q-select style="margin-top: 10px" outlined v-model="amount" :options="amount_option" label="Choose the amount"/>
        <div class="text-h6" style="margin-top: 10px; text-transform: uppercase">Choose your payment method</div>
        <q-select style="margin-top: 10px" outlined v-model="payment" />
        <div v-if="payment === 'PayPal'">
          <img style="margin-top: 20px; margin-bottom: 10px; width: 65px; height: 20px;" src="https://www.scdn.co/bundles/spotifycheckout/svg/providers/paypal.svg" alt="">
          <p>Click the button below to login and pay with your Paypal account.</p>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn style="margin: 0px 120px" rounded color="green" label="ADD FUNDS" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Addfund",
  data() {
    return {
      payment: 'PayPal',
      amount: '',
      amount_option: [
        '$50', '$100', '$200'
      ]
    }
  }
}
</script>

<style scoped>
.my-card {
  margin: 40px auto;
  width: 100%;
  max-width: 400px
}
</style>
