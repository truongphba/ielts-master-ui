<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card push bordered class="my-card">
      <q-card-section>
        <q-select style="margin-top: 10px" outlined v-model="amount" :options="amount_option"
                  label="Choose the amount"/>
        <div class="text-h6" style="margin-top: 10px; text-transform: uppercase">Choose your payment method</div>
        <q-select style="margin-top: 10px" outlined v-model="payment" :options="payment_option"/>
        <div v-if="payment === 'Credit or debit card' ">
          <img style="margin-top: 20px; margin-bottom: 10px; width: 50px; height: 30px;"
               src="https://www.scdn.co/bundles/spotifycheckout/svg/cards/visa.svg" alt="">
          <img style="margin-top: 20px; margin-bottom: 10px; width: 50px; height: 30px;"
               src="https://www.scdn.co/bundles/spotifycheckout/svg/cards/mastercard.svg" alt="">
          <p style="margin: 2px">Card Number</p>
          <q-input outlined v-model="text"/>
          <p style="margin-top: 10px">Expiry date</p>
          <div style="display: flex">
            <q-select style="width: 190px; margin-right: 20px" outlined v-model="month" :options="month_option"
                      label="Month"/>
            <q-select style="width: 190px" outlined v-model="year" :options="year_option" label="Year"/>
          </div>
          <p style="margin-top: 10px">Security Code</p>
          <q-input style="width: 172px;" outlined v-model="text"/>
        </div>
        <div v-if="payment === 'Paypal' ">
          <img style="margin-top: 20px; margin-bottom: 10px; width: 65px; height: 20px;"
               src="https://www.scdn.co/bundles/spotifycheckout/svg/providers/paypal.svg" alt="">
          <p>Click the button below to login and pay with your Paypal account.</p>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn style="margin: 0px 120px" rounded color="green" label="ADD FUNDS" @click="addFund"/>
      </q-card-section>

      <q-dialog v-model="success">
        <q-card>

          <q-card-section class="q-pt-none" style="width: 200px; margin: 16px">
            Success
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Addfund",
    data() {
      return {
        success: false,
        text: '',
        payment: '',
        payment_option: [
          'Credit or debit card', 'Paypal'
        ],
        amount: '',
        amount_option: [
          50, 100, 200
        ],
        month: '',
        month_option: [
          '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
        ],
        year: '',
        year_option: [
          '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
        ],
      }
    },
    props: ['user'],
    methods: {
      addFund() {
        axios.post(process.env.API_URL + '/payment', {
          amount: this.amount,
          user_id: this.user.id
        }, {
          headers: {Authorization: this.$getCookie('Authorization')}
        })
          .then(response => {
            this.success = true
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
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
